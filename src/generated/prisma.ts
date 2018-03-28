import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type CountryCode implements Node {
  id: ID!
  name: String
  countryCode: String!
  dialingCode: String!
  active: Boolean
  phoneNumbers(where: PhoneNumberWhereInput, orderBy: PhoneNumberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PhoneNumber!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Identifier implements Node {
  id: ID!
  hash: String!
  phoneNumber(where: PhoneNumberWhereInput): PhoneNumber
  user(where: UserWhereInput): User
  verificationCodes(where: VerificationCodeWhereInput, orderBy: VerificationCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VerificationCode!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type PhoneNumber implements Node {
  countryCode(where: CountryCodeWhereInput): CountryCode!
  createdAt: DateTime!
  id: ID!
  identifier(where: IdentifierWhereInput): Identifier
  phoneNumber: String!
  updatedAt: DateTime!
}

type User implements Node {
  createdAt: DateTime!
  id: ID!
  identifier(where: IdentifierWhereInput): Identifier
  updatedAt: DateTime!
  uuid: String
  isVerified: Boolean
}

type VerificationCode implements Node {
  code: String!
  createdAt: DateTime!
  id: ID!
  identifier(where: IdentifierWhereInput): Identifier
  updatedAt: DateTime!
  validUntil: DateTime!
}

type AggregateCountryCode {
  count: Int!
}

type AggregateIdentifier {
  count: Int!
}

type AggregatePhoneNumber {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVerificationCode {
  count: Int!
}

type BatchPayload {
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

"""
A connection to a list of items.
"""
type CountryCodeConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [CountryCodeEdge]!
  aggregate: AggregateCountryCode!
}

input CountryCodeCreateInput {
  name: String
  countryCode: String!
  dialingCode: String!
  active: Boolean
  phoneNumbers: PhoneNumberCreateManyWithoutCountryCodeInput
}

input CountryCodeCreateOneWithoutPhoneNumbersInput {
  create: CountryCodeCreateWithoutPhoneNumbersInput
  connect: CountryCodeWhereUniqueInput
}

input CountryCodeCreateWithoutPhoneNumbersInput {
  name: String
  countryCode: String!
  dialingCode: String!
  active: Boolean
}

"""
An edge in a connection.
"""
type CountryCodeEdge {
  """
  The item at the end of the edge.
  """
  node: CountryCode!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum CountryCodeOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  countryCode_ASC
  countryCode_DESC
  dialingCode_ASC
  dialingCode_DESC
  active_ASC
  active_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CountryCodePreviousValues {
  id: ID!
  name: String
  countryCode: String!
  dialingCode: String!
  active: Boolean
  createdAt: DateTime!
  updatedAt: DateTime!
}

type CountryCodeSubscriptionPayload {
  mutation: MutationType!
  node: CountryCode
  updatedFields: [String!]
  previousValues: CountryCodePreviousValues
}

input CountryCodeSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [CountryCodeSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [CountryCodeSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CountryCodeWhereInput
}

input CountryCodeUpdateInput {
  name: String
  countryCode: String
  dialingCode: String
  active: Boolean
  phoneNumbers: PhoneNumberUpdateManyWithoutCountryCodeInput
}

input CountryCodeUpdateOneWithoutPhoneNumbersInput {
  create: CountryCodeCreateWithoutPhoneNumbersInput
  connect: CountryCodeWhereUniqueInput
  delete: Boolean
  update: CountryCodeUpdateWithoutPhoneNumbersDataInput
  upsert: CountryCodeUpsertWithoutPhoneNumbersInput
}

input CountryCodeUpdateWithoutPhoneNumbersDataInput {
  name: String
  countryCode: String
  dialingCode: String
  active: Boolean
}

input CountryCodeUpsertWithoutPhoneNumbersInput {
  update: CountryCodeUpdateWithoutPhoneNumbersDataInput!
  create: CountryCodeCreateWithoutPhoneNumbersInput!
}

input CountryCodeWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [CountryCodeWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [CountryCodeWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  countryCode: String
  """
  All values that are not equal to given value.
  """
  countryCode_not: String
  """
  All values that are contained in given list.
  """
  countryCode_in: [String!]
  """
  All values that are not contained in given list.
  """
  countryCode_not_in: [String!]
  """
  All values less than the given value.
  """
  countryCode_lt: String
  """
  All values less than or equal the given value.
  """
  countryCode_lte: String
  """
  All values greater than the given value.
  """
  countryCode_gt: String
  """
  All values greater than or equal the given value.
  """
  countryCode_gte: String
  """
  All values containing the given string.
  """
  countryCode_contains: String
  """
  All values not containing the given string.
  """
  countryCode_not_contains: String
  """
  All values starting with the given string.
  """
  countryCode_starts_with: String
  """
  All values not starting with the given string.
  """
  countryCode_not_starts_with: String
  """
  All values ending with the given string.
  """
  countryCode_ends_with: String
  """
  All values not ending with the given string.
  """
  countryCode_not_ends_with: String
  dialingCode: String
  """
  All values that are not equal to given value.
  """
  dialingCode_not: String
  """
  All values that are contained in given list.
  """
  dialingCode_in: [String!]
  """
  All values that are not contained in given list.
  """
  dialingCode_not_in: [String!]
  """
  All values less than the given value.
  """
  dialingCode_lt: String
  """
  All values less than or equal the given value.
  """
  dialingCode_lte: String
  """
  All values greater than the given value.
  """
  dialingCode_gt: String
  """
  All values greater than or equal the given value.
  """
  dialingCode_gte: String
  """
  All values containing the given string.
  """
  dialingCode_contains: String
  """
  All values not containing the given string.
  """
  dialingCode_not_contains: String
  """
  All values starting with the given string.
  """
  dialingCode_starts_with: String
  """
  All values not starting with the given string.
  """
  dialingCode_not_starts_with: String
  """
  All values ending with the given string.
  """
  dialingCode_ends_with: String
  """
  All values not ending with the given string.
  """
  dialingCode_not_ends_with: String
  active: Boolean
  """
  All values that are not equal to given value.
  """
  active_not: Boolean
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  phoneNumbers_every: PhoneNumberWhereInput
  phoneNumbers_some: PhoneNumberWhereInput
  phoneNumbers_none: PhoneNumberWhereInput
}

input CountryCodeWhereUniqueInput {
  id: ID
  dialingCode: String
}

scalar DateTime

"""
A connection to a list of items.
"""
type IdentifierConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [IdentifierEdge]!
  aggregate: AggregateIdentifier!
}

input IdentifierCreateInput {
  hash: String!
  phoneNumber: PhoneNumberCreateOneWithoutIdentifierInput
  user: UserCreateOneWithoutIdentifierInput
  verificationCodes: VerificationCodeCreateManyWithoutIdentifierInput
}

input IdentifierCreateOneWithoutPhoneNumberInput {
  create: IdentifierCreateWithoutPhoneNumberInput
  connect: IdentifierWhereUniqueInput
}

input IdentifierCreateOneWithoutUserInput {
  create: IdentifierCreateWithoutUserInput
  connect: IdentifierWhereUniqueInput
}

input IdentifierCreateOneWithoutVerificationCodesInput {
  create: IdentifierCreateWithoutVerificationCodesInput
  connect: IdentifierWhereUniqueInput
}

input IdentifierCreateWithoutPhoneNumberInput {
  hash: String!
  user: UserCreateOneWithoutIdentifierInput
  verificationCodes: VerificationCodeCreateManyWithoutIdentifierInput
}

input IdentifierCreateWithoutUserInput {
  hash: String!
  phoneNumber: PhoneNumberCreateOneWithoutIdentifierInput
  verificationCodes: VerificationCodeCreateManyWithoutIdentifierInput
}

input IdentifierCreateWithoutVerificationCodesInput {
  hash: String!
  phoneNumber: PhoneNumberCreateOneWithoutIdentifierInput
  user: UserCreateOneWithoutIdentifierInput
}

"""
An edge in a connection.
"""
type IdentifierEdge {
  """
  The item at the end of the edge.
  """
  node: Identifier!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum IdentifierOrderByInput {
  id_ASC
  id_DESC
  hash_ASC
  hash_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type IdentifierPreviousValues {
  id: ID!
  hash: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type IdentifierSubscriptionPayload {
  mutation: MutationType!
  node: Identifier
  updatedFields: [String!]
  previousValues: IdentifierPreviousValues
}

input IdentifierSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [IdentifierSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [IdentifierSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: IdentifierWhereInput
}

input IdentifierUpdateInput {
  hash: String
  phoneNumber: PhoneNumberUpdateOneWithoutIdentifierInput
  user: UserUpdateOneWithoutIdentifierInput
  verificationCodes: VerificationCodeUpdateManyWithoutIdentifierInput
}

input IdentifierUpdateOneWithoutPhoneNumberInput {
  create: IdentifierCreateWithoutPhoneNumberInput
  connect: IdentifierWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: IdentifierUpdateWithoutPhoneNumberDataInput
  upsert: IdentifierUpsertWithoutPhoneNumberInput
}

input IdentifierUpdateOneWithoutUserInput {
  create: IdentifierCreateWithoutUserInput
  connect: IdentifierWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: IdentifierUpdateWithoutUserDataInput
  upsert: IdentifierUpsertWithoutUserInput
}

input IdentifierUpdateOneWithoutVerificationCodesInput {
  create: IdentifierCreateWithoutVerificationCodesInput
  connect: IdentifierWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: IdentifierUpdateWithoutVerificationCodesDataInput
  upsert: IdentifierUpsertWithoutVerificationCodesInput
}

input IdentifierUpdateWithoutPhoneNumberDataInput {
  hash: String
  user: UserUpdateOneWithoutIdentifierInput
  verificationCodes: VerificationCodeUpdateManyWithoutIdentifierInput
}

input IdentifierUpdateWithoutUserDataInput {
  hash: String
  phoneNumber: PhoneNumberUpdateOneWithoutIdentifierInput
  verificationCodes: VerificationCodeUpdateManyWithoutIdentifierInput
}

input IdentifierUpdateWithoutVerificationCodesDataInput {
  hash: String
  phoneNumber: PhoneNumberUpdateOneWithoutIdentifierInput
  user: UserUpdateOneWithoutIdentifierInput
}

input IdentifierUpsertWithoutPhoneNumberInput {
  update: IdentifierUpdateWithoutPhoneNumberDataInput!
  create: IdentifierCreateWithoutPhoneNumberInput!
}

input IdentifierUpsertWithoutUserInput {
  update: IdentifierUpdateWithoutUserDataInput!
  create: IdentifierCreateWithoutUserInput!
}

input IdentifierUpsertWithoutVerificationCodesInput {
  update: IdentifierUpdateWithoutVerificationCodesDataInput!
  create: IdentifierCreateWithoutVerificationCodesInput!
}

input IdentifierWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [IdentifierWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [IdentifierWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  hash: String
  """
  All values that are not equal to given value.
  """
  hash_not: String
  """
  All values that are contained in given list.
  """
  hash_in: [String!]
  """
  All values that are not contained in given list.
  """
  hash_not_in: [String!]
  """
  All values less than the given value.
  """
  hash_lt: String
  """
  All values less than or equal the given value.
  """
  hash_lte: String
  """
  All values greater than the given value.
  """
  hash_gt: String
  """
  All values greater than or equal the given value.
  """
  hash_gte: String
  """
  All values containing the given string.
  """
  hash_contains: String
  """
  All values not containing the given string.
  """
  hash_not_contains: String
  """
  All values starting with the given string.
  """
  hash_starts_with: String
  """
  All values not starting with the given string.
  """
  hash_not_starts_with: String
  """
  All values ending with the given string.
  """
  hash_ends_with: String
  """
  All values not ending with the given string.
  """
  hash_not_ends_with: String
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  phoneNumber: PhoneNumberWhereInput
  user: UserWhereInput
  verificationCodes_every: VerificationCodeWhereInput
  verificationCodes_some: VerificationCodeWhereInput
  verificationCodes_none: VerificationCodeWhereInput
}

input IdentifierWhereUniqueInput {
  id: ID
  hash: String
}

"""
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""
An object with an ID
"""
interface Node {
  """
  The id of the object.
  """
  id: ID!
}

"""
Information about pagination in a connection.
"""
type PageInfo {
  """
  When paginating forwards, are there more items?
  """
  hasNextPage: Boolean!
  """
  When paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!
  """
  When paginating backwards, the cursor to continue.
  """
  startCursor: String
  """
  When paginating forwards, the cursor to continue.
  """
  endCursor: String
}

"""
A connection to a list of items.
"""
type PhoneNumberConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [PhoneNumberEdge]!
  aggregate: AggregatePhoneNumber!
}

input PhoneNumberCreateInput {
  phoneNumber: String!
  countryCode: CountryCodeCreateOneWithoutPhoneNumbersInput!
  identifier: IdentifierCreateOneWithoutPhoneNumberInput
}

input PhoneNumberCreateManyWithoutCountryCodeInput {
  create: [PhoneNumberCreateWithoutCountryCodeInput!]
  connect: [PhoneNumberWhereUniqueInput!]
}

input PhoneNumberCreateOneWithoutIdentifierInput {
  create: PhoneNumberCreateWithoutIdentifierInput
  connect: PhoneNumberWhereUniqueInput
}

input PhoneNumberCreateWithoutCountryCodeInput {
  phoneNumber: String!
  identifier: IdentifierCreateOneWithoutPhoneNumberInput
}

input PhoneNumberCreateWithoutIdentifierInput {
  phoneNumber: String!
  countryCode: CountryCodeCreateOneWithoutPhoneNumbersInput!
}

"""
An edge in a connection.
"""
type PhoneNumberEdge {
  """
  The item at the end of the edge.
  """
  node: PhoneNumber!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum PhoneNumberOrderByInput {
  createdAt_ASC
  createdAt_DESC
  id_ASC
  id_DESC
  phoneNumber_ASC
  phoneNumber_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PhoneNumberPreviousValues {
  createdAt: DateTime!
  id: ID!
  phoneNumber: String!
  updatedAt: DateTime!
}

type PhoneNumberSubscriptionPayload {
  mutation: MutationType!
  node: PhoneNumber
  updatedFields: [String!]
  previousValues: PhoneNumberPreviousValues
}

input PhoneNumberSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PhoneNumberSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PhoneNumberSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PhoneNumberWhereInput
}

input PhoneNumberUpdateInput {
  phoneNumber: String
  countryCode: CountryCodeUpdateOneWithoutPhoneNumbersInput
  identifier: IdentifierUpdateOneWithoutPhoneNumberInput
}

input PhoneNumberUpdateManyWithoutCountryCodeInput {
  create: [PhoneNumberCreateWithoutCountryCodeInput!]
  connect: [PhoneNumberWhereUniqueInput!]
  disconnect: [PhoneNumberWhereUniqueInput!]
  delete: [PhoneNumberWhereUniqueInput!]
  update: [PhoneNumberUpdateWithWhereUniqueWithoutCountryCodeInput!]
  upsert: [PhoneNumberUpsertWithWhereUniqueWithoutCountryCodeInput!]
}

input PhoneNumberUpdateOneWithoutIdentifierInput {
  create: PhoneNumberCreateWithoutIdentifierInput
  connect: PhoneNumberWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: PhoneNumberUpdateWithoutIdentifierDataInput
  upsert: PhoneNumberUpsertWithoutIdentifierInput
}

input PhoneNumberUpdateWithoutCountryCodeDataInput {
  phoneNumber: String
  identifier: IdentifierUpdateOneWithoutPhoneNumberInput
}

input PhoneNumberUpdateWithoutIdentifierDataInput {
  phoneNumber: String
  countryCode: CountryCodeUpdateOneWithoutPhoneNumbersInput
}

input PhoneNumberUpdateWithWhereUniqueWithoutCountryCodeInput {
  where: PhoneNumberWhereUniqueInput!
  data: PhoneNumberUpdateWithoutCountryCodeDataInput!
}

input PhoneNumberUpsertWithoutIdentifierInput {
  update: PhoneNumberUpdateWithoutIdentifierDataInput!
  create: PhoneNumberCreateWithoutIdentifierInput!
}

input PhoneNumberUpsertWithWhereUniqueWithoutCountryCodeInput {
  where: PhoneNumberWhereUniqueInput!
  update: PhoneNumberUpdateWithoutCountryCodeDataInput!
  create: PhoneNumberCreateWithoutCountryCodeInput!
}

input PhoneNumberWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PhoneNumberWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PhoneNumberWhereInput!]
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  phoneNumber: String
  """
  All values that are not equal to given value.
  """
  phoneNumber_not: String
  """
  All values that are contained in given list.
  """
  phoneNumber_in: [String!]
  """
  All values that are not contained in given list.
  """
  phoneNumber_not_in: [String!]
  """
  All values less than the given value.
  """
  phoneNumber_lt: String
  """
  All values less than or equal the given value.
  """
  phoneNumber_lte: String
  """
  All values greater than the given value.
  """
  phoneNumber_gt: String
  """
  All values greater than or equal the given value.
  """
  phoneNumber_gte: String
  """
  All values containing the given string.
  """
  phoneNumber_contains: String
  """
  All values not containing the given string.
  """
  phoneNumber_not_contains: String
  """
  All values starting with the given string.
  """
  phoneNumber_starts_with: String
  """
  All values not starting with the given string.
  """
  phoneNumber_not_starts_with: String
  """
  All values ending with the given string.
  """
  phoneNumber_ends_with: String
  """
  All values not ending with the given string.
  """
  phoneNumber_not_ends_with: String
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  countryCode: CountryCodeWhereInput
  identifier: IdentifierWhereInput
}

input PhoneNumberWhereUniqueInput {
  id: ID
  phoneNumber: String
}

"""
A connection to a list of items.
"""
type UserConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  uuid: String
  isVerified: Boolean
  identifier: IdentifierCreateOneWithoutUserInput
}

input UserCreateOneWithoutIdentifierInput {
  create: UserCreateWithoutIdentifierInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutIdentifierInput {
  uuid: String
  isVerified: Boolean
}

"""
An edge in a connection.
"""
type UserEdge {
  """
  The item at the end of the edge.
  """
  node: User!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum UserOrderByInput {
  createdAt_ASC
  createdAt_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  uuid_ASC
  uuid_DESC
  isVerified_ASC
  isVerified_DESC
}

type UserPreviousValues {
  createdAt: DateTime!
  id: ID!
  updatedAt: DateTime!
  uuid: String
  isVerified: Boolean
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  uuid: String
  isVerified: Boolean
  identifier: IdentifierUpdateOneWithoutUserInput
}

input UserUpdateOneWithoutIdentifierInput {
  create: UserCreateWithoutIdentifierInput
  connect: UserWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: UserUpdateWithoutIdentifierDataInput
  upsert: UserUpsertWithoutIdentifierInput
}

input UserUpdateWithoutIdentifierDataInput {
  uuid: String
  isVerified: Boolean
}

input UserUpsertWithoutIdentifierInput {
  update: UserUpdateWithoutIdentifierDataInput!
  create: UserCreateWithoutIdentifierInput!
}

input UserWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserWhereInput!]
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  uuid: String
  """
  All values that are not equal to given value.
  """
  uuid_not: String
  """
  All values that are contained in given list.
  """
  uuid_in: [String!]
  """
  All values that are not contained in given list.
  """
  uuid_not_in: [String!]
  """
  All values less than the given value.
  """
  uuid_lt: String
  """
  All values less than or equal the given value.
  """
  uuid_lte: String
  """
  All values greater than the given value.
  """
  uuid_gt: String
  """
  All values greater than or equal the given value.
  """
  uuid_gte: String
  """
  All values containing the given string.
  """
  uuid_contains: String
  """
  All values not containing the given string.
  """
  uuid_not_contains: String
  """
  All values starting with the given string.
  """
  uuid_starts_with: String
  """
  All values not starting with the given string.
  """
  uuid_not_starts_with: String
  """
  All values ending with the given string.
  """
  uuid_ends_with: String
  """
  All values not ending with the given string.
  """
  uuid_not_ends_with: String
  isVerified: Boolean
  """
  All values that are not equal to given value.
  """
  isVerified_not: Boolean
  identifier: IdentifierWhereInput
}

input UserWhereUniqueInput {
  id: ID
  uuid: String
}

"""
A connection to a list of items.
"""
type VerificationCodeConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [VerificationCodeEdge]!
  aggregate: AggregateVerificationCode!
}

input VerificationCodeCreateInput {
  code: String!
  validUntil: DateTime!
  identifier: IdentifierCreateOneWithoutVerificationCodesInput
}

input VerificationCodeCreateManyWithoutIdentifierInput {
  create: [VerificationCodeCreateWithoutIdentifierInput!]
  connect: [VerificationCodeWhereUniqueInput!]
}

input VerificationCodeCreateWithoutIdentifierInput {
  code: String!
  validUntil: DateTime!
}

"""
An edge in a connection.
"""
type VerificationCodeEdge {
  """
  The item at the end of the edge.
  """
  node: VerificationCode!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum VerificationCodeOrderByInput {
  code_ASC
  code_DESC
  createdAt_ASC
  createdAt_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  validUntil_ASC
  validUntil_DESC
}

type VerificationCodePreviousValues {
  code: String!
  createdAt: DateTime!
  id: ID!
  updatedAt: DateTime!
  validUntil: DateTime!
}

type VerificationCodeSubscriptionPayload {
  mutation: MutationType!
  node: VerificationCode
  updatedFields: [String!]
  previousValues: VerificationCodePreviousValues
}

input VerificationCodeSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [VerificationCodeSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [VerificationCodeSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: VerificationCodeWhereInput
}

input VerificationCodeUpdateInput {
  code: String
  validUntil: DateTime
  identifier: IdentifierUpdateOneWithoutVerificationCodesInput
}

input VerificationCodeUpdateManyWithoutIdentifierInput {
  create: [VerificationCodeCreateWithoutIdentifierInput!]
  connect: [VerificationCodeWhereUniqueInput!]
  disconnect: [VerificationCodeWhereUniqueInput!]
  delete: [VerificationCodeWhereUniqueInput!]
  update: [VerificationCodeUpdateWithWhereUniqueWithoutIdentifierInput!]
  upsert: [VerificationCodeUpsertWithWhereUniqueWithoutIdentifierInput!]
}

input VerificationCodeUpdateWithoutIdentifierDataInput {
  code: String
  validUntil: DateTime
}

input VerificationCodeUpdateWithWhereUniqueWithoutIdentifierInput {
  where: VerificationCodeWhereUniqueInput!
  data: VerificationCodeUpdateWithoutIdentifierDataInput!
}

input VerificationCodeUpsertWithWhereUniqueWithoutIdentifierInput {
  where: VerificationCodeWhereUniqueInput!
  update: VerificationCodeUpdateWithoutIdentifierDataInput!
  create: VerificationCodeCreateWithoutIdentifierInput!
}

input VerificationCodeWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [VerificationCodeWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [VerificationCodeWhereInput!]
  code: String
  """
  All values that are not equal to given value.
  """
  code_not: String
  """
  All values that are contained in given list.
  """
  code_in: [String!]
  """
  All values that are not contained in given list.
  """
  code_not_in: [String!]
  """
  All values less than the given value.
  """
  code_lt: String
  """
  All values less than or equal the given value.
  """
  code_lte: String
  """
  All values greater than the given value.
  """
  code_gt: String
  """
  All values greater than or equal the given value.
  """
  code_gte: String
  """
  All values containing the given string.
  """
  code_contains: String
  """
  All values not containing the given string.
  """
  code_not_contains: String
  """
  All values starting with the given string.
  """
  code_starts_with: String
  """
  All values not starting with the given string.
  """
  code_not_starts_with: String
  """
  All values ending with the given string.
  """
  code_ends_with: String
  """
  All values not ending with the given string.
  """
  code_not_ends_with: String
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  validUntil: DateTime
  """
  All values that are not equal to given value.
  """
  validUntil_not: DateTime
  """
  All values that are contained in given list.
  """
  validUntil_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  validUntil_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  validUntil_lt: DateTime
  """
  All values less than or equal the given value.
  """
  validUntil_lte: DateTime
  """
  All values greater than the given value.
  """
  validUntil_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  validUntil_gte: DateTime
  identifier: IdentifierWhereInput
}

input VerificationCodeWhereUniqueInput {
  code: String
  id: ID
}

type Mutation {
  createCountryCode(data: CountryCodeCreateInput!): CountryCode!
  createIdentifier(data: IdentifierCreateInput!): Identifier!
  createPhoneNumber(data: PhoneNumberCreateInput!): PhoneNumber!
  createUser(data: UserCreateInput!): User!
  createVerificationCode(data: VerificationCodeCreateInput!): VerificationCode!
  updateCountryCode(data: CountryCodeUpdateInput!, where: CountryCodeWhereUniqueInput!): CountryCode
  updateIdentifier(data: IdentifierUpdateInput!, where: IdentifierWhereUniqueInput!): Identifier
  updatePhoneNumber(data: PhoneNumberUpdateInput!, where: PhoneNumberWhereUniqueInput!): PhoneNumber
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateVerificationCode(data: VerificationCodeUpdateInput!, where: VerificationCodeWhereUniqueInput!): VerificationCode
  deleteCountryCode(where: CountryCodeWhereUniqueInput!): CountryCode
  deleteIdentifier(where: IdentifierWhereUniqueInput!): Identifier
  deletePhoneNumber(where: PhoneNumberWhereUniqueInput!): PhoneNumber
  deleteUser(where: UserWhereUniqueInput!): User
  deleteVerificationCode(where: VerificationCodeWhereUniqueInput!): VerificationCode
  upsertCountryCode(where: CountryCodeWhereUniqueInput!, create: CountryCodeCreateInput!, update: CountryCodeUpdateInput!): CountryCode!
  upsertIdentifier(where: IdentifierWhereUniqueInput!, create: IdentifierCreateInput!, update: IdentifierUpdateInput!): Identifier!
  upsertPhoneNumber(where: PhoneNumberWhereUniqueInput!, create: PhoneNumberCreateInput!, update: PhoneNumberUpdateInput!): PhoneNumber!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertVerificationCode(where: VerificationCodeWhereUniqueInput!, create: VerificationCodeCreateInput!, update: VerificationCodeUpdateInput!): VerificationCode!
  updateManyCountryCodes(data: CountryCodeUpdateInput!, where: CountryCodeWhereInput!): BatchPayload!
  updateManyIdentifiers(data: IdentifierUpdateInput!, where: IdentifierWhereInput!): BatchPayload!
  updateManyPhoneNumbers(data: PhoneNumberUpdateInput!, where: PhoneNumberWhereInput!): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput!): BatchPayload!
  updateManyVerificationCodes(data: VerificationCodeUpdateInput!, where: VerificationCodeWhereInput!): BatchPayload!
  deleteManyCountryCodes(where: CountryCodeWhereInput!): BatchPayload!
  deleteManyIdentifiers(where: IdentifierWhereInput!): BatchPayload!
  deleteManyPhoneNumbers(where: PhoneNumberWhereInput!): BatchPayload!
  deleteManyUsers(where: UserWhereInput!): BatchPayload!
  deleteManyVerificationCodes(where: VerificationCodeWhereInput!): BatchPayload!
}

type Query {
  countryCodes(where: CountryCodeWhereInput, orderBy: CountryCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CountryCode]!
  identifiers(where: IdentifierWhereInput, orderBy: IdentifierOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Identifier]!
  phoneNumbers(where: PhoneNumberWhereInput, orderBy: PhoneNumberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PhoneNumber]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  verificationCodes(where: VerificationCodeWhereInput, orderBy: VerificationCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VerificationCode]!
  countryCode(where: CountryCodeWhereUniqueInput!): CountryCode
  identifier(where: IdentifierWhereUniqueInput!): Identifier
  phoneNumber(where: PhoneNumberWhereUniqueInput!): PhoneNumber
  user(where: UserWhereUniqueInput!): User
  verificationCode(where: VerificationCodeWhereUniqueInput!): VerificationCode
  countryCodesConnection(where: CountryCodeWhereInput, orderBy: CountryCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CountryCodeConnection!
  identifiersConnection(where: IdentifierWhereInput, orderBy: IdentifierOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): IdentifierConnection!
  phoneNumbersConnection(where: PhoneNumberWhereInput, orderBy: PhoneNumberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PhoneNumberConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  verificationCodesConnection(where: VerificationCodeWhereInput, orderBy: VerificationCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VerificationCodeConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  countryCode(where: CountryCodeSubscriptionWhereInput): CountryCodeSubscriptionPayload
  identifier(where: IdentifierSubscriptionWhereInput): IdentifierSubscriptionPayload
  phoneNumber(where: PhoneNumberSubscriptionWhereInput): PhoneNumberSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  verificationCode(where: VerificationCodeSubscriptionWhereInput): VerificationCodeSubscriptionPayload
}
`

export type CountryCodeOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'countryCode_ASC' |
  'countryCode_DESC' |
  'dialingCode_ASC' |
  'dialingCode_DESC' |
  'active_ASC' |
  'active_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type PhoneNumberOrderByInput = 
  'createdAt_ASC' |
  'createdAt_DESC' |
  'id_ASC' |
  'id_DESC' |
  'phoneNumber_ASC' |
  'phoneNumber_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type VerificationCodeOrderByInput = 
  'code_ASC' |
  'code_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'validUntil_ASC' |
  'validUntil_DESC'

export type IdentifierOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'hash_ASC' |
  'hash_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type UserOrderByInput = 
  'createdAt_ASC' |
  'createdAt_DESC' |
  'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'uuid_ASC' |
  'uuid_DESC' |
  'isVerified_ASC' |
  'isVerified_DESC'

export type MutationType = 
  'CREATED' |
  'UPDATED' |
  'DELETED'

export interface PhoneNumberCreateInput {
  phoneNumber: String
  countryCode: CountryCodeCreateOneWithoutPhoneNumbersInput
  identifier?: IdentifierCreateOneWithoutPhoneNumberInput
}

export interface CountryCodeWhereInput {
  AND?: CountryCodeWhereInput[] | CountryCodeWhereInput
  OR?: CountryCodeWhereInput[] | CountryCodeWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  countryCode?: String
  countryCode_not?: String
  countryCode_in?: String[] | String
  countryCode_not_in?: String[] | String
  countryCode_lt?: String
  countryCode_lte?: String
  countryCode_gt?: String
  countryCode_gte?: String
  countryCode_contains?: String
  countryCode_not_contains?: String
  countryCode_starts_with?: String
  countryCode_not_starts_with?: String
  countryCode_ends_with?: String
  countryCode_not_ends_with?: String
  dialingCode?: String
  dialingCode_not?: String
  dialingCode_in?: String[] | String
  dialingCode_not_in?: String[] | String
  dialingCode_lt?: String
  dialingCode_lte?: String
  dialingCode_gt?: String
  dialingCode_gte?: String
  dialingCode_contains?: String
  dialingCode_not_contains?: String
  dialingCode_starts_with?: String
  dialingCode_not_starts_with?: String
  dialingCode_ends_with?: String
  dialingCode_not_ends_with?: String
  active?: Boolean
  active_not?: Boolean
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  phoneNumbers_every?: PhoneNumberWhereInput
  phoneNumbers_some?: PhoneNumberWhereInput
  phoneNumbers_none?: PhoneNumberWhereInput
}

export interface VerificationCodeCreateInput {
  code: String
  validUntil: DateTime
  identifier?: IdentifierCreateOneWithoutVerificationCodesInput
}

export interface VerificationCodeWhereInput {
  AND?: VerificationCodeWhereInput[] | VerificationCodeWhereInput
  OR?: VerificationCodeWhereInput[] | VerificationCodeWhereInput
  code?: String
  code_not?: String
  code_in?: String[] | String
  code_not_in?: String[] | String
  code_lt?: String
  code_lte?: String
  code_gt?: String
  code_gte?: String
  code_contains?: String
  code_not_contains?: String
  code_starts_with?: String
  code_not_starts_with?: String
  code_ends_with?: String
  code_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  validUntil?: DateTime
  validUntil_not?: DateTime
  validUntil_in?: DateTime[] | DateTime
  validUntil_not_in?: DateTime[] | DateTime
  validUntil_lt?: DateTime
  validUntil_lte?: DateTime
  validUntil_gt?: DateTime
  validUntil_gte?: DateTime
  identifier?: IdentifierWhereInput
}

export interface PhoneNumberCreateManyWithoutCountryCodeInput {
  create?: PhoneNumberCreateWithoutCountryCodeInput[] | PhoneNumberCreateWithoutCountryCodeInput
  connect?: PhoneNumberWhereUniqueInput[] | PhoneNumberWhereUniqueInput
}

export interface VerificationCodeUpdateWithoutIdentifierDataInput {
  code?: String
  validUntil?: DateTime
}

export interface PhoneNumberCreateWithoutCountryCodeInput {
  phoneNumber: String
  identifier?: IdentifierCreateOneWithoutPhoneNumberInput
}

export interface IdentifierCreateOneWithoutVerificationCodesInput {
  create?: IdentifierCreateWithoutVerificationCodesInput
  connect?: IdentifierWhereUniqueInput
}

export interface IdentifierCreateOneWithoutPhoneNumberInput {
  create?: IdentifierCreateWithoutPhoneNumberInput
  connect?: IdentifierWhereUniqueInput
}

export interface IdentifierWhereInput {
  AND?: IdentifierWhereInput[] | IdentifierWhereInput
  OR?: IdentifierWhereInput[] | IdentifierWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  hash?: String
  hash_not?: String
  hash_in?: String[] | String
  hash_not_in?: String[] | String
  hash_lt?: String
  hash_lte?: String
  hash_gt?: String
  hash_gte?: String
  hash_contains?: String
  hash_not_contains?: String
  hash_starts_with?: String
  hash_not_starts_with?: String
  hash_ends_with?: String
  hash_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  phoneNumber?: PhoneNumberWhereInput
  user?: UserWhereInput
  verificationCodes_every?: VerificationCodeWhereInput
  verificationCodes_some?: VerificationCodeWhereInput
  verificationCodes_none?: VerificationCodeWhereInput
}

export interface IdentifierCreateWithoutPhoneNumberInput {
  hash: String
  user?: UserCreateOneWithoutIdentifierInput
  verificationCodes?: VerificationCodeCreateManyWithoutIdentifierInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface UserCreateOneWithoutIdentifierInput {
  create?: UserCreateWithoutIdentifierInput
  connect?: UserWhereUniqueInput
}

export interface PhoneNumberWhereInput {
  AND?: PhoneNumberWhereInput[] | PhoneNumberWhereInput
  OR?: PhoneNumberWhereInput[] | PhoneNumberWhereInput
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  phoneNumber?: String
  phoneNumber_not?: String
  phoneNumber_in?: String[] | String
  phoneNumber_not_in?: String[] | String
  phoneNumber_lt?: String
  phoneNumber_lte?: String
  phoneNumber_gt?: String
  phoneNumber_gte?: String
  phoneNumber_contains?: String
  phoneNumber_not_contains?: String
  phoneNumber_starts_with?: String
  phoneNumber_not_starts_with?: String
  phoneNumber_ends_with?: String
  phoneNumber_not_ends_with?: String
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  countryCode?: CountryCodeWhereInput
  identifier?: IdentifierWhereInput
}

export interface UserCreateWithoutIdentifierInput {
  uuid?: String
  isVerified?: Boolean
}

export interface CountryCodeSubscriptionWhereInput {
  AND?: CountryCodeSubscriptionWhereInput[] | CountryCodeSubscriptionWhereInput
  OR?: CountryCodeSubscriptionWhereInput[] | CountryCodeSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: CountryCodeWhereInput
}

export interface VerificationCodeCreateManyWithoutIdentifierInput {
  create?: VerificationCodeCreateWithoutIdentifierInput[] | VerificationCodeCreateWithoutIdentifierInput
  connect?: VerificationCodeWhereUniqueInput[] | VerificationCodeWhereUniqueInput
}

export interface CountryCodeWhereUniqueInput {
  id?: ID_Input
  dialingCode?: String
}

export interface VerificationCodeCreateWithoutIdentifierInput {
  code: String
  validUntil: DateTime
}

export interface PhoneNumberWhereUniqueInput {
  id?: ID_Input
  phoneNumber?: String
}

export interface IdentifierCreateInput {
  hash: String
  phoneNumber?: PhoneNumberCreateOneWithoutIdentifierInput
  user?: UserCreateOneWithoutIdentifierInput
  verificationCodes?: VerificationCodeCreateManyWithoutIdentifierInput
}

export interface VerificationCodeWhereUniqueInput {
  code?: String
  id?: ID_Input
}

export interface PhoneNumberCreateOneWithoutIdentifierInput {
  create?: PhoneNumberCreateWithoutIdentifierInput
  connect?: PhoneNumberWhereUniqueInput
}

export interface IdentifierUpdateOneWithoutVerificationCodesInput {
  create?: IdentifierCreateWithoutVerificationCodesInput
  connect?: IdentifierWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: IdentifierUpdateWithoutVerificationCodesDataInput
  upsert?: IdentifierUpsertWithoutVerificationCodesInput
}

export interface PhoneNumberCreateWithoutIdentifierInput {
  phoneNumber: String
  countryCode: CountryCodeCreateOneWithoutPhoneNumbersInput
}

export interface IdentifierUpsertWithoutUserInput {
  update: IdentifierUpdateWithoutUserDataInput
  create: IdentifierCreateWithoutUserInput
}

export interface CountryCodeCreateOneWithoutPhoneNumbersInput {
  create?: CountryCodeCreateWithoutPhoneNumbersInput
  connect?: CountryCodeWhereUniqueInput
}

export interface IdentifierUpdateOneWithoutUserInput {
  create?: IdentifierCreateWithoutUserInput
  connect?: IdentifierWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: IdentifierUpdateWithoutUserDataInput
  upsert?: IdentifierUpsertWithoutUserInput
}

export interface CountryCodeCreateWithoutPhoneNumbersInput {
  name?: String
  countryCode: String
  dialingCode: String
  active?: Boolean
}

export interface PhoneNumberUpdateInput {
  phoneNumber?: String
  countryCode?: CountryCodeUpdateOneWithoutPhoneNumbersInput
  identifier?: IdentifierUpdateOneWithoutPhoneNumberInput
}

export interface IdentifierUpsertWithoutPhoneNumberInput {
  update: IdentifierUpdateWithoutPhoneNumberDataInput
  create: IdentifierCreateWithoutPhoneNumberInput
}

export interface CountryCodeUpsertWithoutPhoneNumbersInput {
  update: CountryCodeUpdateWithoutPhoneNumbersDataInput
  create: CountryCodeCreateWithoutPhoneNumbersInput
}

export interface UserCreateInput {
  uuid?: String
  isVerified?: Boolean
  identifier?: IdentifierCreateOneWithoutUserInput
}

export interface CountryCodeUpdateOneWithoutPhoneNumbersInput {
  create?: CountryCodeCreateWithoutPhoneNumbersInput
  connect?: CountryCodeWhereUniqueInput
  delete?: Boolean
  update?: CountryCodeUpdateWithoutPhoneNumbersDataInput
  upsert?: CountryCodeUpsertWithoutPhoneNumbersInput
}

export interface IdentifierCreateOneWithoutUserInput {
  create?: IdentifierCreateWithoutUserInput
  connect?: IdentifierWhereUniqueInput
}

export interface PhoneNumberUpdateOneWithoutIdentifierInput {
  create?: PhoneNumberCreateWithoutIdentifierInput
  connect?: PhoneNumberWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: PhoneNumberUpdateWithoutIdentifierDataInput
  upsert?: PhoneNumberUpsertWithoutIdentifierInput
}

export interface IdentifierCreateWithoutUserInput {
  hash: String
  phoneNumber?: PhoneNumberCreateOneWithoutIdentifierInput
  verificationCodes?: VerificationCodeCreateManyWithoutIdentifierInput
}

export interface PhoneNumberUpsertWithWhereUniqueWithoutCountryCodeInput {
  where: PhoneNumberWhereUniqueInput
  update: PhoneNumberUpdateWithoutCountryCodeDataInput
  create: PhoneNumberCreateWithoutCountryCodeInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  uuid?: String
  uuid_not?: String
  uuid_in?: String[] | String
  uuid_not_in?: String[] | String
  uuid_lt?: String
  uuid_lte?: String
  uuid_gt?: String
  uuid_gte?: String
  uuid_contains?: String
  uuid_not_contains?: String
  uuid_starts_with?: String
  uuid_not_starts_with?: String
  uuid_ends_with?: String
  uuid_not_ends_with?: String
  isVerified?: Boolean
  isVerified_not?: Boolean
  identifier?: IdentifierWhereInput
}

export interface PhoneNumberSubscriptionWhereInput {
  AND?: PhoneNumberSubscriptionWhereInput[] | PhoneNumberSubscriptionWhereInput
  OR?: PhoneNumberSubscriptionWhereInput[] | PhoneNumberSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: PhoneNumberWhereInput
}

export interface VerificationCodeUpsertWithWhereUniqueWithoutIdentifierInput {
  where: VerificationCodeWhereUniqueInput
  update: VerificationCodeUpdateWithoutIdentifierDataInput
  create: VerificationCodeCreateWithoutIdentifierInput
}

export interface IdentifierUpsertWithoutVerificationCodesInput {
  update: IdentifierUpdateWithoutVerificationCodesDataInput
  create: IdentifierCreateWithoutVerificationCodesInput
}

export interface IdentifierCreateWithoutVerificationCodesInput {
  hash: String
  phoneNumber?: PhoneNumberCreateOneWithoutIdentifierInput
  user?: UserCreateOneWithoutIdentifierInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  uuid?: String
}

export interface CountryCodeUpdateInput {
  name?: String
  countryCode?: String
  dialingCode?: String
  active?: Boolean
  phoneNumbers?: PhoneNumberUpdateManyWithoutCountryCodeInput
}

export interface VerificationCodeUpdateInput {
  code?: String
  validUntil?: DateTime
  identifier?: IdentifierUpdateOneWithoutVerificationCodesInput
}

export interface PhoneNumberUpdateManyWithoutCountryCodeInput {
  create?: PhoneNumberCreateWithoutCountryCodeInput[] | PhoneNumberCreateWithoutCountryCodeInput
  connect?: PhoneNumberWhereUniqueInput[] | PhoneNumberWhereUniqueInput
  disconnect?: PhoneNumberWhereUniqueInput[] | PhoneNumberWhereUniqueInput
  delete?: PhoneNumberWhereUniqueInput[] | PhoneNumberWhereUniqueInput
  update?: PhoneNumberUpdateWithWhereUniqueWithoutCountryCodeInput[] | PhoneNumberUpdateWithWhereUniqueWithoutCountryCodeInput
  upsert?: PhoneNumberUpsertWithWhereUniqueWithoutCountryCodeInput[] | PhoneNumberUpsertWithWhereUniqueWithoutCountryCodeInput
}

export interface UserUpdateInput {
  uuid?: String
  isVerified?: Boolean
  identifier?: IdentifierUpdateOneWithoutUserInput
}

export interface PhoneNumberUpdateWithWhereUniqueWithoutCountryCodeInput {
  where: PhoneNumberWhereUniqueInput
  data: PhoneNumberUpdateWithoutCountryCodeDataInput
}

export interface CountryCodeUpdateWithoutPhoneNumbersDataInput {
  name?: String
  countryCode?: String
  dialingCode?: String
  active?: Boolean
}

export interface PhoneNumberUpdateWithoutCountryCodeDataInput {
  phoneNumber?: String
  identifier?: IdentifierUpdateOneWithoutPhoneNumberInput
}

export interface IdentifierUpdateInput {
  hash?: String
  phoneNumber?: PhoneNumberUpdateOneWithoutIdentifierInput
  user?: UserUpdateOneWithoutIdentifierInput
  verificationCodes?: VerificationCodeUpdateManyWithoutIdentifierInput
}

export interface IdentifierUpdateOneWithoutPhoneNumberInput {
  create?: IdentifierCreateWithoutPhoneNumberInput
  connect?: IdentifierWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: IdentifierUpdateWithoutPhoneNumberDataInput
  upsert?: IdentifierUpsertWithoutPhoneNumberInput
}

export interface VerificationCodeSubscriptionWhereInput {
  AND?: VerificationCodeSubscriptionWhereInput[] | VerificationCodeSubscriptionWhereInput
  OR?: VerificationCodeSubscriptionWhereInput[] | VerificationCodeSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: VerificationCodeWhereInput
}

export interface IdentifierUpdateWithoutPhoneNumberDataInput {
  hash?: String
  user?: UserUpdateOneWithoutIdentifierInput
  verificationCodes?: VerificationCodeUpdateManyWithoutIdentifierInput
}

export interface IdentifierWhereUniqueInput {
  id?: ID_Input
  hash?: String
}

export interface UserUpdateOneWithoutIdentifierInput {
  create?: UserCreateWithoutIdentifierInput
  connect?: UserWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: UserUpdateWithoutIdentifierDataInput
  upsert?: UserUpsertWithoutIdentifierInput
}

export interface IdentifierUpdateWithoutUserDataInput {
  hash?: String
  phoneNumber?: PhoneNumberUpdateOneWithoutIdentifierInput
  verificationCodes?: VerificationCodeUpdateManyWithoutIdentifierInput
}

export interface VerificationCodeUpdateWithWhereUniqueWithoutIdentifierInput {
  where: VerificationCodeWhereUniqueInput
  data: VerificationCodeUpdateWithoutIdentifierDataInput
}

export interface VerificationCodeUpdateManyWithoutIdentifierInput {
  create?: VerificationCodeCreateWithoutIdentifierInput[] | VerificationCodeCreateWithoutIdentifierInput
  connect?: VerificationCodeWhereUniqueInput[] | VerificationCodeWhereUniqueInput
  disconnect?: VerificationCodeWhereUniqueInput[] | VerificationCodeWhereUniqueInput
  delete?: VerificationCodeWhereUniqueInput[] | VerificationCodeWhereUniqueInput
  update?: VerificationCodeUpdateWithWhereUniqueWithoutIdentifierInput[] | VerificationCodeUpdateWithWhereUniqueWithoutIdentifierInput
  upsert?: VerificationCodeUpsertWithWhereUniqueWithoutIdentifierInput[] | VerificationCodeUpsertWithWhereUniqueWithoutIdentifierInput
}

export interface UserUpsertWithoutIdentifierInput {
  update: UserUpdateWithoutIdentifierDataInput
  create: UserCreateWithoutIdentifierInput
}

export interface UserUpdateWithoutIdentifierDataInput {
  uuid?: String
  isVerified?: Boolean
}

export interface PhoneNumberUpsertWithoutIdentifierInput {
  update: PhoneNumberUpdateWithoutIdentifierDataInput
  create: PhoneNumberCreateWithoutIdentifierInput
}

export interface IdentifierUpdateWithoutVerificationCodesDataInput {
  hash?: String
  phoneNumber?: PhoneNumberUpdateOneWithoutIdentifierInput
  user?: UserUpdateOneWithoutIdentifierInput
}

export interface IdentifierSubscriptionWhereInput {
  AND?: IdentifierSubscriptionWhereInput[] | IdentifierSubscriptionWhereInput
  OR?: IdentifierSubscriptionWhereInput[] | IdentifierSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: IdentifierWhereInput
}

export interface CountryCodeCreateInput {
  name?: String
  countryCode: String
  dialingCode: String
  active?: Boolean
  phoneNumbers?: PhoneNumberCreateManyWithoutCountryCodeInput
}

export interface PhoneNumberUpdateWithoutIdentifierDataInput {
  phoneNumber?: String
  countryCode?: CountryCodeUpdateOneWithoutPhoneNumbersInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface VerificationCodePreviousValues {
  code: String
  createdAt: DateTime
  id: ID_Output
  updatedAt: DateTime
  validUntil: DateTime
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface Identifier extends Node {
  id: ID_Output
  hash: String
  phoneNumber?: PhoneNumber
  user?: User
  verificationCodes?: VerificationCode[]
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface CountryCodeConnection {
  pageInfo: PageInfo
  edges: CountryCodeEdge[]
  aggregate: AggregateCountryCode
}

export interface CountryCode extends Node {
  id: ID_Output
  name?: String
  countryCode: String
  dialingCode: String
  active?: Boolean
  phoneNumbers?: PhoneNumber[]
  createdAt: DateTime
  updatedAt: DateTime
}

export interface VerificationCodeSubscriptionPayload {
  mutation: MutationType
  node?: VerificationCode
  updatedFields?: String[]
  previousValues?: VerificationCodePreviousValues
}

/*
 * An edge in a connection.

 */
export interface VerificationCodeEdge {
  node: VerificationCode
  cursor: String
}

export interface BatchPayload {
  count: Long
}

export interface AggregateUser {
  count: Int
}

export interface PhoneNumber extends Node {
  countryCode: CountryCode
  createdAt: DateTime
  id: ID_Output
  identifier?: Identifier
  phoneNumber: String
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface UserPreviousValues {
  createdAt: DateTime
  id: ID_Output
  updatedAt: DateTime
  uuid?: String
  isVerified?: Boolean
}

/*
 * An edge in a connection.

 */
export interface PhoneNumberEdge {
  node: PhoneNumber
  cursor: String
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface AggregateIdentifier {
  count: Int
}

export interface CountryCodeSubscriptionPayload {
  mutation: MutationType
  node?: CountryCode
  updatedFields?: String[]
  previousValues?: CountryCodePreviousValues
}

/*
 * A connection to a list of items.

 */
export interface IdentifierConnection {
  pageInfo: PageInfo
  edges: IdentifierEdge[]
  aggregate: AggregateIdentifier
}

export interface CountryCodePreviousValues {
  id: ID_Output
  name?: String
  countryCode: String
  dialingCode: String
  active?: Boolean
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * An edge in a connection.

 */
export interface CountryCodeEdge {
  node: CountryCode
  cursor: String
}

export interface VerificationCode extends Node {
  code: String
  createdAt: DateTime
  id: ID_Output
  identifier?: Identifier
  updatedAt: DateTime
  validUntil: DateTime
}

/*
 * A connection to a list of items.

 */
export interface VerificationCodeConnection {
  pageInfo: PageInfo
  edges: VerificationCodeEdge[]
  aggregate: AggregateVerificationCode
}

export interface IdentifierSubscriptionPayload {
  mutation: MutationType
  node?: Identifier
  updatedFields?: String[]
  previousValues?: IdentifierPreviousValues
}

export interface AggregatePhoneNumber {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface IdentifierEdge {
  node: Identifier
  cursor: String
}

export interface PhoneNumberPreviousValues {
  createdAt: DateTime
  id: ID_Output
  phoneNumber: String
  updatedAt: DateTime
}

export interface PhoneNumberSubscriptionPayload {
  mutation: MutationType
  node?: PhoneNumber
  updatedFields?: String[]
  previousValues?: PhoneNumberPreviousValues
}

export interface User extends Node {
  createdAt: DateTime
  id: ID_Output
  identifier?: Identifier
  updatedAt: DateTime
  uuid?: String
  isVerified?: Boolean
}

export interface IdentifierPreviousValues {
  id: ID_Output
  hash: String
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateCountryCode {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface PhoneNumberConnection {
  pageInfo: PageInfo
  edges: PhoneNumberEdge[]
  aggregate: AggregatePhoneNumber
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface AggregateVerificationCode {
  count: Int
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

export type DateTime = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type Query = {
  countryCodes: (args: { where?: CountryCodeWhereInput, orderBy?: CountryCodeOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<CountryCode[]>
  identifiers: (args: { where?: IdentifierWhereInput, orderBy?: IdentifierOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Identifier[]>
  phoneNumbers: (args: { where?: PhoneNumberWhereInput, orderBy?: PhoneNumberOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<PhoneNumber[]>
  users: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<User[]>
  verificationCodes: (args: { where?: VerificationCodeWhereInput, orderBy?: VerificationCodeOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<VerificationCode[]>
  countryCode: (args: { where: CountryCodeWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<CountryCode | null>
  identifier: (args: { where: IdentifierWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Identifier | null>
  phoneNumber: (args: { where: PhoneNumberWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<PhoneNumber | null>
  user: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  verificationCode: (args: { where: VerificationCodeWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<VerificationCode | null>
  countryCodesConnection: (args: { where?: CountryCodeWhereInput, orderBy?: CountryCodeOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<CountryCodeConnection>
  identifiersConnection: (args: { where?: IdentifierWhereInput, orderBy?: IdentifierOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<IdentifierConnection>
  phoneNumbersConnection: (args: { where?: PhoneNumberWhereInput, orderBy?: PhoneNumberOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<PhoneNumberConnection>
  usersConnection: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<UserConnection>
  verificationCodesConnection: (args: { where?: VerificationCodeWhereInput, orderBy?: VerificationCodeOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<VerificationCodeConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createCountryCode: (args: { data: CountryCodeCreateInput }, info?: GraphQLResolveInfo | string) => Promise<CountryCode>
  createIdentifier: (args: { data: IdentifierCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Identifier>
  createPhoneNumber: (args: { data: PhoneNumberCreateInput }, info?: GraphQLResolveInfo | string) => Promise<PhoneNumber>
  createUser: (args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  createVerificationCode: (args: { data: VerificationCodeCreateInput }, info?: GraphQLResolveInfo | string) => Promise<VerificationCode>
  updateCountryCode: (args: { data: CountryCodeUpdateInput, where: CountryCodeWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<CountryCode | null>
  updateIdentifier: (args: { data: IdentifierUpdateInput, where: IdentifierWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Identifier | null>
  updatePhoneNumber: (args: { data: PhoneNumberUpdateInput, where: PhoneNumberWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<PhoneNumber | null>
  updateUser: (args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  updateVerificationCode: (args: { data: VerificationCodeUpdateInput, where: VerificationCodeWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<VerificationCode | null>
  deleteCountryCode: (args: { where: CountryCodeWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<CountryCode | null>
  deleteIdentifier: (args: { where: IdentifierWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Identifier | null>
  deletePhoneNumber: (args: { where: PhoneNumberWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<PhoneNumber | null>
  deleteUser: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  deleteVerificationCode: (args: { where: VerificationCodeWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<VerificationCode | null>
  upsertCountryCode: (args: { where: CountryCodeWhereUniqueInput, create: CountryCodeCreateInput, update: CountryCodeUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<CountryCode>
  upsertIdentifier: (args: { where: IdentifierWhereUniqueInput, create: IdentifierCreateInput, update: IdentifierUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Identifier>
  upsertPhoneNumber: (args: { where: PhoneNumberWhereUniqueInput, create: PhoneNumberCreateInput, update: PhoneNumberUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<PhoneNumber>
  upsertUser: (args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  upsertVerificationCode: (args: { where: VerificationCodeWhereUniqueInput, create: VerificationCodeCreateInput, update: VerificationCodeUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<VerificationCode>
  updateManyCountryCodes: (args: { data: CountryCodeUpdateInput, where: CountryCodeWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyIdentifiers: (args: { data: IdentifierUpdateInput, where: IdentifierWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyPhoneNumbers: (args: { data: PhoneNumberUpdateInput, where: PhoneNumberWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyUsers: (args: { data: UserUpdateInput, where: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyVerificationCodes: (args: { data: VerificationCodeUpdateInput, where: VerificationCodeWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyCountryCodes: (args: { where: CountryCodeWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyIdentifiers: (args: { where: IdentifierWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyPhoneNumbers: (args: { where: PhoneNumberWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyUsers: (args: { where: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyVerificationCodes: (args: { where: VerificationCodeWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  countryCode: (args: { where?: CountryCodeSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<CountryCodeSubscriptionPayload>>
  identifier: (args: { where?: IdentifierSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<IdentifierSubscriptionPayload>>
  phoneNumber: (args: { where?: PhoneNumberSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<PhoneNumberSubscriptionPayload>>
  user: (args: { where?: UserSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<UserSubscriptionPayload>>
  verificationCode: (args: { where?: VerificationCodeSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<VerificationCodeSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    CountryCode: (where: CountryCodeWhereInput): Promise<boolean> => super.existsDelegate('query', 'countryCodes', { where }, {}, '{ id }'),
    Identifier: (where: IdentifierWhereInput): Promise<boolean> => super.existsDelegate('query', 'identifiers', { where }, {}, '{ id }'),
    PhoneNumber: (where: PhoneNumberWhereInput): Promise<boolean> => super.existsDelegate('query', 'phoneNumbers', { where }, {}, '{ id }'),
    User: (where: UserWhereInput): Promise<boolean> => super.existsDelegate('query', 'users', { where }, {}, '{ id }'),
    VerificationCode: (where: VerificationCodeWhereInput): Promise<boolean> => super.existsDelegate('query', 'verificationCodes', { where }, {}, '{ id }')
  }

  query: Query = {
    countryCodes: (args, info): Promise<CountryCode[]> => super.delegate('query', 'countryCodes', args, {}, info),
    identifiers: (args, info): Promise<Identifier[]> => super.delegate('query', 'identifiers', args, {}, info),
    phoneNumbers: (args, info): Promise<PhoneNumber[]> => super.delegate('query', 'phoneNumbers', args, {}, info),
    users: (args, info): Promise<User[]> => super.delegate('query', 'users', args, {}, info),
    verificationCodes: (args, info): Promise<VerificationCode[]> => super.delegate('query', 'verificationCodes', args, {}, info),
    countryCode: (args, info): Promise<CountryCode | null> => super.delegate('query', 'countryCode', args, {}, info),
    identifier: (args, info): Promise<Identifier | null> => super.delegate('query', 'identifier', args, {}, info),
    phoneNumber: (args, info): Promise<PhoneNumber | null> => super.delegate('query', 'phoneNumber', args, {}, info),
    user: (args, info): Promise<User | null> => super.delegate('query', 'user', args, {}, info),
    verificationCode: (args, info): Promise<VerificationCode | null> => super.delegate('query', 'verificationCode', args, {}, info),
    countryCodesConnection: (args, info): Promise<CountryCodeConnection> => super.delegate('query', 'countryCodesConnection', args, {}, info),
    identifiersConnection: (args, info): Promise<IdentifierConnection> => super.delegate('query', 'identifiersConnection', args, {}, info),
    phoneNumbersConnection: (args, info): Promise<PhoneNumberConnection> => super.delegate('query', 'phoneNumbersConnection', args, {}, info),
    usersConnection: (args, info): Promise<UserConnection> => super.delegate('query', 'usersConnection', args, {}, info),
    verificationCodesConnection: (args, info): Promise<VerificationCodeConnection> => super.delegate('query', 'verificationCodesConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createCountryCode: (args, info): Promise<CountryCode> => super.delegate('mutation', 'createCountryCode', args, {}, info),
    createIdentifier: (args, info): Promise<Identifier> => super.delegate('mutation', 'createIdentifier', args, {}, info),
    createPhoneNumber: (args, info): Promise<PhoneNumber> => super.delegate('mutation', 'createPhoneNumber', args, {}, info),
    createUser: (args, info): Promise<User> => super.delegate('mutation', 'createUser', args, {}, info),
    createVerificationCode: (args, info): Promise<VerificationCode> => super.delegate('mutation', 'createVerificationCode', args, {}, info),
    updateCountryCode: (args, info): Promise<CountryCode | null> => super.delegate('mutation', 'updateCountryCode', args, {}, info),
    updateIdentifier: (args, info): Promise<Identifier | null> => super.delegate('mutation', 'updateIdentifier', args, {}, info),
    updatePhoneNumber: (args, info): Promise<PhoneNumber | null> => super.delegate('mutation', 'updatePhoneNumber', args, {}, info),
    updateUser: (args, info): Promise<User | null> => super.delegate('mutation', 'updateUser', args, {}, info),
    updateVerificationCode: (args, info): Promise<VerificationCode | null> => super.delegate('mutation', 'updateVerificationCode', args, {}, info),
    deleteCountryCode: (args, info): Promise<CountryCode | null> => super.delegate('mutation', 'deleteCountryCode', args, {}, info),
    deleteIdentifier: (args, info): Promise<Identifier | null> => super.delegate('mutation', 'deleteIdentifier', args, {}, info),
    deletePhoneNumber: (args, info): Promise<PhoneNumber | null> => super.delegate('mutation', 'deletePhoneNumber', args, {}, info),
    deleteUser: (args, info): Promise<User | null> => super.delegate('mutation', 'deleteUser', args, {}, info),
    deleteVerificationCode: (args, info): Promise<VerificationCode | null> => super.delegate('mutation', 'deleteVerificationCode', args, {}, info),
    upsertCountryCode: (args, info): Promise<CountryCode> => super.delegate('mutation', 'upsertCountryCode', args, {}, info),
    upsertIdentifier: (args, info): Promise<Identifier> => super.delegate('mutation', 'upsertIdentifier', args, {}, info),
    upsertPhoneNumber: (args, info): Promise<PhoneNumber> => super.delegate('mutation', 'upsertPhoneNumber', args, {}, info),
    upsertUser: (args, info): Promise<User> => super.delegate('mutation', 'upsertUser', args, {}, info),
    upsertVerificationCode: (args, info): Promise<VerificationCode> => super.delegate('mutation', 'upsertVerificationCode', args, {}, info),
    updateManyCountryCodes: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyCountryCodes', args, {}, info),
    updateManyIdentifiers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyIdentifiers', args, {}, info),
    updateManyPhoneNumbers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyPhoneNumbers', args, {}, info),
    updateManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyUsers', args, {}, info),
    updateManyVerificationCodes: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyVerificationCodes', args, {}, info),
    deleteManyCountryCodes: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyCountryCodes', args, {}, info),
    deleteManyIdentifiers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyIdentifiers', args, {}, info),
    deleteManyPhoneNumbers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyPhoneNumbers', args, {}, info),
    deleteManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyUsers', args, {}, info),
    deleteManyVerificationCodes: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyVerificationCodes', args, {}, info)
  }

  subscription: Subscription = {
    countryCode: (args, infoOrQuery): Promise<AsyncIterator<CountryCodeSubscriptionPayload>> => super.delegateSubscription('countryCode', args, {}, infoOrQuery),
    identifier: (args, infoOrQuery): Promise<AsyncIterator<IdentifierSubscriptionPayload>> => super.delegateSubscription('identifier', args, {}, infoOrQuery),
    phoneNumber: (args, infoOrQuery): Promise<AsyncIterator<PhoneNumberSubscriptionPayload>> => super.delegateSubscription('phoneNumber', args, {}, infoOrQuery),
    user: (args, infoOrQuery): Promise<AsyncIterator<UserSubscriptionPayload>> => super.delegateSubscription('user', args, {}, infoOrQuery),
    verificationCode: (args, infoOrQuery): Promise<AsyncIterator<VerificationCodeSubscriptionPayload>> => super.delegateSubscription('verificationCode', args, {}, infoOrQuery)
  }
}