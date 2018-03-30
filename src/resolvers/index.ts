import PhoneNumber from '../models/PhoneNumber'
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
        ) {
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
        ) {
            return validateCode(args.code, args.verificationHash, context.db)
        },
    },
}
