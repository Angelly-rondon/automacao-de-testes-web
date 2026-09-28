import { faker } from '@faker-js/faker'

export function createSuccesfullySignupData() {
    return {
        title: 'Mr', 
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        dateOfBirth: {
            day: '15',
            month: 'June',
            year: '2000',
        },
        newsletter: true, 
        specialOffers: false, 
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        country: 'United States',
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobileNumber: faker.phone.number(),
    }
}
