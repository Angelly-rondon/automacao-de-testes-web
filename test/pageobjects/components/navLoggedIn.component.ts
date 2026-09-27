import { $ } from '@wdio/globals'

class NavLoggedInComponent {
    public get logout() {
        return $('a[href="/logout"]')
    }

    public get btnDeleteAccount(){
        return $('a[href="/delete_account"]')
    }

    public get products() {
        return $('a[href="/products"]')
    }

    public get availability() {
        return $('b=Availability:')
    }

    public userNameNavBar(userName: string) {
        return $(`b=${userName}`)
    }

    public async deleteAccount(){
        await this.btnDeleteAccount.click()
    }

}

export default new NavLoggedInComponent()
