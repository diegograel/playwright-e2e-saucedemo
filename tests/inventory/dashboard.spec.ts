import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.pages';
import { DashboardPage } from '../../pages/dashboard.page';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
});

test.describe('Inventory Dashboard', () => {

    test('Should display the dashboard correctly', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const titleText = await dashboardPage.isLoaded();
        expect(titleText).toBe('Products');
    });

    test('Should display the correct products', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.validateAllProductsDisplayed();
    });

    test('Should add an item to cart', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.addItemToCart('Sauce Labs Backpack');
        await expect(dashboardPage.cartBadgeLocator).toHaveText('1');
    });

    test('Should remove an item from cart', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.addItemToCart('Sauce Labs Backpack');
        await expect(dashboardPage.cartBadgeLocator).toHaveText('1');
        await dashboardPage.removeItemFromCart('Sauce Labs Backpack');
        await expect(dashboardPage.cartBadgeLocator).toBeHidden();
    });

});