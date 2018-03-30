import * as validate from 'validate.js'

export default class PhoneNumber {
    static isValid(phoneNumber: string): boolean {
        const constraints = {
            phoneNumber: { length: { is: 10 }, numericality: true },
        }

        return (
            validate(
                { phoneNumber: PhoneNumber.sanitize(phoneNumber) },
                constraints,
            ) === undefined
        )
    }

    static sanitize(number: string): string {
        return number.replace(/^0/, '')
    }
}
