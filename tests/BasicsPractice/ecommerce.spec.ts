import { test, expect } from '@playwright/test'

const pageURL = 'https://www.saucedemo.com'

test('should sort products and add an item to the cart', async ({ page }) => {
  //navigate to
  await page.goto(pageURL)
  await expect(page).toHaveURL(pageURL)
  await expect(page.getByText('Swag Labs')).toBeVisible()
  //login
  await page.getByPlaceholder('Username').fill('standard_user') // page.locator('[data-test="username"]').fill('standard_user')
  await page.getByPlaceholder('Password').fill('secret_sauce')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(pageURL + '/inventory.html')
  await expect(page.getByText('Products')).toBeVisible()
  //sort products
  await page.getByText('Name (A to Z)Name (A to Z)').click()
  await page
    .locator('[data-test="product-sort-container"]')
    .selectOption('hilo')
  const firstItem = page.locator('.inventory_item').first()
  await expect(firstItem).toContainText('Sauce Labs Fleece Jacket')
  await expect(firstItem).toContainText('$49.99')
  //add to cart
  await page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Fleece Jacket' })
    .getByRole('button', { name: 'Add to cart' })
    .click()
  await expect(
    page
      .locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Fleece Jacket' })
      .getByRole('button', { name: 'Remove' }),
  ).toBeVisible()
  const cartBadge = page.locator('.shopping_cart_badge')
  await expect(cartBadge).toHaveText('1')

  //workong with cart
  await page.locator('[data-test="shopping-cart-link"]').click()
  await expect(page).toHaveURL(pageURL + '/cart.html')
  const cartItem = page
    .locator('.cart_item_label')
    .filter({ hasText: 'Sauce Labs Fleece Jacket' })

  //removing
  await cartItem.getByRole('button', { name: 'Remove' }).click()
  await expect(cartItem).toHaveCount(0)
  await expect(cartBadge).toHaveCount(0)
})
