import Identifier from '../models/Identifier'
import PhoneNumber from '../models/PhoneNumber'
import exchangeTokenForUser from './ExchangeTokenForUser'
import validateCode from './ValidateCode'
import verifyWithPhoneNumber from './VerifyWithPhoneNumber'

import { Context } from '../utils'

export default {
    Query: {
        async verifyWithPhoneNumber(
            parent,
            args: { phoneNumber: string; dialingCode: string },
            context: Context,
            info,
        ): Promise<{ success: boolean; error?: string }> {
            return verifyWithPhoneNumber(
                PhoneNumber.sanitize(args.phoneNumber),
                args.dialingCode,
                context.db,
            )
        },
        async validateCode(
            parent,
            args: { code: string; verificationHash: string },
            context: Context,
            info,
        ): Promise<{ valid: boolean; token?: string; error?: string }> {
            return validateCode(args.code, args.verificationHash, context.db)
        },
        async exchangeTokenForUser(
            parent,
            args: { token: string },
            context: Context,
            info,
        ): Promise<{ uuid?: string; error?: string }> {
            return exchangeTokenForUser(args.token, context.db)
        },
    },
}
