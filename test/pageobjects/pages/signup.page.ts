import { $ } from '@wdio/globals'
import Page from '../page.js'
import { createSuccesfullySignupData } from '../../data/signup.data.js'

class SignupPage extends Page {
    public get titleMr() {
        return $('#id_gender1')
    }

    public get titleMrs() {
        return $('#id_gender2')
    }

    public get inputName() {
        return $('input[data-qa="name"]')
    }

    public get inputEmail() {
        return $('input[data-qa="email"]')
    }

    public get inputPassword() {
        return $('#password')
    }

    public get dateOfBirthDay() {
        return $('[data-qa="days"]')
    }

    public get dateOfBirthMonth() {
        return $('[data-qa="months"]')
    }

    public get dateOfBirthYear() {
        return $('[data-qa="years"]')
    }

    public get newsletter() {
        return $('#newsletter')
    }

    public get specialOffers() {
        return $('#optin')
    }

    public get inputFirstName() {
        return $('input[data-qa="first_name"]')
    }

    public get inputLastName() {
        return $('input[data-qa="last_name"]')
    }

    public get inputAddress() {
        return $('input[data-qa="address"]')
    }

    public get country() {
        return $('[data-qa="country"]')
    }

    public get inputState() {
        return $('input[data-qa="state"]')
    }

    public get inputCity() {
        return $('input[data-qa="city"]')
    }

    public get inputZipcode() {
        return $('input[data-qa="zipcode"]')
    }

    public get inputMobileNumber() {
        return $('input[data-qa="mobile_number"]')
    }

    public get btnCreateAccount() {
        return $('button[data-qa="create-account"]')
    }

    public async completeSignup(
        signupData: ReturnType<typeof createSuccesfullySignupData>,
    ) {
        // Title - radio button
        if (signupData.title === 'Mr') {
            await this.titleMr.click()
        } else if (signupData.title === 'Mrs') {
            await this.titleMrs.click()
        }

        // Password
        await this.inputPassword.setValue(signupData.password)

        // Date of birth - dropdown
        await this.dateOfBirthDay.selectByVisibleText(
            signupData.dateOfBirth.day,
        )

        await this.dateOfBirthMonth.selectByVisibleText(
            signupData.dateOfBirth.month,
        )

        await this.dateOfBirthYear.selectByVisibleText(
            signupData.dateOfBirth.year,
        )

        // Newsletter - checkbox
        if (signupData.newsletter) {
            await this.newsletter.click()
        }

        // Special offers - checkbox
        if (signupData.specialOffers) {
            await this.specialOffers.click()
        }

        // Address information
        await this.inputFirstName.setValue(signupData.firstName)

        await this.inputLastName.setValue(signupData.lastName)

        await this.inputAddress.setValue(signupData.address)

        // Country - dropdown
        await this.country.selectByVisibleText(signupData.country)

        await this.inputState.setValue(signupData.state)

        await this.inputCity.setValue(signupData.city)

        await this.inputZipcode.setValue(signupData.zipcode)

        await this.inputMobileNumber.setValue(signupData.mobileNumber)

        await this.btnCreateAccount.click()
    }
}

export default new SignupPage()
