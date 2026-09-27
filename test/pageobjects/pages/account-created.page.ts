import { $ } from '@wdio/globals'
import Page from '../page.js'

class AccountCreated extends Page {
    public get btnContinue() {
        return $('a[data-qa="continue-button"]')
    }

    public async clickButtonContinue() {
        await this.btnContinue.click()
    }
}
export default new AccountCreated()
