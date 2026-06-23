import { test, expect } from './fixture';
import { TodoPage } from './TodoPage'
import { Helper } from './setupHelper'

let todoPage: TodoPage
let helper: Helper

test.beforeEach(async ({ page }) => {
  todoPage = new TodoPage(page)
  helper = new Helper(page)
  await todoPage.goto()
})

test.afterEach(async () => {
  await todoPage.clearAllTodos()
})

test('should load the page with mocked to-do items v1_fixture', async ({ page, mockedTodos }) => { //зверни увагу що тут використовується fixture mockedTodos, змінну для якої ми визначили в файлі fixture.ts, а тут просто передаємо її в тест, і вона буде доступна в тесті як змінна і її не треба імпортувати з іншого файлу
  
    //на цьому етапі постав точку зупинки в цьому тесті і в mockedTodos, подивись що в змінній яка передається в тест, і коли вона передається в тест, і що в ній знаходиться, і як вона співвідноситься з тим що ми визначили в файлі fixture.ts

    //Фікстури бувають дуже різні, як супер просту - ти можеш в адванст практиці зробити фікстуру яка буде просто повертати якусь змінну, і тоді в тесті ти її будеш використовувати як звичайну змінну, і не треба буде її імпортувати з іншого файлу. І також зробити фікстуру для POM сторінок, щоб простіше їх використовувати в тестах, і не треба було б їх імпортувати в кожному тесті. 
  await todoPage.goto()

  await expect(todoPage.todoItems).toHaveCount(mockedTodos.length)
  await expect(todoPage.getTodoByText('Mocked Task 1')).toBeVisible()
  await expect(todoPage.getTodoByText('Mocked Task 2')).toBeVisible()

  const completedTodo = todoPage.getTodoByText('Mocked Task 2')
  await expect(completedTodo).toHaveClass(/completed/)
})

test('should load the page with mocked to-do items v2_helper', async ({ page }) => {
  await helper.setupMockTodos();//тут я створила хелпер який буде робити те саме що і в попередньому тесті, але тепер ми можемо його використовувати в будь-якому тесті, і не треба буде писати код який робить мокування кожного разу, а просто викликати хелпер. Зазвичай тести виглядають охайно і не містять багато коду. А все відбувається десь в середині. також цей хелпер як і фікстуру вище можна проапдейтити і передавати джейсон який ми хочемо замокати, і тоді ми зможемо замокати будь-які дані які нам потрібні в тесті, а не тільки ті що ми визначили в фікстурі. Але для цього треба буде трохи змінити хелпер, щоб він приймав параметр з джейсоном який ми хочемо замокати.

  await todoPage.goto()

  await expect(todoPage.todoItems).toHaveCount(2)
  await expect(todoPage.getTodoByText('Mocked Task 1')).toBeVisible() // також для урл і констант зазвичай створюють окремі файли з константами , і тоді в тесті ми просто імпортуємо константи і використовуємо їх, а не хардкодимо значення в тесті. Це робиться для того щоб якщо нам треба буде змінити значення, то ми змінимо його в одному місці, а не в кожному тесті де воно використовується.
  await expect(todoPage.getTodoByText('Mocked Task 2')).toBeVisible()

  const completedTodo = todoPage.getTodoByText('Mocked Task 2')
  await expect(completedTodo).toHaveClass(/completed/)
});