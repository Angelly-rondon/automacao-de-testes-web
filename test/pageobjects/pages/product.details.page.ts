import { $ } from '@wdio/globals'
import Page from '../page.js'

class ProductDetailsPage extends Page {
    public get btnAddToCart() {
        return $('button.btn.btn-default.cart')
    }

    public get viewCart() {
        return $('#cartModal a[href="/view_cart"]')
    }
}

export default new ProductDetailsPage()
