import { expect } from '@wdio/globals'
import NavLoggedInComponent from '../../pageobjects/components/navLoggedIn.component.ts'
import { loginWithValidUser } from '../../data/users.data.ts'
import ProductsPage from '../../pageobjects/pages/products.page.ts'

describe('Product Search', () => {
    beforeEach(async () => {
        await browser.deleteCookies()
        await loginWithValidUser()
    })

    it('should find a product after search', async () => {
        const productName = 'Sleeveless Dress'

        await NavLoggedInComponent.products.click()
        await ProductsPage.productSearch(productName)

        await expect(ProductsPage.productName(productName)).toBeDisplayed() 
    })
})
