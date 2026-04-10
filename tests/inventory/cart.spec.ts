import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.pages';
import { DashboardPage } from '../../pages/dashboard.page';
import { CartPage } from '../../pages/cart.page';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
});

test.describe('Cart Tests', () => {
    test('should navigate to cart page', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.addItemToCart('Sauce Labs Backpack');
        await dashboardPage.shoppingCartLink.click();
        const cartPageTitle = await page.locator('[data-test="title"]').textContent();
        expect(cartPageTitle).toBe('Your Cart');
    });
    test('should access checkout page from cart', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.addItemToCart('Sauce Labs Backpack');
        await dashboardPage.shoppingCartLink.click();
        const cartPage = new CartPage(page);
        await cartPage.checkoutButton.click();
        const checkoutTitle = await page.locator('[data-test="title"]').textContent();
        expect(checkoutTitle).toBe('Checkout: Your Information');
    });
});