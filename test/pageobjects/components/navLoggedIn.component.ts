import { $ } from '@wdio/globals'

class NavLoggedInComponent {
    public get logout() {
        return $('a[href="/logout"]')
    }

    public get products() {
        return $('a[href="/products"]')
    }

    public get availability() {
        return $('b=Availability:')
    }

    public get userNameNavBar() {
        return $('b=Automação Testes Web')
    }
}

export default new NavLoggedInComponent()
