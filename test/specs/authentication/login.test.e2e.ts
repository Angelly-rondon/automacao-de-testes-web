import { expect } from '@wdio/globals'
import LoginPage from '../../pageobjects/pages/login.page.js'
import NavLoggedInComponent from '../../pageobjects/components/navLoggedIn.component.ts'
import { loginWithValidUser } from '../../data/users.ts'

describe('Authentication', () => {
    beforeEach(async () => {
        await browser.deleteCookies()
        await LoginPage.open()
    })

    //Login com sucesso
    it('should login with valid credentials', async () => {
        await LoginPage.login(
            process.env.TEST_USER_EMAIL!,
            process.env.TEST_USER_PASSWORD!,
        )

        await expect(NavLoggedInComponent.logout).toBeDisplayed() //verifica se foi logado com sucesso
        await expect(NavLoggedInComponent.userNameNavBar).toBeDisplayed() //verifica a conta logada
    })

    //Login com e-mail não cadastrado
    it('should not login with e-mail not registered ', async () => {
        await LoginPage.login(
            'automation@gmail.com',
            process.env.TEST_USER_PASSWORD!,
        )

        await expect(LoginPage.invalidLoginErrorMessage).toBeDisplayed() //verifica a mensagem de erro
    })

    //Login com senha inválida
    it('should not login with invalid password', async () => {
        await LoginPage.login(process.env.TEST_USER_EMAIL!, 'Password')

        await expect(LoginPage.invalidLoginErrorMessage).toBeDisplayed()
    })

    //Login com campos vazios
    it('should not login when mandatory fields are empty', async () => {
        await expect(LoginPage.inputEmail).toHaveAttribute('required', 'true')
        await expect(LoginPage.inputPassword).toHaveAttribute(
            'required',
            'true',
        )

        await LoginPage.login('', '')

        await expect(NavLoggedInComponent.logout).not.toBeDisplayed() //verifica se está logado
        await expect(NavLoggedInComponent.userNameNavBar).not.toBeDisplayed() //verifica que não tem uma conta logada
    })

    //Logout após um login
    it('should logout successfully', async () => {
        await loginWithValidUser()

        await expect(NavLoggedInComponent.logout).toBeDisplayed() //verifica se foi logado com sucesso
        await expect(NavLoggedInComponent.userNameNavBar).toBeDisplayed() //verifica a conta logada

        //Verificações do logout em si
        await NavLoggedInComponent.logout.click()
        await expect(browser).toHaveUrl(
            'https://www.automationexercise.com/login',
        )
        await expect($('h2=Login to your account')).toBeDisplayed()
    })
})
