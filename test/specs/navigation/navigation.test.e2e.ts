import { expect } from '@wdio/globals'
import NavLoggedInComponent from '../../pageobjects/components/navLoggedIn.component.js'
import { loginWithValidUser } from '../../data/users.data.ts'
import ProductsPage from '../../pageobjects/pages/products.page.ts'

describe('Navigation', () => {
    beforeEach(async () => {
        await browser.deleteCookies()
        await loginWithValidUser()
    })

    //Navegação entre páginas
    it('should navigate between pages', async () => {
        await NavLoggedInComponent.products.click()
        await ProductsPage.productsDetails.click()

        await expect(NavLoggedInComponent.availability).toBeDisplayed() //verifica informação da tela de detalhes do produto
        await expect(browser).toHaveUrl(
            'https://www.automationexercise.com/product_details/1',
        )
    })
})
