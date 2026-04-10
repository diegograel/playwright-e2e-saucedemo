import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.pages';
import { DashboardPage } from '../pages/dashboard.page';
import { CartPage } from '../pages/cart.page';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
});

test.describe('Login Tests', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        const dashboardPage = new DashboardPage(page);
        const titleText = await dashboardPage.isLoaded();
        expect(titleText).toBe('Products');
    });

    test('should show error message with locked user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('locked_out_user', 'secret_sauce');
        const errorMessage = await loginPage.getErrorMessageText();
        expect(errorMessage).toContain('Sorry, this user has been locked out.');
    });
});

test.describe('Dashboard Tests', () => {
    test('should add an item to cart', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.addItemToCart('Sauce Labs Backpack');
        await expect(dashboardPage.cartBadgeLocator).toHaveText('1');
    });
    test('should remove an item from cart', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.addItemToCart('Sauce Labs Backpack');
        await expect(dashboardPage.cartBadgeLocator).toHaveText('1');
        await dashboardPage.removeItemFromCart('Sauce Labs Backpack');
        await expect(dashboardPage.cartBadgeLocator).toBeHidden();
    });
});

test.describe('Cart Tests', () => {
    test('should navigate to cart page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.addItemToCart('Sauce Labs Backpack');
        await dashboardPage.shoppingCartLink.click();
        const cartPageTitle = await page.locator('[data-test="title"]').textContent();
        expect(cartPageTitle).toBe('Your Cart');
    });
    test('should access checkout page from cart', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.addItemToCart('Sauce Labs Backpack');
        await dashboardPage.shoppingCartLink.click();
        const cartPage = new CartPage(page);
        await cartPage.checkoutButton.click();
        const checkoutTitle = await page.locator('[data-test="title"]').textContent();
        expect(checkoutTitle).toBe('Checkout: Your Information');
    });
});