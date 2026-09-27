import { expect } from '@wdio/globals'
import { createSuccesfullySignupData } from '../../data/signup.data.ts'
import LoginPage from '../../pageobjects/pages/login.page.ts'
import SignupPage from '../../pageobjects/pages/signup.page.ts'
import NavLoggedInComponent from '../../pageobjects/components/navLoggedIn.component.ts'
import AccountCreated from '../../pageobjects/pages/account-created.page.ts'

describe('Account Registration', () => {
    beforeEach(async () => {
        await browser.deleteCookies()
        await LoginPage.open()
    })

    it('should register a new account', async () => {
        const signupData = createSuccesfullySignupData()

        // Acessa a página de cadastro
        await LoginPage.accessSignupPage(
            signupData.name,
            signupData.email
        )

        // Verifica se o formulário de cadastro foi carregado
        await expect(browser).toHaveUrl(
            'https://www.automationexercise.com/signup'
        )

        // Preenche e envia o cadastro
        await SignupPage.completeSignup(signupData)

        await AccountCreated.clickButtonContinue()
        await expect(NavLoggedInComponent.logout).toBeDisplayed() //verifica se foi logado com sucesso 
        await expect(NavLoggedInComponent.userNameNavBar(signupData.name)).toBeDisplayed() //verifica a conta logada//validar se o user foi criado
        
        await NavLoggedInComponent.deleteAccount()
        await expect(NavLoggedInComponent.logout).not.toBeDisplayed() //verifica se não foi logado com sucesso 
        await expect(NavLoggedInComponent.userNameNavBar(signupData.name)).not.toBeDisplayed() //verifica se está deslogado
    })
})