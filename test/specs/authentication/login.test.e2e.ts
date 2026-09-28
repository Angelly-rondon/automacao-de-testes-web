import { expect } from '@wdio/globals'
import LoginPage from '../../pageobjects/pages/login.page.js'
import NavLoggedInComponent from '../../pageobjects/components/navLoggedIn.component.ts'
import { loginWithValidUser } from '../../data/users.data.ts'

describe('Authentication', () => {
    beforeEach(async () => {
        await browser.deleteCookies()
        await LoginPage.open()
    })

    it('should login with valid credentials', async () => {
        await LoginPage.login(
            process.env.TEST_USER_EMAIL!,
            process.env.TEST_USER_PASSWORD!,
        )

        await expect(NavLoggedInComponent.logout).toBeDisplayed() 
        await expect(
            NavLoggedInComponent.userNameNavBar(process.env.TEST_USER_NAME!),
        ).toBeDisplayed() 
    })

    it('should not login with e-mail not registered ', async () => {
        await LoginPage.login(
            'automation@gmail.com',
            process.env.TEST_USER_PASSWORD!,
        )

        await expect(LoginPage.invalidLoginErrorMessage).toBeDisplayed() 
    })

    it('should not login with invalid password', async () => {
        await LoginPage.login(process.env.TEST_USER_EMAIL!, 'Password')

        await expect(LoginPage.invalidLoginErrorMessage).toBeDisplayed()
    })

    it('should not login when mandatory fields are empty', async () => {
        await expect(LoginPage.inputEmailLogin).toHaveAttribute(
            'required',
            'true',
        )
        await expect(LoginPage.inputPasswordLogin).toHaveAttribute(
            'required',
            'true',
        )

        await LoginPage.login('', '')

        await expect(NavLoggedInComponent.logout).not.toBeDisplayed() 
        await expect(
            NavLoggedInComponent.userNameNavBar(process.env.TEST_USER_NAME!),
        ).not.toBeDisplayed() 
    })

    it('should logout successfully', async () => {
        await loginWithValidUser()

        await expect(NavLoggedInComponent.logout).toBeDisplayed() 
        await expect(
            NavLoggedInComponent.userNameNavBar(process.env.TEST_USER_NAME!),
        ).toBeDisplayed() 

        await NavLoggedInComponent.logout.click()
        await expect(browser).toHaveUrl(
            'https://www.automationexercise.com/login',
        )
        await expect($('h2=Login to your account')).toBeDisplayed()
    })
})
