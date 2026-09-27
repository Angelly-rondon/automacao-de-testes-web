import { faker } from '@faker-js/faker'

export function createSuccesfullySignupData() {
    return {
        title: 'Mr', // radius button
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        dateOfBirth: {
            // dropdown
            day: '15',
            month: 'June',
            year: '2000',
        },
        newsletter: true, // checkbox
        specialOffers: false, //checkbox
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        country: 'United States', // dropdown
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobileNumber: faker.phone.number(),
    }
}
