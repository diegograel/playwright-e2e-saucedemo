import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.pages';
import { DashboardPage } from '../../pages/dashboard.page';
import { itemNames, itemPrices } from '../../data/inventoryData';

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

    test('Should display item names correctly by filter a-z', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.sortBy('az');
        const expectedSortedNames = [...itemNames].sort();
        const actualItemNames = await dashboardPage.getInventoryItemNames();
        expect(actualItemNames).toEqual(expectedSortedNames);
    });

    test('Should display item names correctly by filter z-a', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.sortBy('za');
        const expectedSortedNames = [...itemNames].sort().reverse();
        const actualItemNames = await dashboardPage.getInventoryItemNames();
        expect(actualItemNames).toEqual(expectedSortedNames);
    });

    test('Should display item prices correctly by filter low to high', async ({ page }) => {
        const dashboardPage = new DashboardPage(page); 
        await dashboardPage.sortBy('lohi');
        const prices = await dashboardPage.getInventoryItemPrices();
        const expectedOrder = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(expectedOrder);
    });

    test('Should display item prices correctly by filter high to low', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.sortBy('hilo');
        const prices = await dashboardPage.getInventoryItemPrices();
        const expectedOrder = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(expectedOrder);
    });
});