import LoginPage from '../pageobjects/pages/login.page.js'

//Usuário principal
export const testUserLogin = {
    name: process.env.TEST_USER_NAME!,
    emailLogin: process.env.TEST_USER_EMAIL!,
    passwordLogin: process.env.TEST_USER_PASSWORD!,
}

//Usuário alternativo
export const alternativeTestUser = {
    emailLogin: process.env.TEST_USER_EMAIL_ALTERNATIVE!,
    passwordLogin: process.env.TEST_USER_PASSWORD_ALTERNATIVE!,
}

// usado pra abrir a página e logar com um usuário válido
export async function loginWithValidUser() {
    await LoginPage.open()
    await LoginPage.login(testUserLogin.emailLogin, testUserLogin.passwordLogin)
}
