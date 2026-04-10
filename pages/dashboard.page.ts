import { Page, Locator, expect } from '@playwright/test';
import { itemNames } from '../data/inventoryData';

export class DashboardPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly cartBadge: Locator;
    readonly shoppingCartLink: Locator;
    readonly inventoryItemNames: Locator;
    readonly addToCartButton: Locator;
    readonly removeButton: Locator;
    readonly inventoryItem: Locator;


    constructor(page: Page) {
        this.page = page;
        this.inventoryItem = page.locator('.inventory_item');
        this.pageTitle = page.locator('[data-test="title"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
        this.inventoryItemNames = page.locator('[data-test="inventory-item-name"]');
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.removeButton = page.getByRole('button', { name: 'Remove' });
    }

    async isLoaded(){
        await expect(this.pageTitle).toBeVisible();
        return await this.pageTitle.innerText();
    }

    async addItemToCart(itemName: string){
        await this.inventoryItem.filter({ hasText: itemName }).locator(this.addToCartButton).click();
    }

    async removeItemFromCart(itemName: string){
        await this.inventoryItem.filter({ hasText: itemName }).locator(this.removeButton).click();
    }

    async getInventoryItemNames() {
        return await this.inventoryItemNames.allTextContents();
    }

    async validateAllProductsDisplayed() {
        await expect(this.inventoryItemNames).toHaveText(itemNames);
    }
    
    get cartBadgeLocator() {
        return this.cartBadge;
    }
}