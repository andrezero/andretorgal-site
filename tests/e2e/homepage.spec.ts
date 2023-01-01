import { expect, test } from '@playwright/test';

test('homepage / matches screenshot', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveScreenshot();
});
