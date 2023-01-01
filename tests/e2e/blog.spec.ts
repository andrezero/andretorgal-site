import { expect, test } from '@playwright/test';

test('blog | matches screenshot', async ({ page }) => {
    await page.goto('/posts');
    await expect(page).toHaveScreenshot();
});

test('blog post | matches screenshot', async ({ page }) => {
    await page.goto('/posts/2017-01/hello-world');
    await expect(page).toHaveScreenshot();
});
