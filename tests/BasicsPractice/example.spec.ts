import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/')
await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Dgoogle%26oq%3Dgoogle%26gs_lcrp%3DEgZjaHJvbWUyBggAEEUYOdIBCDE1ODBqMGoyqAIAsAIB%26sourceid%3Dchrome%26ie%3DUTF-8%26sei%3DOlniacFtzLvcA4b9v8EF&q=EgS8ozMNGLqyic8GIjB3P8jkU9rlbddwFKt2ojSJSH1NGlUrRxP3BSpDJQn7yhB5o3TDIIMhMIakz9E53AQyAVJaAUM');
await page.locator('iframe[name="a-qo9t3s2fyly"]').contentFrame().getByRole('checkbox', { name: 'Я не робот' }).click();
await page.locator('iframe[name="c-qo9t3s2fyly"]').contentFrame().locator('[id="5"]').click();
await page.locator('iframe[name="c-qo9t3s2fyly"]').contentFrame().locator('[id="5"]').click();
await page.locator('iframe[name="c-qo9t3s2fyly"]').contentFrame().getByRole('button', { name: 'Подтвердить' }).click();
await page.locator('iframe[name="c-qo9t3s2fyly"]').contentFrame().getByRole('button', { name: 'Подтвердить' }).click();
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/)
})

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' }),
  ).toBeVisible()
})
