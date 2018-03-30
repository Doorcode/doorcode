import * as moment from 'moment'

export default class VerificationCode {
    static generateCode(): string {
        return moment()
            .unix()
            .toString()
            .slice(-6)
    }

    static generateValidUntil(): string {
        return moment()
            .add({ minutes: 8 })
            .utc()
            .format()
    }

    static hasExpired(validUntil: string): boolean {
        return moment(validUntil).isBefore(moment())
    }
}
