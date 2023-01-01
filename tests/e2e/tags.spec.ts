import { expect, test } from '@playwright/test';

test('tags home | matches screenshot', async ({ page }) => {
    await page.goto('/tags');
    await expect(page).toHaveScreenshot();
});

test('tag page | matches screenshot', async ({ page }) => {
    await page.goto('/tags/andretorgal-com');
    await expect(page).toHaveScreenshot();
});
