import LoginPage from '../pageobjects/pages/login.page.js'

export const testUserLogin = {
    name: process.env.TEST_USER_NAME!,
    emailLogin: process.env.TEST_USER_EMAIL!,
    passwordLogin: process.env.TEST_USER_PASSWORD!,
}

export const alternativeTestUser = {
    emailLogin: process.env.TEST_USER_EMAIL_ALTERNATIVE!,
    passwordLogin: process.env.TEST_USER_PASSWORD_ALTERNATIVE!,
}

export async function loginWithValidUser() {
    await LoginPage.open()
    await LoginPage.login(testUserLogin.emailLogin, testUserLogin.passwordLogin)
}
