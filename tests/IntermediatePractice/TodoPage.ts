import { Page, Locator, expect } from '@playwright/test'

export class TodoPage {
  readonly page: Page
  readonly newTodoInput: Locator
  readonly todoItems: Locator
  readonly completedFilter: Locator
  readonly activeFilter: Locator
  readonly clearCompletedButton: Locator
  readonly todoCounter: Locator

  constructor(page: Page) {
    this.page = page
    this.newTodoInput = page.locator('#new-todo')
    this.todoItems = page.locator('#todo-list li')
    this.todoCounter = page.locator('#todo-count')
    this.completedFilter = page.getByRole('link', { name: 'Completed' })
    this.activeFilter = page.getByRole('link', { name: 'Active' })
    this.clearCompletedButton = page.getByRole('button', {
      name: 'Clear complited',
    })
  }

  async goto() {
    await this.page.goto(
      'https://todobackend.com/client/index.html?https://csharp-todo-backend.azurewebsites.net/api/v1/todo',
    )
  }

  async addTodo(text: string) {
    await this.newTodoInput.fill(text)
    await this.newTodoInput.press('Enter')
  }

  async markAsComplete(todoText: string) {
    const todo = this.page.locator('#todo-list li', {
      hasText: todoText,
    })

    await todo.getByRole('checkbox').click()
  }

  async filterBy(status: 'Active' | 'Completed') {
    if (status === 'Active') {
      await this.activeFilter.click()
    } else {
      await this.completedFilter.click()
    }
  }

  getTodoByText(todoText: string): Locator {
    return this.todoItems.filter({
      has: this.page.getByText(todoText),
    })
  }
  getTodoForClicking(todoText: string) {
    return this.page.locator('#todo-list li', {
      has: this.page.getByText(todoText),
    })
  }

  async clearAllTodos() {
  const requestContext = this.page.request;
  await requestContext.delete('https://csharp-todo-backend.azurewebsites.net/api/v1/todo');
}
}
