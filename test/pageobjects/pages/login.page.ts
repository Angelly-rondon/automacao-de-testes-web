import { $ } from '@wdio/globals'
import Page from '../page.js'

class LoginPage extends Page {
    public get inputEmailLogin() {
        return $('input[data-qa="login-email"]')
    }

    public get inputPasswordLogin() {
        return $('input[data-qa="login-password"]')
    }

    public get inputNameSignup() {
        return $('input[data-qa="signup-name"]')
    }

    public get inputEmailSignup() {
        return $('input[data-qa="signup-email"]')
    }

    public get btnLogin() {
        return $('button[data-qa="login-button"]')
    }

    public get btnSignup() {
        return $('button[data-qa="signup-button"]')
    }

    public get invalidLoginErrorMessage() {
        return $('p=Your email or password is incorrect!')
    }

    public async login(email: string, password: string) {
        await this.inputEmailLogin.setValue(email)
        await this.inputPasswordLogin.setValue(password)
        await this.btnLogin.click()
    }

    public async accessSignupPage(name: string, email: string) {
        await this.inputNameSignup.setValue(name)
        await this.inputEmailSignup.setValue(email)
        await this.btnSignup.click()
    }

    public open() {
        return super.open('login')
    }
}

export default new LoginPage()
