
import { expect } from '@wdio/globals'
import LoginPage from '../../pageobjects/pages/login.page.ts'
import NavLoggedInComponent from '../../pageobjects/components/navLoggedIn.component.js'

describe('Navigation in Automation Exercise', () => {
    beforeEach(async () => {
        await browser.deleteCookies()
        await LoginPage.open()
        await LoginPage.login(
            process.env.TEST_USER_EMAIL!,
            process.env.TEST_USER_PASSWORD!
        )
    })

    //Navegação entre páginas
    it('should navigate between pages', async () => {
        await NavLoggedInComponent.products.click()
        await NavLoggedInComponent.productsDetails.click()

        await expect(NavLoggedInComponent.availability).toBeDisplayed() //verifica informação da tela de detalhes do produto
        await expect(browser).toHaveUrl('https://www.automationexercise.com/product_details/1')
    })

})