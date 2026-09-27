import LoginPage from '../pageobjects/pages/login.page.js'

const testUser = {
    email: process.env.TEST_USER_EMAIL!,
    password: process.env.TEST_USER_PASSWORD!
}

// usado pra abrir a página e logar com um usuário válido
export async function loginWithValidUser() {
    await LoginPage.open()
    await LoginPage.login(
        testUser.email,
        testUser.password
    )
}
