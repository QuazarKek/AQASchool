import { test, expect } from '@playwright/test'
import { TodoPage } from './TodoPage'

let todoPage: TodoPage

test.beforeEach(async ({ page }) => {
  todoPage = new TodoPage(page)
  await todoPage.goto()
})

test.afterEach(async () => {
  await todoPage.clearAllTodos()
})

test('should allow a user to add and complete a to-do item', async () => {
  //test.setTimeout(60000)

  await todoPage.addTodo('Create a POM')
  await todoPage.addTodo('Write a test')
  await todoPage.addTodo('Run the test')
  await expect(todoPage.todoCounter).toHaveText('3 items left')

  await todoPage.markAsComplete('Write a test')
  const completedTodo = todoPage.getTodoByText('Write a test')
  await expect(completedTodo).toHaveClass(/completed/) //, { timeout: 15000 })

  await todoPage.filterBy('Active')
  await expect(todoPage.page.getByText('Write a test')).not.toBeVisible()
  await expect(todoPage.page.getByText('Create a POM')).toBeVisible()
  await expect(todoPage.page.getByText('Run the test')).toBeVisible()

  await todoPage.filterBy('Completed')
  await expect(todoPage.page.getByText('Write a test')).toBeVisible()
  await expect(todoPage.page.getByText('Create a POM')).not.toBeVisible()
  await expect(todoPage.page.getByText('Run the test')).not.toBeVisible()
})

test('should load the page with mocked to-do items', async ({ page }) => {
  // в цьому випадку сторінка завантажується і тест працює як і очікується
  await page.route('**/*', async (route) => {
    const req = route.request()
    const url = req.url()

    if (
      req.method() === 'GET' &&
      (req.resourceType() === 'xhr' || req.resourceType() === 'fetch') &&
      url.includes('/todo')
    ) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 1,
            title: 'Mocked Task 1',
            completed: false,
            url: 'https://csharp-todo-backend.azurewebsites.net/api/v1/todo/1',
            order: 1,
          },
          {
            id: 2,
            title: 'Mocked Task 2',
            completed: true,
            url: 'https://csharp-todo-backend.azurewebsites.net/api/v1/todo/2',
            order: 2,
          },
        ]),
      })
    } else {
      await route.continue()
    }
  })

  await todoPage.goto()

  await expect(todoPage.todoItems).toHaveCount(2)
  await expect(todoPage.getTodoByText('Mocked Task 1')).toBeVisible()
  await expect(todoPage.getTodoByText('Mocked Task 2')).toBeVisible()

  const completedTodo = todoPage.getTodoByText('Mocked Task 2')
  await expect(completedTodo).toHaveClass(/completed/)
})

test('should load the page with mocked to-do items11', async ({ page }) => {
  // не працює, бо сторінка завантажується як текст
  await page.route('**/api/todo', async (route) => {
    const request = route.fetch()
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          completed: false,
          order: 1,
          title: 'Mocked Task 1',
          url: 'https://azurewebsites.net',
        },
        {
          id: 2,
          completed: true,
          order: 2,
          title: 'Mocked Task 2',
          url: 'https://azurewebsites.net',
        },
      ]),
    })
  })

  await todoPage.goto()

  await expect(todoPage.todoItems).toHaveCount(2)
  await expect(todoPage.getTodoByText('Mocked Task 1')).toBeVisible()
  await expect(todoPage.getTodoByText('Mocked Task 2')).toBeVisible()

  const completedTodo = todoPage.getTodoByText('Mocked Task 2')
  await expect(completedTodo).toHaveClass(/completed/)
})

test('should not add a to-do if the server returns an error*', async ({
  page,
}) => {
  await page.route('**/*', async (route) => {
    const req = route.request()

    if (
      req.method() === 'POST' &&
      (req.resourceType() === 'xhr' || req.resourceType() === 'fetch') &&
      req.url().includes('/todo')
    ) {
      await route.fulfill({
        status: 500,
        body: 'Server Error',
      })
    } else {
      await route.continue()
    }
  })

  await todoPage.goto()
  await todoPage.addTodo('This should fail')
  await expect(todoPage.todoItems).toHaveCount(0)
})

test('should load the page with mocked to-do items2', async ({ page }) => {
  //тест падає, бо сторінка завантажується як текст
  await page.route('**/api/todo', async (route) => {
    const request = route.fetch()
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          completed: false,
          order: 1,
          title: 'Mocked Task 1',
          url: 'https://azurewebsites.net',
        },
        {
          id: 2,
          completed: true,
          order: 2,
          title: 'Mocked Task 2',
          url: 'https://azurewebsites.net',
        },
      ]),
    })
  })

  await todoPage.goto()

  await expect(todoPage.todoItems).toHaveCount(2)
  await expect(todoPage.getTodoByText('Mocked Task 1')).toBeVisible()
  await expect(todoPage.getTodoByText('Mocked Task 2')).toBeVisible()

  const completedTodo = todoPage.getTodoByText('Mocked Task 2')
  await expect(completedTodo).toHaveClass(/completed/)
})

test('should load the page with mocked to-do items3', async ({ page }) => {
  //тест падає, бо сторінка завантажується як текст
  await page.route('**/api/v1/todo', async (route) => {
    if (route.request().method() !== 'GET') {
      return route.continue()
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          title: 'Mocked Task 1',
          completed: false,
          url: 'https://csharp-todo-backend.azurewebsites.net/api/v1/todo/1',
          order: 1,
        },
        {
          id: 2,
          title: 'Mocked Task 2',
          completed: true,
          url: 'https://csharp-todo-backend.azurewebsites.net/api/v1/todo/2',
          order: 2,
        },
      ]),
    })
  })

  await todoPage.goto()

  await expect(todoPage.todoItems).toHaveCount(2)
  await expect(todoPage.getTodoByText('Mocked Task 1')).toBeVisible()
  await expect(todoPage.getTodoByText('Mocked Task 2')).toBeVisible()

  const completedTodo = todoPage.getTodoByText('Mocked Task 2')
  await expect(completedTodo).toHaveClass(/completed/)
})
