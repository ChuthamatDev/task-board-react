import { test, expect, Page } from '@playwright/test';

// ───────────────────────────────────────────────
// Helper: สร้าง username ที่ไม่ซ้ำกันแน่นอน
// ───────────────────────────────────────────────
function uniqueUsername(prefix = 'test') {
    return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

// ───────────────────────────────────────────────
// Helper: Register → ส่ง username + password กลับ
// ───────────────────────────────────────────────
async function registerUser(page: Page, username: string, password: string) {
    await page.goto('/register');
    await expect(page.getByRole('heading', { name: /Sign up/i })).toBeVisible();

    await page.getByTestId('login-username-input').fill(username);
    await page.getByTestId('signup-password-input').fill(password);
    await page.getByTestId('signup-confirm-password-input').fill(password);

    // กดยอมรับเงื่อนไข — label text = "I accept the Terms and Conditions"
    await page.getByLabel(/I accept the/i).check();

    // กดปุ่ม Sign up
    await page.getByRole('button', { name: /Sign up/i }).click();

    // รอ redirect กลับหน้า Login
    await page.waitForURL(/\/login/, { timeout: 15000 });
    await expect(page.getByRole('heading', { name: /Sign in/i })).toBeVisible();
}

// ───────────────────────────────────────────────
// Helper: Login → ลงชื่อเข้าใช้แล้วรอเข้า Dashboard
// ───────────────────────────────────────────────
async function loginUser(page: Page, username: string, password: string) {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /Sign in/i })).toBeVisible();

    await page.getByTestId('login-username-input').fill(username);
    await page.getByTestId('login-password-input').fill(password);
    await page.getByRole('button', { name: /Sign in/i }).click();

    // รอ redirect ไป Dashboard
    await page.waitForURL(/\/dashboard/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/dashboard/);
}

// ═══════════════════════════════════════════════
// Test Suite: Authentication
// ═══════════════════════════════════════════════
test.describe('Authentication', () => {
    const TEST_PASSWORD = 'Secure123';

    test.beforeEach(async ({ page }) => {
        // ล้าง localStorage ทุกครั้งก่อนเริ่มเทสต์
        await page.goto('/login');
        await page.evaluate(() => localStorage.clear());
    });

    // ─── Register ─────────────────────────────
    test.describe('Register', () => {
        test('สมัครสมาชิกสำเร็จ แล้ว redirect ไปหน้า Login', async ({ page }) => {
            const username = uniqueUsername('reg');

            await registerUser(page, username, TEST_PASSWORD);

            // ✅ ตรวจสอบว่าอยู่หน้า Login
            await expect(page).toHaveURL(/\/login/);
            await expect(page.getByRole('heading', { name: /Sign in/i })).toBeVisible();
        });

        test('สมัครสมาชิกไม่ได้ถ้า username สั้นกว่า 3 ตัวอักษร', async ({ page }) => {
            await page.goto('/register');
            await expect(page.getByRole('heading', { name: /Sign up/i })).toBeVisible();

            await page.getByTestId('login-username-input').fill('ab');
            await page.getByTestId('signup-password-input').fill(TEST_PASSWORD);
            await page.getByTestId('signup-confirm-password-input').fill(TEST_PASSWORD);
            await page.getByLabel(/I accept the/i).check();
            await page.getByRole('button', { name: /Sign up/i }).click();

            // ✅ ยังคงอยู่หน้า Register — แสดง error message
            await expect(page).toHaveURL(/\/register/);
            await expect(page.getByText('Username must be at least 3 characters.')).toBeVisible();
        });

        test('สมัครสมาชิกไม่ได้ถ้า password สั้นกว่า 6 ตัวอักษร', async ({ page }) => {
            await page.goto('/register');

            await page.getByTestId('login-username-input').fill(uniqueUsername('short'));
            await page.getByTestId('signup-password-input').fill('12345');
            await page.getByTestId('signup-confirm-password-input').fill('12345');
            await page.getByLabel(/I accept the/i).check();
            await page.getByRole('button', { name: /Sign up/i }).click();

            // ✅ แสดง error password
            await expect(page).toHaveURL(/\/register/);
            await expect(page.getByText('Password must be at least 6 characters.')).toBeVisible();
        });

        test('สมัครสมาชิกไม่ได้ถ้า password กับ confirm password ไม่ตรงกัน', async ({ page }) => {
            await page.goto('/register');

            await page.getByTestId('login-username-input').fill(uniqueUsername('mismatch'));
            await page.getByTestId('signup-password-input').fill('Password1');
            await page.getByTestId('signup-confirm-password-input').fill('Different2');
            await page.getByLabel(/I accept the/i).check();
            await page.getByRole('button', { name: /Sign up/i }).click();

            // ✅ แสดง error confirm password
            await expect(page).toHaveURL(/\/register/);
            await expect(page.getByText('Passwords do not match.')).toBeVisible();
        });
    });

    // ─── Login ────────────────────────────────
    test.describe('Login', () => {
        test('ล็อกอินสำเร็จหลังสมัครสมาชิก → เข้า Dashboard พร้อม Navbar', async ({ page }) => {
            const username = uniqueUsername('login');

            // 1. สมัครสมาชิก
            await registerUser(page, username, TEST_PASSWORD);

            // 2. ล็อกอิน
            await loginUser(page, username, TEST_PASSWORD);

            // ✅ เข้า Dashboard สำเร็จ — เห็น Navbar
            await expect(page).toHaveURL(/\/dashboard/);
            await expect(page.locator('nav')).toBeVisible();
        });

        test('ล็อกอินไม่ได้ถ้า username สั้นกว่า 3 ตัวอักษร', async ({ page }) => {
            await page.goto('/login');

            await page.getByTestId('login-username-input').fill('ab');
            await page.getByTestId('login-password-input').fill(TEST_PASSWORD);
            await page.getByRole('button', { name: /Sign in/i }).click();

            // ✅ ยังอยู่หน้า Login — แสดง error
            await expect(page).toHaveURL(/\/login/);
            await expect(page.getByText('Username must be at least 3 characters.')).toBeVisible();
        });

        test('ล็อกอินไม่ได้ถ้า password สั้นกว่า 6 ตัวอักษร', async ({ page }) => {
            await page.goto('/login');

            await page.getByTestId('login-username-input').fill('validuser');
            await page.getByTestId('login-password-input').fill('12345');
            await page.getByRole('button', { name: /Sign in/i }).click();

            // ✅ ยังอยู่หน้า Login — แสดง error
            await expect(page).toHaveURL(/\/login/);
            await expect(page.getByText('Password must be at least 6 characters.')).toBeVisible();
        });
    });

    // ─── Protected Route ──────────────────────
    test.describe('Protected Route', () => {
        test('เข้าหน้า Dashboard โดยไม่ login ถูก redirect ไปหน้า Login', async ({ page }) => {
            await page.goto('/dashboard');

            // ✅ ProtectedRoute redirect ไป /login
            await page.waitForURL(/\/login/, { timeout: 10000 });
            await expect(page).toHaveURL(/\/login/);
        });
    });

    // ─── Navigation ───────────────────────────
    test.describe('Navigation Links', () => {
        test('หน้า Login มีลิงก์ไปหน้า Register', async ({ page }) => {
            await page.goto('/login');

            const signUpLink = page.getByRole('link', { name: /Sign up/i });
            await expect(signUpLink).toBeVisible();
            await signUpLink.click();

            await page.waitForURL(/\/register/);
            await expect(page).toHaveURL(/\/register/);
        });

        test('หน้า Register มีลิงก์ไปหน้า Login', async ({ page }) => {
            await page.goto('/register');

            const signInLink = page.getByRole('link', { name: /Sign in/i });
            await expect(signInLink).toBeVisible();
            await signInLink.click();

            await page.waitForURL(/\/login/);
            await expect(page).toHaveURL(/\/login/);
        });

        test('หน้า Login มีลิงก์ไปหน้า Forgot Password', async ({ page }) => {
            await page.goto('/login');

            const forgotLink = page.getByRole('link', { name: /Forgot password/i });
            await expect(forgotLink).toBeVisible();
            await forgotLink.click();

            await page.waitForURL(/\/forgot-password/);
            await expect(page).toHaveURL(/\/forgot-password/);
            await expect(page.getByRole('heading', { name: /Reset your password/i })).toBeVisible();
        });
    });
});
