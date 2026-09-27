import { expect } from '@wdio/globals'
import NavLoggedInComponent from '../../pageobjects/components/navLoggedIn.component.ts'
import { loginWithValidUser } from '../../data/users.ts'
import ProductsPage from '../../pageobjects/pages/products.page.ts'
import CartPage from '../../pageobjects/pages/cart.page.ts'
import ProductDetailsPage from '../../pageobjects/pages/product.details.page.ts'

describe('Product Cart', () => {
    beforeEach(async () => {
        await browser.deleteCookies()
        await loginWithValidUser()
    })

    //Adiciona um produto no carrinho
    it('should add a product in the cart', async () => {
        await NavLoggedInComponent.products.click()
        await ProductsPage.productsDetails.click()
        await ProductDetailsPage.btnAddToCart.click()
        await ProductDetailsPage.viewCart.click()

        await expect(CartPage.cartProducts).toBeElementsArrayOfSize(1)
        await expect(browser).toHaveUrl(
            'https://www.automationexercise.com/view_cart',
        )
    })
})
