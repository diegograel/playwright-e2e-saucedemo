// Create a fixture for login with a valid user and password
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.pages';

type MyFixtures = {
    login: LoginPage;
}; 

export const test = base.extend<MyFixtures>({
    login: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await use(loginPage);
    }
});