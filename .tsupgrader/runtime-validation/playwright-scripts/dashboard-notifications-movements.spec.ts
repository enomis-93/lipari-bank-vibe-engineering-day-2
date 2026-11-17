import { test, expect } from '@playwright/test';

test.use({ channel: 'msedge' });

test('dashboard-notifications-movements', async ({ page }) => {
  await page.route("**/*", async route => {
    const requestUrl = new URL(route.request().url());
    if (requestUrl.origin === "http://127.0.0.1:5173") {
      await route.continue();
    } else {
      await route.abort("blockedbyclient");
    }
  });
  await page.goto('http://127.0.0.1:5173');
  await page.getByRole('button', { name: 'Notifiche: 2 non lette' }).click();
  await page.getByRole('button', { name: 'Notifiche: 2 non lette' }).click();
  await page.getByRole('button', { name: 'Seleziona movimento Stipendio' }).click();
  await expect(page.getByRole('button', { name: 'Seleziona movimento Stipendio' })).toBeVisible();
});
