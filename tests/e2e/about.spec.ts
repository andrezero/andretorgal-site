import { expect, test } from '@playwright/test';

test('about | matches screenshot', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveScreenshot();
});
