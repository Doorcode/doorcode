import * as jwt from 'jsonwebtoken'

export default class Identifier {
    static generateHash(phoneNumber: string): string {
        return jwt.sign({ phoneNumber }, process.env.JWT_SECRET_KEY, {
            noTimestamp: true,
        })
    }

    static validateHash(hash: string) {
        return jwt.verify(hash, process.env.JWT_SECRET_KEY)
    }

    static generateToken(uuid: string) {
        return jwt.sign({ uuid }, process.env.JWT_SECRET_KEY)
    }
}
