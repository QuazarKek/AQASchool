import { test as base } from '@playwright/test';

// 1. Define the types for your custom fixtures
type MyFixtures = {
    mockedTodos: any[];
};

// 2. Extend the base test with your new fixture
export const test = base.extend<MyFixtures>({

    mockedTodos: async ({ page }, use) => {
        const mockData = [
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
        ];

        await page.route('**/api/v1/todo', async (route) => {
            const req = route.request();
            const url = req.url();

            if (req.method() === 'GET' && url.includes('/todo') &&
                (req.resourceType() === 'xhr' || req.resourceType() === 'fetch')) {
                await route.fulfill({ json: mockData });
            } else {
                await route.continue();
            }
        });

        // 3. The 'use()' function tells Playwright to pause the fixture and run the actual test.
        await use(mockData);

        //4. Optional: Anything placed after use() runs as teardown after the test finishes
    },
});

export { expect } from '@playwright/test';