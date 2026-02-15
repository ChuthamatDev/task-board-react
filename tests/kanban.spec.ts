import { test, expect, Page } from '@playwright/test';

function uniqueUsername() {
    return `kanban_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

async function registerAndLogin(page: Page, username: string, password: string) {
    await page.goto('/login');
    await page.evaluate(() => localStorage.clear());

    await page.goto('/register');
    await expect(page.getByRole('heading', { name: /Sign up/i })).toBeVisible();

    await page.getByTestId('login-username-input').fill(username);
    await page.getByTestId('signup-password-input').fill(password);
    await page.getByTestId('signup-confirm-password-input').fill(password);
    await page.getByLabel(/I accept the/i).check();
    await page.getByRole('button', { name: /Sign up/i }).click();

    await page.waitForURL(/\/login/, { timeout: 15000 });
    await expect(page.getByRole('heading', { name: /Sign in/i })).toBeVisible();

    await page.getByTestId('login-username-input').fill(username);
    await page.getByTestId('login-password-input').fill(password);
    await page.getByRole('button', { name: /Sign in/i }).click();

    await page.waitForURL(/\/dashboard/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/dashboard/);
}

async function createColumn(page: Page, title: string) {
    const addBtn = page.locator('button', { hasText: /Add Column|เพิ่มคอลัมน์/i });
    await addBtn.click();

    const input = page.getByPlaceholder(/Enter column title|ชื่อคอลัมน์/i);
    await expect(input).toBeVisible({ timeout: 5000 });
    await input.fill(title);

    const saveBtn = page.locator('form button[type="submit"]');
    await expect(saveBtn).toBeVisible({ timeout: 5000 });
    await saveBtn.click();

    await expect(page.getByRole('heading', { name: title })).toBeVisible({ timeout: 10000 });
}

async function createTask(page: Page, title: string, description: string) {
    await page.getByRole('button', { name: /New Task/i }).click();

    const titleInput = page.locator('input[name="title"]');
    await expect(titleInput).toBeVisible({ timeout: 5000 });
    await titleInput.fill(title);

    const descInput = page.locator('textarea[name="description"]');
    await expect(descInput).toBeVisible({ timeout: 5000 });
    await descInput.fill(description);

    const saveBtn = page.locator('[role="dialog"] button[type="submit"], form button[type="submit"]').last();
    await expect(saveBtn).toBeVisible({ timeout: 5000 });
    await saveBtn.click();

    await expect(titleInput).not.toBeVisible({ timeout: 10000 });
}

// ═══════════════════════════════════════════════
// Test Suite: Kanban Board - Column & Task
// ═══════════════════════════════════════════════
test.describe('Kanban Board - Column & Task', () => {
    const TEST_PASSWORD = 'Secure123';
    let testUsername: string;

    test.beforeEach(async ({ page }) => {
        testUsername = uniqueUsername();
        await registerAndLogin(page, testUsername, TEST_PASSWORD);
    });

    // ─── Column Tests ─────────────────────────
    test.describe('Column', () => {
        test('สร้าง Column ใหม่ได้สำเร็จ', async ({ page }) => {
            // ใช้ชื่อที่ไม่ซ้ำกับ default columns (To Do, In Progress, Done)
            const columnTitle = 'QA Testing';
            await createColumn(page, columnTitle);
        });

        test('สร้าง Column ไม่ได้ถ้าไม่กรอกชื่อ', async ({ page }) => {
            const addBtn = page.locator('button', { hasText: /Add Column|เพิ่มคอลัมน์/i });
            await addBtn.click();

            const saveBtn = page.locator('form button[type="submit"]');
            await expect(saveBtn).toBeVisible({ timeout: 5000 });
            await saveBtn.click();

            await expect(page.getByText('Column title is required')).toBeVisible();
        });
    });

    // ─── Task Tests ───────────────────────────
    test.describe('Task', () => {
        test('สร้าง Task ได้ และ Task ปรากฏใน Column แรก', async ({ page }) => {
            const taskTitle = 'Automated Test Task';
            const taskDescription = 'Task created by Playwright';

            // Backend สร้าง default columns (To Do, In Progress, Done) ให้ user ใหม่
            // ดังนั้น Task ใหม่จะถูก assign เข้า column แรก (To Do) โดยอัตโนมัติ
            // รอให้ default columns โหลดเสร็จก่อน
            await expect(page.getByRole('heading', { name: 'To Do' })).toBeVisible({ timeout: 10000 });

            await createTask(page, taskTitle, taskDescription);

            // ตรวจว่า task ปรากฏใน column แรก (To Do)
            const firstColumn = page.locator('[data-testid="task-column"]').first();
            await expect(
                firstColumn.locator('[data-testid="task-title"]', { hasText: taskTitle })
            ).toBeVisible({ timeout: 10000 });
        });

        test('Task ใหม่จะอยู่ Column แรกเสมอ ไม่ว่าจะมีกี่ Column', async ({ page }) => {
            const taskTitle = 'Should be in first column';

            // รอให้ default columns โหลด
            await expect(page.getByRole('heading', { name: 'To Do' })).toBeVisible({ timeout: 10000 });

            // เพิ่ม column ใหม่
            await createColumn(page, 'QA Testing');

            await createTask(page, taskTitle, 'Test description');

            // Task อยู่ใน Column แรก (To Do)
            const firstColumn = page.locator('[data-testid="task-column"]').first();
            await expect(
                firstColumn.locator('[data-testid="task-title"]', { hasText: taskTitle })
            ).toBeVisible({ timeout: 10000 });
        });
    });

    // ─── Drag & Drop ──────────────────────────
    test.describe('Drag & Drop', () => {
        test('ลาก Task จาก Column 1 ไปยัง Column 2 ได้', async ({ page }) => {
            const taskTitle = 'Draggable Task';

            // รอให้ default columns โหลด (To Do, In Progress, Done)
            await expect(page.getByRole('heading', { name: 'To Do' })).toBeVisible({ timeout: 10000 });
            await expect(page.getByRole('heading', { name: 'In Progress' })).toBeVisible({ timeout: 10000 });

            // สร้าง Task (จะอยู่ใน "To Do" อัตโนมัติ)
            await createTask(page, taskTitle, 'Will be dragged');

            // ใช้ .first() / .nth() เลือก column ที่ต้องการอย่างชัดเจน
            // Column 0 = To Do, Column 1 = In Progress
            const column1 = page.locator('[data-testid="task-column"]').nth(0);
            const column2 = page.locator('[data-testid="task-column"]').nth(1);

            await expect(column1.locator(`text=${taskTitle}`)).toBeVisible({ timeout: 10000 });

            // Manual drag: dnd-kit PointerSensor ต้องการ distance >= 5px
            const taskCard = column1.locator('[data-testid="task-card"]', { hasText: taskTitle });

            const sourceBox = await taskCard.boundingBox();
            const targetBox = await column2.boundingBox();

            if (!sourceBox || !targetBox) {
                throw new Error('Could not get bounding boxes for drag elements');
            }

            const startX = sourceBox.x + sourceBox.width / 2;
            const startY = sourceBox.y + sourceBox.height / 2;
            const endX = targetBox.x + targetBox.width / 2;
            const endY = targetBox.y + targetBox.height / 2;

            await page.mouse.move(startX, startY);
            await page.mouse.down();

            // ขยับเกิน 5px เพื่อ activate PointerSensor
            await page.mouse.move(startX + 10, startY, { steps: 3 });
            await page.waitForTimeout(100);

            // เลื่อนไปยัง Column เป้าหมายแบบ smooth
            await page.mouse.move(endX, endY, { steps: 20 });
            await page.waitForTimeout(200);

            await page.mouse.up();

            // รอให้ UI update
            await page.waitForTimeout(500);

            // ย้ายไป Column 2 แล้ว
            await expect(column2.locator(`text=${taskTitle}`)).toBeVisible({ timeout: 10000 });
            await expect(column1.locator(`text=${taskTitle}`)).not.toBeVisible({ timeout: 5000 });
        });
    });
});