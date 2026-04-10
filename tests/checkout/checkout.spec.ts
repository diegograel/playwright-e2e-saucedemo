import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.pages';
import { DashboardPage } from '../../pages/dashboard.page';
import { CartPage } from '../../pages/cart.page';
import { InformationPage } from '../../pages/information.page';
import { OverviewPage } from '../../pages/overview.page';
import { SuccessPage } from '../../pages/success.page';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

});

test.describe('End to End Checkout Tests', () => {
    test('should complete checkout process successfully', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        await dashboardPage.addItemToCart('Sauce Labs Backpack');
        await dashboardPage.shoppingCartLink.click();

        const cartPage = new CartPage(page);
        await cartPage.checkoutButton.click();

        const informationPage = new InformationPage(page);
        const customer = {firstName: 'Test',lastName: 'User', postalCode: 'V1T'};
        await informationPage.fillInformation(customer);

        const overviewPage = new OverviewPage(page);
        expect(await overviewPage.totalPrice.textContent()).toContain('32.39');
        await overviewPage.clickFinish();

        const successMessage = new SuccessPage(page);
        await expect(successMessage.orderConfirmation).toHaveText('Thank you for your order!');
    });
});