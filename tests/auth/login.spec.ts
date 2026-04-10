import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.pages';
import { DashboardPage } from '../../pages/dashboard.page';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });


    test('Should login successfully with valid credentials', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        const dashboardPage = new DashboardPage(page);
        const titleText = await dashboardPage.isLoaded();
        expect(titleText).toBe('Products');
    });

    test('Should show error message with locked user', async ({ page }) => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        const errorMessage = await loginPage.getErrorMessageText();
        expect(errorMessage).toContain('Sorry, this user has been locked out.');
    });

    test('Should show error message with invalid username', async ({ page }) => {
        await loginPage.login('invalid_user', 'secret_sauce');
        const errorMessage = await loginPage.getErrorMessageText();
        expect(errorMessage).toContain('Username and password do not match any user in this service');
    });

    test('Should show error message with invalid password', async ({ page }) => {
        await loginPage.login('standard_user', 'invalid_password');
        const errorMessage = await loginPage.getErrorMessageText();
        expect(errorMessage).toContain('Username and password do not match any user in this service');
    });

    test('Should show error message with empty credentials', async ({ page }) => {
        await loginPage.login('', '');
        const errorMessage = await loginPage.getErrorMessageText();
        expect(errorMessage).toContain('Username is required');
    });

    test('Should show error message with empty username', async ({ page }) => {
        await loginPage.login('', 'secret_sauce');
        const errorMessage = await loginPage.getErrorMessageText();
        expect(errorMessage).toContain('Username is required');
    });

    test('Should show error message with empty password', async ({ page }) => {
        await loginPage.login('standard_user', '');
        const errorMessage = await loginPage.getErrorMessageText();
        expect(errorMessage).toContain('Password is required');
    });

});