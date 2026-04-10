import { Page, Locator } from '@playwright/test';
import { SuccessPage } from './success.page';

export class OverviewPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;
    readonly totalPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
    }

    async clickFinish() {
        await this.finishButton.click();
        return new SuccessPage(this.page);
    }

}