import { Locator, Page } from "@playwright/test";
import { OverviewPage } from "./overview.page";

export interface CustomerData {
    firstName: string;
    lastName: string;
    postalCode: string;
}

export class InformationPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly inputFirstName: Locator;
    readonly inputLastName: Locator;
    readonly inputPostalCode: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.inputFirstName = page.locator('[data-test="firstName"]');
        this.inputLastName = page.locator('[data-test="lastName"]');
        this.inputPostalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
    }

    async fillInformation(customerData: CustomerData) {
        await this.inputFirstName.fill(customerData.firstName);
        await this.inputLastName.fill(customerData.lastName);
        await this.inputPostalCode.fill(customerData.postalCode);
        await this.continueButton.click();
        return new OverviewPage(this.page);
    }
}
