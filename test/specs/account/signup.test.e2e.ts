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

        await LoginPage.accessSignupPage(signupData.name, signupData.email)

        await expect(browser).toHaveUrl(
            'https://www.automationexercise.com/signup',
        )

        await SignupPage.completeSignup(signupData)

        await AccountCreated.clickButtonContinue()
        await expect(NavLoggedInComponent.logout).toBeDisplayed() 
        await expect(
            NavLoggedInComponent.userNameNavBar(signupData.name),
        ).toBeDisplayed() 

        await NavLoggedInComponent.deleteAccount()
        await expect(NavLoggedInComponent.logout).not.toBeDisplayed() 
        await expect(
            NavLoggedInComponent.userNameNavBar(signupData.name),
        ).not.toBeDisplayed() 
    })
})
