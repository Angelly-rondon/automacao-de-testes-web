import { $$ } from '@wdio/globals'
import Page from '../page.js'

class CartPage extends Page {
    public get cartProducts() {
        return $$('tr[id^="product-"]')
    }
}
export default new CartPage()
