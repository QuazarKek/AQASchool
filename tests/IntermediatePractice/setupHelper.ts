import { Page } from "@playwright/test";

export class Helper {
    readonly page: Page;

    constructor(
        page: Page) {
        this.page = page;
    }

    readonly apiUrl = "https://csharp-todo-backend.azurewebsites.net/api/v1/todo";

    async setupMockTodos() {
        await this.page.route(this.apiUrl, route => {
            route.fulfill({
                status: 200,
                json: [
                    { id: "1", title: 'Mocked Task 1', completed: false, order: 1, },
                    { id: "2", title: 'Mocked Task 2', completed: true, order: 2, }
                ]
            })
        });
    }
}