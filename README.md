# Doorcode

Doorcode is a graphQL based service which provides one-time-only / passwordless tokens that can be used as a method for giving access to restricted systems, applications or user accounts.

Not only does doorcode provide a means to authenticate users without requiring a password based system, but it also acts as a single source of truth for user verification and provides a UUID generator. UUIDs are claimed by users when they verify themselves against the service.

## Getting Started

### Workflow

Verification using a phone number (SMS) requires 3 steps:

1.  Make a `verifyWithPhoneNumber` query that accepts a valid phone number and a dialing code.

    ```
    {
        verifyWithPhoneNumber(phoneNumber: "0123456789", dialingCode: "44") {
            success
            error
        }
    }
    ```

    If the query succeeds success will be returned `true` and the recepient will receive a 6 digit code. Otherwise success will be returned as `false` and an error message returned.

2.  Make a `validateCode` query that accepts a code (sent to the device) and a `verificationHash`. The hash is generated using common data shared between the client and the doorcode service and is used as a mechanism to prevent man-in-the-middle and replay attacks. You could consider the `verificationHash` as a public key.

    More on generating a `verificationHash` [here](#generating-a-verification-hash)

    ```
    {
        validateCode(code: "123456", verificationHash: "<LONG HASH VALUE>") {
            token
            error
            valid
        }
    }
    ```

    If the query succeeds and the `verificationHash` and `code` are accepted you'll receive a token. Tokens can be exchanged for a valid UUID representing an identity within your application, our UUIDs are unique and cannot be duplicated by any other identity within doorcode.

    If validation fails, the value of `token` will be `null` and an error message will be returned.

3.  Finally, you have a token that you wish to exchange for a valid and verified identity. Make a `exchangeTokenForUser` query with the token you wish to exchange.

    ```
    {
        exchangeTokenForUser(token: "<LONG TOKEN VALUE>") {
            uuid
            error
        }
    }
    ```

    If the token represents a verified and valid identity you'll receive a `uuid` which can be used within your application or service to represent the token's owner.

    If a token is invalid or the identity has not been verified (more on how this can happen [here](#identity-token-states)) `uuid` will be `null` and an error message will be returned.

### [Generating a verification hash](#generating-a-verification-hash)

As you've seen in step 2 of our verification workflow you will likely need to generate a verification hash, this can be seen as a public key which uses shared data available to both the client and the server. For the `verifyWithPhoneNumber` that will be the user's phone number - however, we don't want to trasmit this beyond the first step and we wish to only use it to verify that further steps taken to verify our identity is coming from the same device, application etc.

A `verificationHash` is a standard JWT token using HS256 and provides a payload with a nonce. The nonce will be our shared data. There's 2 parts to generating our hash.

1.  Generate a nonce using the user's phone number from the first step by encrypting it using the [`bycrypt`](https://en.wikipedia.org/wiki/Bcrypt) hashing function and using your application secret as the salt.

2.  Generate a valid JWT token with your nonce as the payload, include `noTimestamp` as `true` as we do not wish for the hash to expire and it will remain the same for this identity unless your application secret changes or their shared data changes. You should also sign your JWT token with your application secret.

### [Identity token states](#identity-token-states)

A token carries no state, but does represent a UUID. If the identity behind the UUID has not been verified token exchanges will fail.

#### Why would an indentity with a token no longer be verified?

It is possible for an indentity to become unverified if the application or user has requested to be verified again, either due to an expired session or a user wishing to carry out the process again. Invaliding the token.

#### Do tokens change or expire?

No, a token will not expire but they may change if the underlying identity changes, most likely a token will be immutable and can be stored safely for long periods of time, even if a user wishes to verify themselves again; a token will only be valid once an identity is verified.

### Prerequisites

### [Prisma](https://github.com/graphcool/prisma)

We use Prisma and prisma-bindings as our primary data store. Prisma provides a graphQL API above a database, very handy for cutting down boilerplate CRUD operations and abstractions.

### [Docker](https://www.docker.com/)

We use Docker as a way to containerize and easily deploy the Doorcode application.

### Installing

`yarn` or `npm install` can be used to install the necessary packages, our preferred option is `yarn`

### Config

## Commands

`(yarn | npm) run start` - transpiles code & runs the server on port 4000 (by default) with no hot reloading or output

`(yarn | npm) run dev` - transpiles code & runs a development server on port 4000 (by default) and enables hot reloading

`(yarn | npm) run debug` - transpiles code & runs a development server on port 4000 (by default) and enables a nodejs inspect session

## Running Tests

### Deployment / Versioning

### Dependancies

### Gotchas

#### Invalid JWT token or failed verification

A great resource for verifying and validating JWT tokens is [jwt.io](https://jwt.io/) you can confirm whether your token is as expected and diagnose issues with their free tool.
