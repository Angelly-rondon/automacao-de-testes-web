import { expect } from '@wdio/globals'
import {
    alternativeTestUser,
    loginWithValidUser,
} from '../../data/users.data.js'
import NavLoggedInComponent from '../../pageobjects/components/navLoggedIn.component.js'
import ProductsPage from '../../pageobjects/pages/products.page.js'
import ProductDetailsPage from '../../pageobjects/pages/product.details.page.js'
import CartPage from '../../pageobjects/pages/cart.page.js'
import LoginPage from '../../pageobjects/pages/login.page.js'

describe('Session Isolation', () => {
    beforeEach(async () => {
        await browser.deleteCookies()
    })

    //
    it('should not share cart between users', async () => {
        await loginWithValidUser()

        await expect(NavLoggedInComponent.logout).toBeDisplayed() //verifica se foi feito o login com sucesso
        await expect(
            NavLoggedInComponent.userNameNavBar(process.env.TEST_USER_NAME!),
        ).toBeDisplayed() //verifica a conta logada

        await NavLoggedInComponent.products.click()
        await ProductsPage.productsDetails.click()
        await ProductDetailsPage.btnAddToCart.click() //adiciona produto no carrinho

        await ProductDetailsPage.viewCart.click()
        await expect(CartPage.cartProducts).toBeElementsArrayOfSize(1) //verifica se o item foi adicionado ao carrinho

        await NavLoggedInComponent.logout.click()

        await expect(NavLoggedInComponent.logout).not.toBeDisplayed() //verifica se está deslogado
        await expect(
            NavLoggedInComponent.userNameNavBar(process.env.TEST_USER_NAME!),
        ).not.toBeDisplayed()
        await expect(browser).toHaveUrl(
            'https://www.automationexercise.com/login',
        )

        await LoginPage.login(
            alternativeTestUser.emailLogin,
            alternativeTestUser.passwordLogin,
        )

        await expect(NavLoggedInComponent.logout).toBeDisplayed() //verifica se foi logado com sucesso
        await expect(
            NavLoggedInComponent.userNameNavBar(
                process.env.TEST_USER_NAME_ALTERNATIVE!,
            ),
        ).toBeDisplayed() // verifica a conta logada

        await NavLoggedInComponent.cart.click() //acessa o carrinho
        await expect(CartPage.cartProducts).toBeElementsArrayOfSize(0) //verifica que não há itens adicionados
    })
})
