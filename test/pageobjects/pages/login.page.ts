import { $ } from '@wdio/globals'
import Page from '../page.js'

class LoginPage extends Page {
    public get inputEmail() {
        return $('input[data-qa="login-email"]')
    }

    public get inputPassword() {
        return $('input[data-qa="login-password"]')
    }

    public get btnLogin() {
        return $('button[data-qa="login-button"]')
    }

    public get invalidLoginErrorMessage() {
        return $('p=Your email or password is incorrect!')
    }

    public async login(email: string, password: string) {
        await this.inputEmail.setValue(email)
        await this.inputPassword.setValue(password)
        await this.btnLogin.click()
    }

    public open() {
        return super.open('login')
    }
}

export default new LoginPage()
