import { test, expect, Page } from '@playwright/test';

// ───────────────────────────────────────────────
// Helper: สร้าง username ที่ไม่ซ้ำกันแน่นอน
// ───────────────────────────────────────────────
function uniqueUsername() {
    return `kanban_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

// ───────────────────────────────────────────────
// Helper: Register + Login เพื่อเข้า Dashboard
// ───────────────────────────────────────────────
async function registerAndLogin(page: Page, username: string, password: string) {
    // 1. ล้าง state
    await page.goto('/login');
    await page.evaluate(() => localStorage.clear());

    // 2. สมัครสมาชิก
    await page.goto('/register');
    await expect(page.getByRole('heading', { name: /Sign up/i })).toBeVisible();

    await page.getByTestId('login-username-input').fill(username);
    await page.getByTestId('signup-password-input').fill(password);
    await page.getByTestId('signup-confirm-password-input').fill(password);
    await page.getByLabel(/I accept the/i).check();
    await page.getByRole('button', { name: /Sign up/i }).click();

    // 3. รอ redirect กลับ Login
    await page.waitForURL(/\/login/, { timeout: 15000 });
    await expect(page.getByRole('heading', { name: /Sign in/i })).toBeVisible();

    // 4. Login
    await page.getByTestId('login-username-input').fill(username);
    await page.getByTestId('login-password-input').fill(password);
    await page.getByRole('button', { name: /Sign in/i }).click();

    // 5. รอเข้า Dashboard
    await page.waitForURL(/\/dashboard/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/dashboard/);
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
            const columnTitle = 'To Do';

            // กดปุ่ม Add Column (ปุ่มที่มีข้อความ "Add Column")
            await page.getByText('Add Column').click();

            // กรอกชื่อ Column — placeholder = "Enter column title..."
            await page.getByPlaceholder('Enter column title...').fill(columnTitle);

            // กดปุ่ม Save
            await page.getByRole('button', { name: /Save/i }).click();

            // ✅ ตรวจสอบว่า Column ปรากฏขึ้น
            await expect(page.getByRole('heading', { name: columnTitle })).toBeVisible();
        });

        test('สร้าง Column ไม่ได้ถ้าไม่กรอกชื่อ', async ({ page }) => {
            // กดปุ่ม Add Column
            await page.getByText('Add Column').click();

            // ไม่กรอกชื่อ กดปุ่ม Save เลย
            await page.getByRole('button', { name: /Save/i }).click();

            // ✅ แสดง Error "Column title is required"
            await expect(page.getByText('Column title is required')).toBeVisible();
        });
    });

    // ─── Task Tests ───────────────────────────
    test.describe('Task', () => {
        test('สร้าง Task ได้ และ Task ปรากฏใน Column แรก', async ({ page }) => {
            const columnTitle = 'Primary Column';
            const taskTitle = 'Automated Test Task';
            const taskDescription = 'Task created by Playwright';

            // 1. สร้าง Column
            await page.getByText('Add Column').click();
            await page.getByPlaceholder('Enter column title...').fill(columnTitle);
            await page.getByRole('button', { name: /Save/i }).click();
            await expect(page.getByRole('heading', { name: columnTitle })).toBeVisible();

            // 2. สร้าง Task — ปุ่ม "New Task"
            await page.getByRole('button', { name: /New Task/i }).click();

            // กรอกชื่อ Task (label = "Task Title")
            await page.getByLabel('Task Title').fill(taskTitle);
            await page.getByLabel('Description').fill(taskDescription);
            await page.getByRole('button', { name: /Save/i }).click();

            // 3. ✅ ตรวจสอบว่า Task ปรากฏใน Column
            const column = page.locator('[data-testid="task-column"]', {
                has: page.getByRole('heading', { name: columnTitle }),
            }).first();

            await expect(
                column.locator('[data-testid="task-title"]', { hasText: taskTitle })
            ).toBeVisible();
        });

        test('สร้าง 2 Column แล้ว Task ใหม่จะอยู่ Column แรกเสมอ', async ({ page }) => {
            const col1 = 'To Do';
            const col2 = 'In Progress';
            const taskTitle = 'Should be in first column';

            // สร้าง 2 Columns
            for (const title of [col1, col2]) {
                await page.getByText('Add Column').click();
                await page.getByPlaceholder('Enter column title...').fill(title);
                await page.getByRole('button', { name: /Save/i }).click();
                await expect(page.getByRole('heading', { name: title })).toBeVisible();
            }

            // สร้าง Task
            await page.getByRole('button', { name: /New Task/i }).click();
            await page.getByLabel('Task Title').fill(taskTitle);
            await page.getByLabel('Description').fill('Test description');
            await page.getByRole('button', { name: /Save/i }).click();

            // ✅ Task อยู่ใน Column แรก (To Do)
            const firstColumn = page.locator('[data-testid="task-column"]', {
                has: page.getByRole('heading', { name: col1 }),
            });

            await expect(
                firstColumn.locator('[data-testid="task-title"]', { hasText: taskTitle })
            ).toBeVisible();

            // ✅ Task ไม่อยู่ใน Column 2
            const secondColumn = page.locator('[data-testid="task-column"]', {
                has: page.getByRole('heading', { name: col2 }),
            });

            await expect(
                secondColumn.locator('[data-testid="task-title"]', { hasText: taskTitle })
            ).not.toBeVisible();
        });
    });

    // ─── Drag & Drop ──────────────────────────
    test.describe('Drag & Drop', () => {
        test('ลาก Task จาก Column 1 ไปยัง Column 2 ได้', async ({ page }) => {
            const col1 = 'To Do';
            const col2 = 'Done';
            const taskTitle = 'Draggable Task';

            // สร้าง 2 Columns
            for (const title of [col1, col2]) {
                await page.getByText('Add Column').click();
                await page.getByPlaceholder('Enter column title...').fill(title);
                await page.getByRole('button', { name: /Save/i }).click();
                await expect(page.getByRole('heading', { name: title })).toBeVisible();
            }

            // สร้าง Task
            await page.getByRole('button', { name: /New Task/i }).click();
            await page.getByLabel('Task Title').fill(taskTitle);
            await page.getByLabel('Description').fill('Will be dragged');
            await page.getByRole('button', { name: /Save/i }).click();

            // ยืนยันว่าอยู่ Column 1
            const column1 = page.locator('[data-testid="task-column"]', {
                has: page.getByRole('heading', { name: col1 }),
            });
            const column2 = page.locator('[data-testid="task-column"]', {
                has: page.getByRole('heading', { name: col2 }),
            });

            await expect(column1.locator(`text=${taskTitle}`)).toBeVisible();

            // ───────────────────────────────────────────
            // Manual drag: dnd-kit PointerSensor ต้องการ
            // distance >= 5px ก่อน activate จึงใช้ manual mouse events
            // ───────────────────────────────────────────
            const taskCard = column1.locator('[data-testid="task-card"]', { hasText: taskTitle });
            const targetColumn = column2;

            const sourceBox = await taskCard.boundingBox();
            const targetBox = await targetColumn.boundingBox();

            if (!sourceBox || !targetBox) {
                throw new Error('Could not get bounding boxes for drag elements');
            }

            const startX = sourceBox.x + sourceBox.width / 2;
            const startY = sourceBox.y + sourceBox.height / 2;
            const endX = targetBox.x + targetBox.width / 2;
            const endY = targetBox.y + targetBox.height / 2;

            // ขั้นตอน drag: กดค้าง → ขยับเกิน activation distance → เลื่อนไปเป้าหมาย → ปล่อย
            await page.mouse.move(startX, startY);
            await page.mouse.down();

            // ขยับเกิน 5px เพื่อ activate PointerSensor
            await page.mouse.move(startX + 10, startY, { steps: 3 });
            await page.waitForTimeout(100);

            // เลื่อนไปยัง Column เป้าหมายแบบ smooth (หลาย steps)
            await page.mouse.move(endX, endY, { steps: 20 });
            await page.waitForTimeout(200);

            // ปล่อย mouse
            await page.mouse.up();

            // รอให้ UI update (optimistic + API)
            await page.waitForTimeout(500);

            // ✅ ย้ายไป Column 2 แล้ว (เพิ่ม timeout เผื่อ API ช้า)
            await expect(column2.locator(`text=${taskTitle}`)).toBeVisible({ timeout: 10000 });
            await expect(column1.locator(`text=${taskTitle}`)).not.toBeVisible({ timeout: 5000 });
        });
    });
});