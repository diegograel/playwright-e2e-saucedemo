import { Page, Locator } from '@playwright/test';

export class SuccessPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly orderConfirmation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.orderConfirmation = page.locator('[data-test="complete-header"]');
    }

    async getSuccessMessage() {
        return (await this.orderConfirmation.textContent()) || '';
    }   
}