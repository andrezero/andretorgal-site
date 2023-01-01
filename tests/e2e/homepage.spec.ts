import { expect, test } from '@playwright/test';

test('homepage | matches screenshot', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot();
});
