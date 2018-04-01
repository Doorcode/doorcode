import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

export default class Identifier {
    static generateHash(phoneNumber: string): string {
        return jwt.sign(
            {
                nonce: phoneNumber,
            },
            process.env.JWT_SECRET_KEY,
            {
                noTimestamp: true,
            },
        )
    }

    static validateHash(hash: string): { nonce: string } {
        return jwt.verify(hash, process.env.JWT_SECRET_KEY) as { nonce: string }
    }

    static validateToken(token: string): { uuid: string } {
        return jwt.verify(token, process.env.JWT_SECRET_KEY) as { uuid: string }
    }

    static generateToken(uuid: string): string {
        return jwt.sign({ uuid }, process.env.JWT_SECRET_KEY)
    }
}
