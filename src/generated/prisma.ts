import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type Application implements Node {
  id: ID!
  appId: String!
  name: String!
  description: String
  owners(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  members(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  credentials(where: ApplicationCredentialsWhereInput): ApplicationCredentials!
  verificationCodes(where: VerificationCodeWhereInput, orderBy: VerificationCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VerificationCode!]
}

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
  ownedApplications(where: ApplicationWhereInput, orderBy: ApplicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Application!]
  memberOf(where: ApplicationWhereInput, orderBy: ApplicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Application!]
  userOf(where: ApplicationWhereInput, orderBy: ApplicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Application!]
}

type VerificationCode implements Node {
  id: ID!
  code: String!
  createdAt: DateTime!
  application(where: ApplicationWhereInput): Application!
  identifier(where: IdentifierWhereInput): Identifier
  updatedAt: DateTime!
  validUntil: DateTime!
}

type AggregateApplication {
  count: Int!
}

type AggregateApplicationCredentials {
  count: Int!
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

type ApplicationConnection {
  pageInfo: PageInfo!
  edges: [ApplicationEdge]!
  aggregate: AggregateApplication!
}

input ApplicationCreateInput {
  appId: String!
  name: String!
  description: String
  owners: UserCreateManyWithoutOwnedApplicationsInput
  members: UserCreateManyWithoutMemberOfInput
  users: UserCreateManyWithoutUserOfInput
  credentials: ApplicationCredentialsCreateOneInput!
  verificationCodes: VerificationCodeCreateManyWithoutApplicationInput
}

input ApplicationCreateManyWithoutMembersInput {
  create: [ApplicationCreateWithoutMembersInput!]
  connect: [ApplicationWhereUniqueInput!]
}

input ApplicationCreateManyWithoutOwnersInput {
  create: [ApplicationCreateWithoutOwnersInput!]
  connect: [ApplicationWhereUniqueInput!]
}

input ApplicationCreateManyWithoutUsersInput {
  create: [ApplicationCreateWithoutUsersInput!]
  connect: [ApplicationWhereUniqueInput!]
}

input ApplicationCreateOneWithoutVerificationCodesInput {
  create: ApplicationCreateWithoutVerificationCodesInput
  connect: ApplicationWhereUniqueInput
}

input ApplicationCreateWithoutMembersInput {
  appId: String!
  name: String!
  description: String
  owners: UserCreateManyWithoutOwnedApplicationsInput
  users: UserCreateManyWithoutUserOfInput
  credentials: ApplicationCredentialsCreateOneInput!
  verificationCodes: VerificationCodeCreateManyWithoutApplicationInput
}

input ApplicationCreateWithoutOwnersInput {
  appId: String!
  name: String!
  description: String
  members: UserCreateManyWithoutMemberOfInput
  users: UserCreateManyWithoutUserOfInput
  credentials: ApplicationCredentialsCreateOneInput!
  verificationCodes: VerificationCodeCreateManyWithoutApplicationInput
}

input ApplicationCreateWithoutUsersInput {
  appId: String!
  name: String!
  description: String
  owners: UserCreateManyWithoutOwnedApplicationsInput
  members: UserCreateManyWithoutMemberOfInput
  credentials: ApplicationCredentialsCreateOneInput!
  verificationCodes: VerificationCodeCreateManyWithoutApplicationInput
}

input ApplicationCreateWithoutVerificationCodesInput {
  appId: String!
  name: String!
  description: String
  owners: UserCreateManyWithoutOwnedApplicationsInput
  members: UserCreateManyWithoutMemberOfInput
  users: UserCreateManyWithoutUserOfInput
  credentials: ApplicationCredentialsCreateOneInput!
}

type ApplicationCredentials {
  secret: String!
  active: Boolean
}

type ApplicationCredentialsConnection {
  pageInfo: PageInfo!
  edges: [ApplicationCredentialsEdge]!
  aggregate: AggregateApplicationCredentials!
}

input ApplicationCredentialsCreateInput {
  secret: String!
  active: Boolean
}

input ApplicationCredentialsCreateOneInput {
  create: ApplicationCredentialsCreateInput
}

type ApplicationCredentialsEdge {
  node: ApplicationCredentials!
  cursor: String!
}

enum ApplicationCredentialsOrderByInput {
  secret_ASC
  secret_DESC
  active_ASC
  active_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ApplicationCredentialsPreviousValues {
  secret: String!
  active: Boolean
}

type ApplicationCredentialsSubscriptionPayload {
  mutation: MutationType!
  node: ApplicationCredentials
  updatedFields: [String!]
  previousValues: ApplicationCredentialsPreviousValues
}

input ApplicationCredentialsSubscriptionWhereInput {
  AND: [ApplicationCredentialsSubscriptionWhereInput!]
  OR: [ApplicationCredentialsSubscriptionWhereInput!]
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ApplicationCredentialsWhereInput
}

input ApplicationCredentialsUpdateDataInput {
  secret: String
  active: Boolean
}

input ApplicationCredentialsUpdateInput {
  secret: String
  active: Boolean
}

input ApplicationCredentialsUpdateOneInput {
  create: ApplicationCredentialsCreateInput
  delete: Boolean
  update: ApplicationCredentialsUpdateDataInput
  upsert: ApplicationCredentialsUpsertNestedInput
}

input ApplicationCredentialsUpsertNestedInput {
  update: ApplicationCredentialsUpdateDataInput!
  create: ApplicationCredentialsCreateInput!
}

input ApplicationCredentialsWhereInput {
  AND: [ApplicationCredentialsWhereInput!]
  OR: [ApplicationCredentialsWhereInput!]
  secret: String
  secret_not: String
  secret_in: [String!]
  secret_not_in: [String!]
  secret_lt: String
  secret_lte: String
  secret_gt: String
  secret_gte: String
  secret_contains: String
  secret_not_contains: String
  secret_starts_with: String
  secret_not_starts_with: String
  secret_ends_with: String
  secret_not_ends_with: String
  active: Boolean
  active_not: Boolean
}

type ApplicationEdge {
  node: Application!
  cursor: String!
}

enum ApplicationOrderByInput {
  id_ASC
  id_DESC
  appId_ASC
  appId_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ApplicationPreviousValues {
  id: ID!
  appId: String!
  name: String!
  description: String
}

type ApplicationSubscriptionPayload {
  mutation: MutationType!
  node: Application
  updatedFields: [String!]
  previousValues: ApplicationPreviousValues
}

input ApplicationSubscriptionWhereInput {
  AND: [ApplicationSubscriptionWhereInput!]
  OR: [ApplicationSubscriptionWhereInput!]
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ApplicationWhereInput
}

input ApplicationUpdateInput {
  appId: String
  name: String
  description: String
  owners: UserUpdateManyWithoutOwnedApplicationsInput
  members: UserUpdateManyWithoutMemberOfInput
  users: UserUpdateManyWithoutUserOfInput
  credentials: ApplicationCredentialsUpdateOneInput
  verificationCodes: VerificationCodeUpdateManyWithoutApplicationInput
}

input ApplicationUpdateManyWithoutMembersInput {
  create: [ApplicationCreateWithoutMembersInput!]
  connect: [ApplicationWhereUniqueInput!]
  disconnect: [ApplicationWhereUniqueInput!]
  delete: [ApplicationWhereUniqueInput!]
  update: [ApplicationUpdateWithWhereUniqueWithoutMembersInput!]
  upsert: [ApplicationUpsertWithWhereUniqueWithoutMembersInput!]
}

input ApplicationUpdateManyWithoutOwnersInput {
  create: [ApplicationCreateWithoutOwnersInput!]
  connect: [ApplicationWhereUniqueInput!]
  disconnect: [ApplicationWhereUniqueInput!]
  delete: [ApplicationWhereUniqueInput!]
  update: [ApplicationUpdateWithWhereUniqueWithoutOwnersInput!]
  upsert: [ApplicationUpsertWithWhereUniqueWithoutOwnersInput!]
}

input ApplicationUpdateManyWithoutUsersInput {
  create: [ApplicationCreateWithoutUsersInput!]
  connect: [ApplicationWhereUniqueInput!]
  disconnect: [ApplicationWhereUniqueInput!]
  delete: [ApplicationWhereUniqueInput!]
  update: [ApplicationUpdateWithWhereUniqueWithoutUsersInput!]
  upsert: [ApplicationUpsertWithWhereUniqueWithoutUsersInput!]
}

input ApplicationUpdateOneWithoutVerificationCodesInput {
  create: ApplicationCreateWithoutVerificationCodesInput
  connect: ApplicationWhereUniqueInput
  delete: Boolean
  update: ApplicationUpdateWithoutVerificationCodesDataInput
  upsert: ApplicationUpsertWithoutVerificationCodesInput
}

input ApplicationUpdateWithoutMembersDataInput {
  appId: String
  name: String
  description: String
  owners: UserUpdateManyWithoutOwnedApplicationsInput
  users: UserUpdateManyWithoutUserOfInput
  credentials: ApplicationCredentialsUpdateOneInput
  verificationCodes: VerificationCodeUpdateManyWithoutApplicationInput
}

input ApplicationUpdateWithoutOwnersDataInput {
  appId: String
  name: String
  description: String
  members: UserUpdateManyWithoutMemberOfInput
  users: UserUpdateManyWithoutUserOfInput
  credentials: ApplicationCredentialsUpdateOneInput
  verificationCodes: VerificationCodeUpdateManyWithoutApplicationInput
}

input ApplicationUpdateWithoutUsersDataInput {
  appId: String
  name: String
  description: String
  owners: UserUpdateManyWithoutOwnedApplicationsInput
  members: UserUpdateManyWithoutMemberOfInput
  credentials: ApplicationCredentialsUpdateOneInput
  verificationCodes: VerificationCodeUpdateManyWithoutApplicationInput
}

input ApplicationUpdateWithoutVerificationCodesDataInput {
  appId: String
  name: String
  description: String
  owners: UserUpdateManyWithoutOwnedApplicationsInput
  members: UserUpdateManyWithoutMemberOfInput
  users: UserUpdateManyWithoutUserOfInput
  credentials: ApplicationCredentialsUpdateOneInput
}

input ApplicationUpdateWithWhereUniqueWithoutMembersInput {
  where: ApplicationWhereUniqueInput!
  data: ApplicationUpdateWithoutMembersDataInput!
}

input ApplicationUpdateWithWhereUniqueWithoutOwnersInput {
  where: ApplicationWhereUniqueInput!
  data: ApplicationUpdateWithoutOwnersDataInput!
}

input ApplicationUpdateWithWhereUniqueWithoutUsersInput {
  where: ApplicationWhereUniqueInput!
  data: ApplicationUpdateWithoutUsersDataInput!
}

input ApplicationUpsertWithoutVerificationCodesInput {
  update: ApplicationUpdateWithoutVerificationCodesDataInput!
  create: ApplicationCreateWithoutVerificationCodesInput!
}

input ApplicationUpsertWithWhereUniqueWithoutMembersInput {
  where: ApplicationWhereUniqueInput!
  update: ApplicationUpdateWithoutMembersDataInput!
  create: ApplicationCreateWithoutMembersInput!
}

input ApplicationUpsertWithWhereUniqueWithoutOwnersInput {
  where: ApplicationWhereUniqueInput!
  update: ApplicationUpdateWithoutOwnersDataInput!
  create: ApplicationCreateWithoutOwnersInput!
}

input ApplicationUpsertWithWhereUniqueWithoutUsersInput {
  where: ApplicationWhereUniqueInput!
  update: ApplicationUpdateWithoutUsersDataInput!
  create: ApplicationCreateWithoutUsersInput!
}

input ApplicationWhereInput {
  AND: [ApplicationWhereInput!]
  OR: [ApplicationWhereInput!]
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  appId: String
  appId_not: String
  appId_in: [String!]
  appId_not_in: [String!]
  appId_lt: String
  appId_lte: String
  appId_gt: String
  appId_gte: String
  appId_contains: String
  appId_not_contains: String
  appId_starts_with: String
  appId_not_starts_with: String
  appId_ends_with: String
  appId_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  owners_every: UserWhereInput
  owners_some: UserWhereInput
  owners_none: UserWhereInput
  members_every: UserWhereInput
  members_some: UserWhereInput
  members_none: UserWhereInput
  users_every: UserWhereInput
  users_some: UserWhereInput
  users_none: UserWhereInput
  credentials: ApplicationCredentialsWhereInput
  verificationCodes_every: VerificationCodeWhereInput
  verificationCodes_some: VerificationCodeWhereInput
  verificationCodes_none: VerificationCodeWhereInput
}

input ApplicationWhereUniqueInput {
  id: ID
  name: String
}

type BatchPayload {
  count: Long!
}

type CountryCodeConnection {
  pageInfo: PageInfo!
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

type CountryCodeEdge {
  node: CountryCode!
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
  AND: [CountryCodeSubscriptionWhereInput!]
  OR: [CountryCodeSubscriptionWhereInput!]
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
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
  AND: [CountryCodeWhereInput!]
  OR: [CountryCodeWhereInput!]
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  countryCode: String
  countryCode_not: String
  countryCode_in: [String!]
  countryCode_not_in: [String!]
  countryCode_lt: String
  countryCode_lte: String
  countryCode_gt: String
  countryCode_gte: String
  countryCode_contains: String
  countryCode_not_contains: String
  countryCode_starts_with: String
  countryCode_not_starts_with: String
  countryCode_ends_with: String
  countryCode_not_ends_with: String
  dialingCode: String
  dialingCode_not: String
  dialingCode_in: [String!]
  dialingCode_not_in: [String!]
  dialingCode_lt: String
  dialingCode_lte: String
  dialingCode_gt: String
  dialingCode_gte: String
  dialingCode_contains: String
  dialingCode_not_contains: String
  dialingCode_starts_with: String
  dialingCode_not_starts_with: String
  dialingCode_ends_with: String
  dialingCode_not_ends_with: String
  active: Boolean
  active_not: Boolean
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
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

type IdentifierConnection {
  pageInfo: PageInfo!
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

type IdentifierEdge {
  node: Identifier!
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
  AND: [IdentifierSubscriptionWhereInput!]
  OR: [IdentifierSubscriptionWhereInput!]
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
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
  AND: [IdentifierWhereInput!]
  OR: [IdentifierWhereInput!]
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  hash: String
  hash_not: String
  hash_in: [String!]
  hash_not_in: [String!]
  hash_lt: String
  hash_lte: String
  hash_gt: String
  hash_gte: String
  hash_contains: String
  hash_not_contains: String
  hash_starts_with: String
  hash_not_starts_with: String
  hash_ends_with: String
  hash_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
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

scalar Long

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type PhoneNumberConnection {
  pageInfo: PageInfo!
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

type PhoneNumberEdge {
  node: PhoneNumber!
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
  AND: [PhoneNumberSubscriptionWhereInput!]
  OR: [PhoneNumberSubscriptionWhereInput!]
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
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
  AND: [PhoneNumberWhereInput!]
  OR: [PhoneNumberWhereInput!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  phoneNumber: String
  phoneNumber_not: String
  phoneNumber_in: [String!]
  phoneNumber_not_in: [String!]
  phoneNumber_lt: String
  phoneNumber_lte: String
  phoneNumber_gt: String
  phoneNumber_gte: String
  phoneNumber_contains: String
  phoneNumber_not_contains: String
  phoneNumber_starts_with: String
  phoneNumber_not_starts_with: String
  phoneNumber_ends_with: String
  phoneNumber_not_ends_with: String
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  countryCode: CountryCodeWhereInput
  identifier: IdentifierWhereInput
}

input PhoneNumberWhereUniqueInput {
  id: ID
  phoneNumber: String
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  uuid: String
  isVerified: Boolean
  identifier: IdentifierCreateOneWithoutUserInput
  ownedApplications: ApplicationCreateManyWithoutOwnersInput
  memberOf: ApplicationCreateManyWithoutMembersInput
  userOf: ApplicationCreateManyWithoutUsersInput
}

input UserCreateManyWithoutMemberOfInput {
  create: [UserCreateWithoutMemberOfInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateManyWithoutOwnedApplicationsInput {
  create: [UserCreateWithoutOwnedApplicationsInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateManyWithoutUserOfInput {
  create: [UserCreateWithoutUserOfInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneWithoutIdentifierInput {
  create: UserCreateWithoutIdentifierInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutIdentifierInput {
  uuid: String
  isVerified: Boolean
  ownedApplications: ApplicationCreateManyWithoutOwnersInput
  memberOf: ApplicationCreateManyWithoutMembersInput
  userOf: ApplicationCreateManyWithoutUsersInput
}

input UserCreateWithoutMemberOfInput {
  uuid: String
  isVerified: Boolean
  identifier: IdentifierCreateOneWithoutUserInput
  ownedApplications: ApplicationCreateManyWithoutOwnersInput
  userOf: ApplicationCreateManyWithoutUsersInput
}

input UserCreateWithoutOwnedApplicationsInput {
  uuid: String
  isVerified: Boolean
  identifier: IdentifierCreateOneWithoutUserInput
  memberOf: ApplicationCreateManyWithoutMembersInput
  userOf: ApplicationCreateManyWithoutUsersInput
}

input UserCreateWithoutUserOfInput {
  uuid: String
  isVerified: Boolean
  identifier: IdentifierCreateOneWithoutUserInput
  ownedApplications: ApplicationCreateManyWithoutOwnersInput
  memberOf: ApplicationCreateManyWithoutMembersInput
}

type UserEdge {
  node: User!
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
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  uuid: String
  isVerified: Boolean
  identifier: IdentifierUpdateOneWithoutUserInput
  ownedApplications: ApplicationUpdateManyWithoutOwnersInput
  memberOf: ApplicationUpdateManyWithoutMembersInput
  userOf: ApplicationUpdateManyWithoutUsersInput
}

input UserUpdateManyWithoutMemberOfInput {
  create: [UserCreateWithoutMemberOfInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  delete: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutMemberOfInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutMemberOfInput!]
}

input UserUpdateManyWithoutOwnedApplicationsInput {
  create: [UserCreateWithoutOwnedApplicationsInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  delete: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutOwnedApplicationsInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutOwnedApplicationsInput!]
}

input UserUpdateManyWithoutUserOfInput {
  create: [UserCreateWithoutUserOfInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  delete: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutUserOfInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutUserOfInput!]
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
  ownedApplications: ApplicationUpdateManyWithoutOwnersInput
  memberOf: ApplicationUpdateManyWithoutMembersInput
  userOf: ApplicationUpdateManyWithoutUsersInput
}

input UserUpdateWithoutMemberOfDataInput {
  uuid: String
  isVerified: Boolean
  identifier: IdentifierUpdateOneWithoutUserInput
  ownedApplications: ApplicationUpdateManyWithoutOwnersInput
  userOf: ApplicationUpdateManyWithoutUsersInput
}

input UserUpdateWithoutOwnedApplicationsDataInput {
  uuid: String
  isVerified: Boolean
  identifier: IdentifierUpdateOneWithoutUserInput
  memberOf: ApplicationUpdateManyWithoutMembersInput
  userOf: ApplicationUpdateManyWithoutUsersInput
}

input UserUpdateWithoutUserOfDataInput {
  uuid: String
  isVerified: Boolean
  identifier: IdentifierUpdateOneWithoutUserInput
  ownedApplications: ApplicationUpdateManyWithoutOwnersInput
  memberOf: ApplicationUpdateManyWithoutMembersInput
}

input UserUpdateWithWhereUniqueWithoutMemberOfInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutMemberOfDataInput!
}

input UserUpdateWithWhereUniqueWithoutOwnedApplicationsInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutOwnedApplicationsDataInput!
}

input UserUpdateWithWhereUniqueWithoutUserOfInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutUserOfDataInput!
}

input UserUpsertWithoutIdentifierInput {
  update: UserUpdateWithoutIdentifierDataInput!
  create: UserCreateWithoutIdentifierInput!
}

input UserUpsertWithWhereUniqueWithoutMemberOfInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutMemberOfDataInput!
  create: UserCreateWithoutMemberOfInput!
}

input UserUpsertWithWhereUniqueWithoutOwnedApplicationsInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutOwnedApplicationsDataInput!
  create: UserCreateWithoutOwnedApplicationsInput!
}

input UserUpsertWithWhereUniqueWithoutUserOfInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutUserOfDataInput!
  create: UserCreateWithoutUserOfInput!
}

input UserWhereInput {
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  uuid: String
  uuid_not: String
  uuid_in: [String!]
  uuid_not_in: [String!]
  uuid_lt: String
  uuid_lte: String
  uuid_gt: String
  uuid_gte: String
  uuid_contains: String
  uuid_not_contains: String
  uuid_starts_with: String
  uuid_not_starts_with: String
  uuid_ends_with: String
  uuid_not_ends_with: String
  isVerified: Boolean
  isVerified_not: Boolean
  identifier: IdentifierWhereInput
  ownedApplications_every: ApplicationWhereInput
  ownedApplications_some: ApplicationWhereInput
  ownedApplications_none: ApplicationWhereInput
  memberOf_every: ApplicationWhereInput
  memberOf_some: ApplicationWhereInput
  memberOf_none: ApplicationWhereInput
  userOf_every: ApplicationWhereInput
  userOf_some: ApplicationWhereInput
  userOf_none: ApplicationWhereInput
}

input UserWhereUniqueInput {
  id: ID
  uuid: String
}

type VerificationCodeConnection {
  pageInfo: PageInfo!
  edges: [VerificationCodeEdge]!
  aggregate: AggregateVerificationCode!
}

input VerificationCodeCreateInput {
  code: String!
  validUntil: DateTime!
  application: ApplicationCreateOneWithoutVerificationCodesInput!
  identifier: IdentifierCreateOneWithoutVerificationCodesInput
}

input VerificationCodeCreateManyWithoutApplicationInput {
  create: [VerificationCodeCreateWithoutApplicationInput!]
  connect: [VerificationCodeWhereUniqueInput!]
}

input VerificationCodeCreateManyWithoutIdentifierInput {
  create: [VerificationCodeCreateWithoutIdentifierInput!]
  connect: [VerificationCodeWhereUniqueInput!]
}

input VerificationCodeCreateWithoutApplicationInput {
  code: String!
  validUntil: DateTime!
  identifier: IdentifierCreateOneWithoutVerificationCodesInput
}

input VerificationCodeCreateWithoutIdentifierInput {
  code: String!
  validUntil: DateTime!
  application: ApplicationCreateOneWithoutVerificationCodesInput!
}

type VerificationCodeEdge {
  node: VerificationCode!
  cursor: String!
}

enum VerificationCodeOrderByInput {
  id_ASC
  id_DESC
  code_ASC
  code_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  validUntil_ASC
  validUntil_DESC
}

type VerificationCodePreviousValues {
  id: ID!
  code: String!
  createdAt: DateTime!
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
  AND: [VerificationCodeSubscriptionWhereInput!]
  OR: [VerificationCodeSubscriptionWhereInput!]
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VerificationCodeWhereInput
}

input VerificationCodeUpdateInput {
  code: String
  validUntil: DateTime
  application: ApplicationUpdateOneWithoutVerificationCodesInput
  identifier: IdentifierUpdateOneWithoutVerificationCodesInput
}

input VerificationCodeUpdateManyWithoutApplicationInput {
  create: [VerificationCodeCreateWithoutApplicationInput!]
  connect: [VerificationCodeWhereUniqueInput!]
  disconnect: [VerificationCodeWhereUniqueInput!]
  delete: [VerificationCodeWhereUniqueInput!]
  update: [VerificationCodeUpdateWithWhereUniqueWithoutApplicationInput!]
  upsert: [VerificationCodeUpsertWithWhereUniqueWithoutApplicationInput!]
}

input VerificationCodeUpdateManyWithoutIdentifierInput {
  create: [VerificationCodeCreateWithoutIdentifierInput!]
  connect: [VerificationCodeWhereUniqueInput!]
  disconnect: [VerificationCodeWhereUniqueInput!]
  delete: [VerificationCodeWhereUniqueInput!]
  update: [VerificationCodeUpdateWithWhereUniqueWithoutIdentifierInput!]
  upsert: [VerificationCodeUpsertWithWhereUniqueWithoutIdentifierInput!]
}

input VerificationCodeUpdateWithoutApplicationDataInput {
  code: String
  validUntil: DateTime
  identifier: IdentifierUpdateOneWithoutVerificationCodesInput
}

input VerificationCodeUpdateWithoutIdentifierDataInput {
  code: String
  validUntil: DateTime
  application: ApplicationUpdateOneWithoutVerificationCodesInput
}

input VerificationCodeUpdateWithWhereUniqueWithoutApplicationInput {
  where: VerificationCodeWhereUniqueInput!
  data: VerificationCodeUpdateWithoutApplicationDataInput!
}

input VerificationCodeUpdateWithWhereUniqueWithoutIdentifierInput {
  where: VerificationCodeWhereUniqueInput!
  data: VerificationCodeUpdateWithoutIdentifierDataInput!
}

input VerificationCodeUpsertWithWhereUniqueWithoutApplicationInput {
  where: VerificationCodeWhereUniqueInput!
  update: VerificationCodeUpdateWithoutApplicationDataInput!
  create: VerificationCodeCreateWithoutApplicationInput!
}

input VerificationCodeUpsertWithWhereUniqueWithoutIdentifierInput {
  where: VerificationCodeWhereUniqueInput!
  update: VerificationCodeUpdateWithoutIdentifierDataInput!
  create: VerificationCodeCreateWithoutIdentifierInput!
}

input VerificationCodeWhereInput {
  AND: [VerificationCodeWhereInput!]
  OR: [VerificationCodeWhereInput!]
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  code: String
  code_not: String
  code_in: [String!]
  code_not_in: [String!]
  code_lt: String
  code_lte: String
  code_gt: String
  code_gte: String
  code_contains: String
  code_not_contains: String
  code_starts_with: String
  code_not_starts_with: String
  code_ends_with: String
  code_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  validUntil: DateTime
  validUntil_not: DateTime
  validUntil_in: [DateTime!]
  validUntil_not_in: [DateTime!]
  validUntil_lt: DateTime
  validUntil_lte: DateTime
  validUntil_gt: DateTime
  validUntil_gte: DateTime
  application: ApplicationWhereInput
  identifier: IdentifierWhereInput
}

input VerificationCodeWhereUniqueInput {
  id: ID
  code: String
}

type Mutation {
  createCountryCode(data: CountryCodeCreateInput!): CountryCode!
  createIdentifier(data: IdentifierCreateInput!): Identifier!
  createPhoneNumber(data: PhoneNumberCreateInput!): PhoneNumber!
  createUser(data: UserCreateInput!): User!
  createVerificationCode(data: VerificationCodeCreateInput!): VerificationCode!
  createApplication(data: ApplicationCreateInput!): Application!
  createApplicationCredentials(data: ApplicationCredentialsCreateInput!): ApplicationCredentials!
  updateCountryCode(data: CountryCodeUpdateInput!, where: CountryCodeWhereUniqueInput!): CountryCode
  updateIdentifier(data: IdentifierUpdateInput!, where: IdentifierWhereUniqueInput!): Identifier
  updatePhoneNumber(data: PhoneNumberUpdateInput!, where: PhoneNumberWhereUniqueInput!): PhoneNumber
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateVerificationCode(data: VerificationCodeUpdateInput!, where: VerificationCodeWhereUniqueInput!): VerificationCode
  updateApplication(data: ApplicationUpdateInput!, where: ApplicationWhereUniqueInput!): Application
  deleteCountryCode(where: CountryCodeWhereUniqueInput!): CountryCode
  deleteIdentifier(where: IdentifierWhereUniqueInput!): Identifier
  deletePhoneNumber(where: PhoneNumberWhereUniqueInput!): PhoneNumber
  deleteUser(where: UserWhereUniqueInput!): User
  deleteVerificationCode(where: VerificationCodeWhereUniqueInput!): VerificationCode
  deleteApplication(where: ApplicationWhereUniqueInput!): Application
  upsertCountryCode(where: CountryCodeWhereUniqueInput!, create: CountryCodeCreateInput!, update: CountryCodeUpdateInput!): CountryCode!
  upsertIdentifier(where: IdentifierWhereUniqueInput!, create: IdentifierCreateInput!, update: IdentifierUpdateInput!): Identifier!
  upsertPhoneNumber(where: PhoneNumberWhereUniqueInput!, create: PhoneNumberCreateInput!, update: PhoneNumberUpdateInput!): PhoneNumber!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertVerificationCode(where: VerificationCodeWhereUniqueInput!, create: VerificationCodeCreateInput!, update: VerificationCodeUpdateInput!): VerificationCode!
  upsertApplication(where: ApplicationWhereUniqueInput!, create: ApplicationCreateInput!, update: ApplicationUpdateInput!): Application!
  updateManyCountryCodes(data: CountryCodeUpdateInput!, where: CountryCodeWhereInput): BatchPayload!
  updateManyIdentifiers(data: IdentifierUpdateInput!, where: IdentifierWhereInput): BatchPayload!
  updateManyPhoneNumbers(data: PhoneNumberUpdateInput!, where: PhoneNumberWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyVerificationCodes(data: VerificationCodeUpdateInput!, where: VerificationCodeWhereInput): BatchPayload!
  updateManyApplications(data: ApplicationUpdateInput!, where: ApplicationWhereInput): BatchPayload!
  updateManyApplicationCredentialses(data: ApplicationCredentialsUpdateInput!, where: ApplicationCredentialsWhereInput): BatchPayload!
  deleteManyCountryCodes(where: CountryCodeWhereInput): BatchPayload!
  deleteManyIdentifiers(where: IdentifierWhereInput): BatchPayload!
  deleteManyPhoneNumbers(where: PhoneNumberWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyVerificationCodes(where: VerificationCodeWhereInput): BatchPayload!
  deleteManyApplications(where: ApplicationWhereInput): BatchPayload!
  deleteManyApplicationCredentialses(where: ApplicationCredentialsWhereInput): BatchPayload!
}

type Query {
  countryCodes(where: CountryCodeWhereInput, orderBy: CountryCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CountryCode]!
  identifiers(where: IdentifierWhereInput, orderBy: IdentifierOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Identifier]!
  phoneNumbers(where: PhoneNumberWhereInput, orderBy: PhoneNumberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PhoneNumber]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  verificationCodes(where: VerificationCodeWhereInput, orderBy: VerificationCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VerificationCode]!
  applications(where: ApplicationWhereInput, orderBy: ApplicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Application]!
  applicationCredentialses(where: ApplicationCredentialsWhereInput, orderBy: ApplicationCredentialsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ApplicationCredentials]!
  countryCode(where: CountryCodeWhereUniqueInput!): CountryCode
  identifier(where: IdentifierWhereUniqueInput!): Identifier
  phoneNumber(where: PhoneNumberWhereUniqueInput!): PhoneNumber
  user(where: UserWhereUniqueInput!): User
  verificationCode(where: VerificationCodeWhereUniqueInput!): VerificationCode
  application(where: ApplicationWhereUniqueInput!): Application
  countryCodesConnection(where: CountryCodeWhereInput, orderBy: CountryCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CountryCodeConnection!
  identifiersConnection(where: IdentifierWhereInput, orderBy: IdentifierOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): IdentifierConnection!
  phoneNumbersConnection(where: PhoneNumberWhereInput, orderBy: PhoneNumberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PhoneNumberConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  verificationCodesConnection(where: VerificationCodeWhereInput, orderBy: VerificationCodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VerificationCodeConnection!
  applicationsConnection(where: ApplicationWhereInput, orderBy: ApplicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ApplicationConnection!
  applicationCredentialsesConnection(where: ApplicationCredentialsWhereInput, orderBy: ApplicationCredentialsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ApplicationCredentialsConnection!
  node(id: ID!): Node
}

type Subscription {
  countryCode(where: CountryCodeSubscriptionWhereInput): CountryCodeSubscriptionPayload
  identifier(where: IdentifierSubscriptionWhereInput): IdentifierSubscriptionPayload
  phoneNumber(where: PhoneNumberSubscriptionWhereInput): PhoneNumberSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  verificationCode(where: VerificationCodeSubscriptionWhereInput): VerificationCodeSubscriptionPayload
  application(where: ApplicationSubscriptionWhereInput): ApplicationSubscriptionPayload
  applicationCredentials(where: ApplicationCredentialsSubscriptionWhereInput): ApplicationCredentialsSubscriptionPayload
}
`

export type CountryCodeOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'countryCode_ASC'
    | 'countryCode_DESC'
    | 'dialingCode_ASC'
    | 'dialingCode_DESC'
    | 'active_ASC'
    | 'active_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'

export type PhoneNumberOrderByInput =
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'id_ASC'
    | 'id_DESC'
    | 'phoneNumber_ASC'
    | 'phoneNumber_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'

export type ApplicationOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'appId_ASC'
    | 'appId_DESC'
    | 'name_ASC'
    | 'name_DESC'
    | 'description_ASC'
    | 'description_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'

export type UserOrderByInput =
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'id_ASC'
    | 'id_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'uuid_ASC'
    | 'uuid_DESC'
    | 'isVerified_ASC'
    | 'isVerified_DESC'

export type VerificationCodeOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'code_ASC'
    | 'code_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'validUntil_ASC'
    | 'validUntil_DESC'

export type IdentifierOrderByInput =
    | 'id_ASC'
    | 'id_DESC'
    | 'hash_ASC'
    | 'hash_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'

export type ApplicationCredentialsOrderByInput =
    | 'secret_ASC'
    | 'secret_DESC'
    | 'active_ASC'
    | 'active_DESC'
    | 'id_ASC'
    | 'id_DESC'
    | 'updatedAt_ASC'
    | 'updatedAt_DESC'
    | 'createdAt_ASC'
    | 'createdAt_DESC'

export type MutationType = 'CREATED' | 'UPDATED' | 'DELETED'

export interface VerificationCodeCreateInput {
    code: String
    validUntil: DateTime
    application: ApplicationCreateOneWithoutVerificationCodesInput
    identifier?: IdentifierCreateOneWithoutVerificationCodesInput
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

export interface PhoneNumberUpdateWithoutCountryCodeDataInput {
    phoneNumber?: String
    identifier?: IdentifierUpdateOneWithoutPhoneNumberInput
}

export interface VerificationCodeWhereInput {
    AND?: VerificationCodeWhereInput[] | VerificationCodeWhereInput
    OR?: VerificationCodeWhereInput[] | VerificationCodeWhereInput
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
    application?: ApplicationWhereInput
    identifier?: IdentifierWhereInput
}

export interface ApplicationCreateWithoutVerificationCodesInput {
    appId: String
    name: String
    description?: String
    owners?: UserCreateManyWithoutOwnedApplicationsInput
    members?: UserCreateManyWithoutMemberOfInput
    users?: UserCreateManyWithoutUserOfInput
    credentials: ApplicationCredentialsCreateOneInput
}

export interface VerificationCodeUpdateWithWhereUniqueWithoutApplicationInput {
    where: VerificationCodeWhereUniqueInput
    data: VerificationCodeUpdateWithoutApplicationDataInput
}

export interface UserCreateManyWithoutOwnedApplicationsInput {
    create?:
        | UserCreateWithoutOwnedApplicationsInput[]
        | UserCreateWithoutOwnedApplicationsInput
    connect?: UserWhereUniqueInput[] | UserWhereUniqueInput
}

export interface IdentifierUpdateOneWithoutPhoneNumberInput {
    create?: IdentifierCreateWithoutPhoneNumberInput
    connect?: IdentifierWhereUniqueInput
    disconnect?: Boolean
    delete?: Boolean
    update?: IdentifierUpdateWithoutPhoneNumberDataInput
    upsert?: IdentifierUpsertWithoutPhoneNumberInput
}

export interface UserCreateWithoutOwnedApplicationsInput {
    uuid?: String
    isVerified?: Boolean
    identifier?: IdentifierCreateOneWithoutUserInput
    memberOf?: ApplicationCreateManyWithoutMembersInput
    userOf?: ApplicationCreateManyWithoutUsersInput
}

export interface ApplicationWhereInput {
    AND?: ApplicationWhereInput[] | ApplicationWhereInput
    OR?: ApplicationWhereInput[] | ApplicationWhereInput
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
    appId?: String
    appId_not?: String
    appId_in?: String[] | String
    appId_not_in?: String[] | String
    appId_lt?: String
    appId_lte?: String
    appId_gt?: String
    appId_gte?: String
    appId_contains?: String
    appId_not_contains?: String
    appId_starts_with?: String
    appId_not_starts_with?: String
    appId_ends_with?: String
    appId_not_ends_with?: String
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
    description?: String
    description_not?: String
    description_in?: String[] | String
    description_not_in?: String[] | String
    description_lt?: String
    description_lte?: String
    description_gt?: String
    description_gte?: String
    description_contains?: String
    description_not_contains?: String
    description_starts_with?: String
    description_not_starts_with?: String
    description_ends_with?: String
    description_not_ends_with?: String
    owners_every?: UserWhereInput
    owners_some?: UserWhereInput
    owners_none?: UserWhereInput
    members_every?: UserWhereInput
    members_some?: UserWhereInput
    members_none?: UserWhereInput
    users_every?: UserWhereInput
    users_some?: UserWhereInput
    users_none?: UserWhereInput
    credentials?: ApplicationCredentialsWhereInput
    verificationCodes_every?: VerificationCodeWhereInput
    verificationCodes_some?: VerificationCodeWhereInput
    verificationCodes_none?: VerificationCodeWhereInput
}

export interface ApplicationCreateManyWithoutMembersInput {
    create?:
        | ApplicationCreateWithoutMembersInput[]
        | ApplicationCreateWithoutMembersInput
    connect?: ApplicationWhereUniqueInput[] | ApplicationWhereUniqueInput
}

export interface ApplicationSubscriptionWhereInput {
    AND?:
        | ApplicationSubscriptionWhereInput[]
        | ApplicationSubscriptionWhereInput
    OR?: ApplicationSubscriptionWhereInput[] | ApplicationSubscriptionWhereInput
    mutation_in?: MutationType[] | MutationType
    updatedFields_contains?: String
    updatedFields_contains_every?: String[] | String
    updatedFields_contains_some?: String[] | String
    node?: ApplicationWhereInput
}

export interface ApplicationCreateWithoutMembersInput {
    appId: String
    name: String
    description?: String
    owners?: UserCreateManyWithoutOwnedApplicationsInput
    users?: UserCreateManyWithoutUserOfInput
    credentials: ApplicationCredentialsCreateOneInput
    verificationCodes?: VerificationCodeCreateManyWithoutApplicationInput
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
    ownedApplications_every?: ApplicationWhereInput
    ownedApplications_some?: ApplicationWhereInput
    ownedApplications_none?: ApplicationWhereInput
    memberOf_every?: ApplicationWhereInput
    memberOf_some?: ApplicationWhereInput
    memberOf_none?: ApplicationWhereInput
    userOf_every?: ApplicationWhereInput
    userOf_some?: ApplicationWhereInput
    userOf_none?: ApplicationWhereInput
}

export interface UserCreateManyWithoutUserOfInput {
    create?: UserCreateWithoutUserOfInput[] | UserCreateWithoutUserOfInput
    connect?: UserWhereUniqueInput[] | UserWhereUniqueInput
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

export interface UserCreateWithoutUserOfInput {
    uuid?: String
    isVerified?: Boolean
    identifier?: IdentifierCreateOneWithoutUserInput
    ownedApplications?: ApplicationCreateManyWithoutOwnersInput
    memberOf?: ApplicationCreateManyWithoutMembersInput
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

export interface ApplicationCredentialsCreateOneInput {
    create?: ApplicationCredentialsCreateInput
}

export interface CountryCodeSubscriptionWhereInput {
    AND?:
        | CountryCodeSubscriptionWhereInput[]
        | CountryCodeSubscriptionWhereInput
    OR?: CountryCodeSubscriptionWhereInput[] | CountryCodeSubscriptionWhereInput
    mutation_in?: MutationType[] | MutationType
    updatedFields_contains?: String
    updatedFields_contains_every?: String[] | String
    updatedFields_contains_some?: String[] | String
    node?: CountryCodeWhereInput
}

export interface ApplicationCredentialsCreateInput {
    secret: String
    active?: Boolean
}

export interface CountryCodeWhereUniqueInput {
    id?: ID_Input
    dialingCode?: String
}

export interface VerificationCodeCreateManyWithoutApplicationInput {
    create?:
        | VerificationCodeCreateWithoutApplicationInput[]
        | VerificationCodeCreateWithoutApplicationInput
    connect?:
        | VerificationCodeWhereUniqueInput[]
        | VerificationCodeWhereUniqueInput
}

export interface PhoneNumberWhereUniqueInput {
    id?: ID_Input
    phoneNumber?: String
}

export interface VerificationCodeCreateWithoutApplicationInput {
    code: String
    validUntil: DateTime
    identifier?: IdentifierCreateOneWithoutVerificationCodesInput
}

export interface VerificationCodeWhereUniqueInput {
    id?: ID_Input
    code?: String
}

export interface IdentifierCreateOneWithoutVerificationCodesInput {
    create?: IdentifierCreateWithoutVerificationCodesInput
    connect?: IdentifierWhereUniqueInput
}

export interface ApplicationUpdateInput {
    appId?: String
    name?: String
    description?: String
    owners?: UserUpdateManyWithoutOwnedApplicationsInput
    members?: UserUpdateManyWithoutMemberOfInput
    users?: UserUpdateManyWithoutUserOfInput
    credentials?: ApplicationCredentialsUpdateOneInput
    verificationCodes?: VerificationCodeUpdateManyWithoutApplicationInput
}

export interface IdentifierCreateWithoutVerificationCodesInput {
    hash: String
    phoneNumber?: PhoneNumberCreateOneWithoutIdentifierInput
    user?: UserCreateOneWithoutIdentifierInput
}

export interface UserUpdateInput {
    uuid?: String
    isVerified?: Boolean
    identifier?: IdentifierUpdateOneWithoutUserInput
    ownedApplications?: ApplicationUpdateManyWithoutOwnersInput
    memberOf?: ApplicationUpdateManyWithoutMembersInput
    userOf?: ApplicationUpdateManyWithoutUsersInput
}

export interface ApplicationCreateManyWithoutUsersInput {
    create?:
        | ApplicationCreateWithoutUsersInput[]
        | ApplicationCreateWithoutUsersInput
    connect?: ApplicationWhereUniqueInput[] | ApplicationWhereUniqueInput
}

export interface IdentifierUpdateInput {
    hash?: String
    phoneNumber?: PhoneNumberUpdateOneWithoutIdentifierInput
    user?: UserUpdateOneWithoutIdentifierInput
    verificationCodes?: VerificationCodeUpdateManyWithoutIdentifierInput
}

export interface ApplicationCreateWithoutUsersInput {
    appId: String
    name: String
    description?: String
    owners?: UserCreateManyWithoutOwnedApplicationsInput
    members?: UserCreateManyWithoutMemberOfInput
    credentials: ApplicationCredentialsCreateOneInput
    verificationCodes?: VerificationCodeCreateManyWithoutApplicationInput
}

export interface IdentifierUpsertWithoutPhoneNumberInput {
    update: IdentifierUpdateWithoutPhoneNumberDataInput
    create: IdentifierCreateWithoutPhoneNumberInput
}

export interface IdentifierCreateInput {
    hash: String
    phoneNumber?: PhoneNumberCreateOneWithoutIdentifierInput
    user?: UserCreateOneWithoutIdentifierInput
    verificationCodes?: VerificationCodeCreateManyWithoutIdentifierInput
}

export interface ApplicationUpsertWithWhereUniqueWithoutOwnersInput {
    where: ApplicationWhereUniqueInput
    update: ApplicationUpdateWithoutOwnersDataInput
    create: ApplicationCreateWithoutOwnersInput
}

export interface PhoneNumberCreateInput {
    phoneNumber: String
    countryCode: CountryCodeCreateOneWithoutPhoneNumbersInput
    identifier?: IdentifierCreateOneWithoutPhoneNumberInput
}

export interface IdentifierUpsertWithoutUserInput {
    update: IdentifierUpdateWithoutUserDataInput
    create: IdentifierCreateWithoutUserInput
}

export interface UserCreateInput {
    uuid?: String
    isVerified?: Boolean
    identifier?: IdentifierCreateOneWithoutUserInput
    ownedApplications?: ApplicationCreateManyWithoutOwnersInput
    memberOf?: ApplicationCreateManyWithoutMembersInput
    userOf?: ApplicationCreateManyWithoutUsersInput
}

export interface ApplicationUpsertWithoutVerificationCodesInput {
    update: ApplicationUpdateWithoutVerificationCodesDataInput
    create: ApplicationCreateWithoutVerificationCodesInput
}

export interface IdentifierUpdateOneWithoutVerificationCodesInput {
    create?: IdentifierCreateWithoutVerificationCodesInput
    connect?: IdentifierWhereUniqueInput
    disconnect?: Boolean
    delete?: Boolean
    update?: IdentifierUpdateWithoutVerificationCodesDataInput
    upsert?: IdentifierUpsertWithoutVerificationCodesInput
}

export interface ApplicationUpsertWithWhereUniqueWithoutUsersInput {
    where: ApplicationWhereUniqueInput
    update: ApplicationUpdateWithoutUsersDataInput
    create: ApplicationCreateWithoutUsersInput
}

export interface ApplicationCreateInput {
    appId: String
    name: String
    description?: String
    owners?: UserCreateManyWithoutOwnedApplicationsInput
    members?: UserCreateManyWithoutMemberOfInput
    users?: UserCreateManyWithoutUserOfInput
    credentials: ApplicationCredentialsCreateOneInput
    verificationCodes?: VerificationCodeCreateManyWithoutApplicationInput
}

export interface ApplicationUpdateWithWhereUniqueWithoutUsersInput {
    where: ApplicationWhereUniqueInput
    data: ApplicationUpdateWithoutUsersDataInput
}

export interface CountryCodeUpdateInput {
    name?: String
    countryCode?: String
    dialingCode?: String
    active?: Boolean
    phoneNumbers?: PhoneNumberUpdateManyWithoutCountryCodeInput
}

export interface ApplicationUpsertWithWhereUniqueWithoutMembersInput {
    where: ApplicationWhereUniqueInput
    update: ApplicationUpdateWithoutMembersDataInput
    create: ApplicationCreateWithoutMembersInput
}

export interface PhoneNumberUpdateManyWithoutCountryCodeInput {
    create?:
        | PhoneNumberCreateWithoutCountryCodeInput[]
        | PhoneNumberCreateWithoutCountryCodeInput
    connect?: PhoneNumberWhereUniqueInput[] | PhoneNumberWhereUniqueInput
    disconnect?: PhoneNumberWhereUniqueInput[] | PhoneNumberWhereUniqueInput
    delete?: PhoneNumberWhereUniqueInput[] | PhoneNumberWhereUniqueInput
    update?:
        | PhoneNumberUpdateWithWhereUniqueWithoutCountryCodeInput[]
        | PhoneNumberUpdateWithWhereUniqueWithoutCountryCodeInput
    upsert?:
        | PhoneNumberUpsertWithWhereUniqueWithoutCountryCodeInput[]
        | PhoneNumberUpsertWithWhereUniqueWithoutCountryCodeInput
}

export interface IdentifierUpsertWithoutVerificationCodesInput {
    update: IdentifierUpdateWithoutVerificationCodesDataInput
    create: IdentifierCreateWithoutVerificationCodesInput
}

export interface PhoneNumberUpdateWithWhereUniqueWithoutCountryCodeInput {
    where: PhoneNumberWhereUniqueInput
    data: PhoneNumberUpdateWithoutCountryCodeDataInput
}

export interface CountryCodeCreateInput {
    name?: String
    countryCode: String
    dialingCode: String
    active?: Boolean
    phoneNumbers?: PhoneNumberCreateManyWithoutCountryCodeInput
}

export interface ApplicationCredentialsWhereInput {
    AND?: ApplicationCredentialsWhereInput[] | ApplicationCredentialsWhereInput
    OR?: ApplicationCredentialsWhereInput[] | ApplicationCredentialsWhereInput
    secret?: String
    secret_not?: String
    secret_in?: String[] | String
    secret_not_in?: String[] | String
    secret_lt?: String
    secret_lte?: String
    secret_gt?: String
    secret_gte?: String
    secret_contains?: String
    secret_not_contains?: String
    secret_starts_with?: String
    secret_not_starts_with?: String
    secret_ends_with?: String
    secret_not_ends_with?: String
    active?: Boolean
    active_not?: Boolean
}

export interface PhoneNumberCreateWithoutCountryCodeInput {
    phoneNumber: String
    identifier?: IdentifierCreateOneWithoutPhoneNumberInput
}

export interface VerificationCodeUpdateWithoutApplicationDataInput {
    code?: String
    validUntil?: DateTime
    identifier?: IdentifierUpdateOneWithoutVerificationCodesInput
}

export interface IdentifierCreateWithoutPhoneNumberInput {
    hash: String
    user?: UserCreateOneWithoutIdentifierInput
    verificationCodes?: VerificationCodeCreateManyWithoutIdentifierInput
}

export interface IdentifierUpdateWithoutPhoneNumberDataInput {
    hash?: String
    user?: UserUpdateOneWithoutIdentifierInput
    verificationCodes?: VerificationCodeUpdateManyWithoutIdentifierInput
}

export interface UserCreateWithoutIdentifierInput {
    uuid?: String
    isVerified?: Boolean
    ownedApplications?: ApplicationCreateManyWithoutOwnersInput
    memberOf?: ApplicationCreateManyWithoutMembersInput
    userOf?: ApplicationCreateManyWithoutUsersInput
}

export interface UserUpdateOneWithoutIdentifierInput {
    create?: UserCreateWithoutIdentifierInput
    connect?: UserWhereUniqueInput
    disconnect?: Boolean
    delete?: Boolean
    update?: UserUpdateWithoutIdentifierDataInput
    upsert?: UserUpsertWithoutIdentifierInput
}

export interface ApplicationCreateWithoutOwnersInput {
    appId: String
    name: String
    description?: String
    members?: UserCreateManyWithoutMemberOfInput
    users?: UserCreateManyWithoutUserOfInput
    credentials: ApplicationCredentialsCreateOneInput
    verificationCodes?: VerificationCodeCreateManyWithoutApplicationInput
}

export interface UserUpdateWithoutIdentifierDataInput {
    uuid?: String
    isVerified?: Boolean
    ownedApplications?: ApplicationUpdateManyWithoutOwnersInput
    memberOf?: ApplicationUpdateManyWithoutMembersInput
    userOf?: ApplicationUpdateManyWithoutUsersInput
}

export interface UserCreateWithoutMemberOfInput {
    uuid?: String
    isVerified?: Boolean
    identifier?: IdentifierCreateOneWithoutUserInput
    ownedApplications?: ApplicationCreateManyWithoutOwnersInput
    userOf?: ApplicationCreateManyWithoutUsersInput
}

export interface ApplicationUpdateManyWithoutOwnersInput {
    create?:
        | ApplicationCreateWithoutOwnersInput[]
        | ApplicationCreateWithoutOwnersInput
    connect?: ApplicationWhereUniqueInput[] | ApplicationWhereUniqueInput
    disconnect?: ApplicationWhereUniqueInput[] | ApplicationWhereUniqueInput
    delete?: ApplicationWhereUniqueInput[] | ApplicationWhereUniqueInput
    update?:
        | ApplicationUpdateWithWhereUniqueWithoutOwnersInput[]
        | ApplicationUpdateWithWhereUniqueWithoutOwnersInput
    upsert?:
        | ApplicationUpsertWithWhereUniqueWithoutOwnersInput[]
        | ApplicationUpsertWithWhereUniqueWithoutOwnersInput
}

export interface IdentifierCreateWithoutUserInput {
    hash: String
    phoneNumber?: PhoneNumberCreateOneWithoutIdentifierInput
    verificationCodes?: VerificationCodeCreateManyWithoutIdentifierInput
}

export interface ApplicationUpdateWithWhereUniqueWithoutOwnersInput {
    where: ApplicationWhereUniqueInput
    data: ApplicationUpdateWithoutOwnersDataInput
}

export interface PhoneNumberCreateWithoutIdentifierInput {
    phoneNumber: String
    countryCode: CountryCodeCreateOneWithoutPhoneNumbersInput
}

export interface ApplicationUpdateWithoutOwnersDataInput {
    appId?: String
    name?: String
    description?: String
    members?: UserUpdateManyWithoutMemberOfInput
    users?: UserUpdateManyWithoutUserOfInput
    credentials?: ApplicationCredentialsUpdateOneInput
    verificationCodes?: VerificationCodeUpdateManyWithoutApplicationInput
}

export interface CountryCodeCreateWithoutPhoneNumbersInput {
    name?: String
    countryCode: String
    dialingCode: String
    active?: Boolean
}

export interface UserUpdateManyWithoutMemberOfInput {
    create?: UserCreateWithoutMemberOfInput[] | UserCreateWithoutMemberOfInput
    connect?: UserWhereUniqueInput[] | UserWhereUniqueInput
    disconnect?: UserWhereUniqueInput[] | UserWhereUniqueInput
    delete?: UserWhereUniqueInput[] | UserWhereUniqueInput
    update?:
        | UserUpdateWithWhereUniqueWithoutMemberOfInput[]
        | UserUpdateWithWhereUniqueWithoutMemberOfInput
    upsert?:
        | UserUpsertWithWhereUniqueWithoutMemberOfInput[]
        | UserUpsertWithWhereUniqueWithoutMemberOfInput
}

export interface VerificationCodeCreateWithoutIdentifierInput {
    code: String
    validUntil: DateTime
    application: ApplicationCreateOneWithoutVerificationCodesInput
}

export interface UserUpdateWithWhereUniqueWithoutMemberOfInput {
    where: UserWhereUniqueInput
    data: UserUpdateWithoutMemberOfDataInput
}

export interface VerificationCodeSubscriptionWhereInput {
    AND?:
        | VerificationCodeSubscriptionWhereInput[]
        | VerificationCodeSubscriptionWhereInput
    OR?:
        | VerificationCodeSubscriptionWhereInput[]
        | VerificationCodeSubscriptionWhereInput
    mutation_in?: MutationType[] | MutationType
    updatedFields_contains?: String
    updatedFields_contains_every?: String[] | String
    updatedFields_contains_some?: String[] | String
    node?: VerificationCodeWhereInput
}

export interface UserUpdateWithoutMemberOfDataInput {
    uuid?: String
    isVerified?: Boolean
    identifier?: IdentifierUpdateOneWithoutUserInput
    ownedApplications?: ApplicationUpdateManyWithoutOwnersInput
    userOf?: ApplicationUpdateManyWithoutUsersInput
}

export interface PhoneNumberSubscriptionWhereInput {
    AND?:
        | PhoneNumberSubscriptionWhereInput[]
        | PhoneNumberSubscriptionWhereInput
    OR?: PhoneNumberSubscriptionWhereInput[] | PhoneNumberSubscriptionWhereInput
    mutation_in?: MutationType[] | MutationType
    updatedFields_contains?: String
    updatedFields_contains_every?: String[] | String
    updatedFields_contains_some?: String[] | String
    node?: PhoneNumberWhereInput
}

export interface IdentifierUpdateOneWithoutUserInput {
    create?: IdentifierCreateWithoutUserInput
    connect?: IdentifierWhereUniqueInput
    disconnect?: Boolean
    delete?: Boolean
    update?: IdentifierUpdateWithoutUserDataInput
    upsert?: IdentifierUpsertWithoutUserInput
}

export interface ApplicationCredentialsUpdateInput {
    secret?: String
    active?: Boolean
}

export interface IdentifierUpdateWithoutUserDataInput {
    hash?: String
    phoneNumber?: PhoneNumberUpdateOneWithoutIdentifierInput
    verificationCodes?: VerificationCodeUpdateManyWithoutIdentifierInput
}

export interface UserWhereUniqueInput {
    id?: ID_Input
    uuid?: String
}

export interface PhoneNumberUpdateOneWithoutIdentifierInput {
    create?: PhoneNumberCreateWithoutIdentifierInput
    connect?: PhoneNumberWhereUniqueInput
    disconnect?: Boolean
    delete?: Boolean
    update?: PhoneNumberUpdateWithoutIdentifierDataInput
    upsert?: PhoneNumberUpsertWithoutIdentifierInput
}

export interface VerificationCodeUpdateInput {
    code?: String
    validUntil?: DateTime
    application?: ApplicationUpdateOneWithoutVerificationCodesInput
    identifier?: IdentifierUpdateOneWithoutVerificationCodesInput
}

export interface PhoneNumberUpdateWithoutIdentifierDataInput {
    phoneNumber?: String
    countryCode?: CountryCodeUpdateOneWithoutPhoneNumbersInput
}

export interface PhoneNumberUpsertWithWhereUniqueWithoutCountryCodeInput {
    where: PhoneNumberWhereUniqueInput
    update: PhoneNumberUpdateWithoutCountryCodeDataInput
    create: PhoneNumberCreateWithoutCountryCodeInput
}

export interface CountryCodeUpdateOneWithoutPhoneNumbersInput {
    create?: CountryCodeCreateWithoutPhoneNumbersInput
    connect?: CountryCodeWhereUniqueInput
    delete?: Boolean
    update?: CountryCodeUpdateWithoutPhoneNumbersDataInput
    upsert?: CountryCodeUpsertWithoutPhoneNumbersInput
}

export interface UserUpsertWithWhereUniqueWithoutMemberOfInput {
    where: UserWhereUniqueInput
    update: UserUpdateWithoutMemberOfDataInput
    create: UserCreateWithoutMemberOfInput
}

export interface CountryCodeUpdateWithoutPhoneNumbersDataInput {
    name?: String
    countryCode?: String
    dialingCode?: String
    active?: Boolean
}

export interface UserUpsertWithWhereUniqueWithoutOwnedApplicationsInput {
    where: UserWhereUniqueInput
    update: UserUpdateWithoutOwnedApplicationsDataInput
    create: UserCreateWithoutOwnedApplicationsInput
}

export interface CountryCodeUpsertWithoutPhoneNumbersInput {
    update: CountryCodeUpdateWithoutPhoneNumbersDataInput
    create: CountryCodeCreateWithoutPhoneNumbersInput
}

export interface ApplicationUpdateManyWithoutUsersInput {
    create?:
        | ApplicationCreateWithoutUsersInput[]
        | ApplicationCreateWithoutUsersInput
    connect?: ApplicationWhereUniqueInput[] | ApplicationWhereUniqueInput
    disconnect?: ApplicationWhereUniqueInput[] | ApplicationWhereUniqueInput
    delete?: ApplicationWhereUniqueInput[] | ApplicationWhereUniqueInput
    update?:
        | ApplicationUpdateWithWhereUniqueWithoutUsersInput[]
        | ApplicationUpdateWithWhereUniqueWithoutUsersInput
    upsert?:
        | ApplicationUpsertWithWhereUniqueWithoutUsersInput[]
        | ApplicationUpsertWithWhereUniqueWithoutUsersInput
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

export interface VerificationCodeUpdateManyWithoutIdentifierInput {
    create?:
        | VerificationCodeCreateWithoutIdentifierInput[]
        | VerificationCodeCreateWithoutIdentifierInput
    connect?:
        | VerificationCodeWhereUniqueInput[]
        | VerificationCodeWhereUniqueInput
    disconnect?:
        | VerificationCodeWhereUniqueInput[]
        | VerificationCodeWhereUniqueInput
    delete?:
        | VerificationCodeWhereUniqueInput[]
        | VerificationCodeWhereUniqueInput
    update?:
        | VerificationCodeUpdateWithWhereUniqueWithoutIdentifierInput[]
        | VerificationCodeUpdateWithWhereUniqueWithoutIdentifierInput
    upsert?:
        | VerificationCodeUpsertWithWhereUniqueWithoutIdentifierInput[]
        | VerificationCodeUpsertWithWhereUniqueWithoutIdentifierInput
}

export interface IdentifierCreateOneWithoutPhoneNumberInput {
    create?: IdentifierCreateWithoutPhoneNumberInput
    connect?: IdentifierWhereUniqueInput
}

export interface VerificationCodeUpdateWithWhereUniqueWithoutIdentifierInput {
    where: VerificationCodeWhereUniqueInput
    data: VerificationCodeUpdateWithoutIdentifierDataInput
}

export interface ApplicationCreateManyWithoutOwnersInput {
    create?:
        | ApplicationCreateWithoutOwnersInput[]
        | ApplicationCreateWithoutOwnersInput
    connect?: ApplicationWhereUniqueInput[] | ApplicationWhereUniqueInput
}

export interface VerificationCodeUpdateWithoutIdentifierDataInput {
    code?: String
    validUntil?: DateTime
    application?: ApplicationUpdateOneWithoutVerificationCodesInput
}

export interface IdentifierCreateOneWithoutUserInput {
    create?: IdentifierCreateWithoutUserInput
    connect?: IdentifierWhereUniqueInput
}

export interface ApplicationUpdateOneWithoutVerificationCodesInput {
    create?: ApplicationCreateWithoutVerificationCodesInput
    connect?: ApplicationWhereUniqueInput
    delete?: Boolean
    update?: ApplicationUpdateWithoutVerificationCodesDataInput
    upsert?: ApplicationUpsertWithoutVerificationCodesInput
}

export interface CountryCodeCreateOneWithoutPhoneNumbersInput {
    create?: CountryCodeCreateWithoutPhoneNumbersInput
    connect?: CountryCodeWhereUniqueInput
}

export interface ApplicationUpdateWithoutVerificationCodesDataInput {
    appId?: String
    name?: String
    description?: String
    owners?: UserUpdateManyWithoutOwnedApplicationsInput
    members?: UserUpdateManyWithoutMemberOfInput
    users?: UserUpdateManyWithoutUserOfInput
    credentials?: ApplicationCredentialsUpdateOneInput
}

export interface ApplicationCreateOneWithoutVerificationCodesInput {
    create?: ApplicationCreateWithoutVerificationCodesInput
    connect?: ApplicationWhereUniqueInput
}

export interface UserUpdateManyWithoutOwnedApplicationsInput {
    create?:
        | UserCreateWithoutOwnedApplicationsInput[]
        | UserCreateWithoutOwnedApplicationsInput
    connect?: UserWhereUniqueInput[] | UserWhereUniqueInput
    disconnect?: UserWhereUniqueInput[] | UserWhereUniqueInput
    delete?: UserWhereUniqueInput[] | UserWhereUniqueInput
    update?:
        | UserUpdateWithWhereUniqueWithoutOwnedApplicationsInput[]
        | UserUpdateWithWhereUniqueWithoutOwnedApplicationsInput
    upsert?:
        | UserUpsertWithWhereUniqueWithoutOwnedApplicationsInput[]
        | UserUpsertWithWhereUniqueWithoutOwnedApplicationsInput
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

export interface UserUpdateWithWhereUniqueWithoutOwnedApplicationsInput {
    where: UserWhereUniqueInput
    data: UserUpdateWithoutOwnedApplicationsDataInput
}

export interface IdentifierWhereUniqueInput {
    id?: ID_Input
    hash?: String
}

export interface UserUpdateWithoutOwnedApplicationsDataInput {
    uuid?: String
    isVerified?: Boolean
    identifier?: IdentifierUpdateOneWithoutUserInput
    memberOf?: ApplicationUpdateManyWithoutMembersInput
    userOf?: ApplicationUpdateManyWithoutUsersInput
}

export interface PhoneNumberUpdateInput {
    phoneNumber?: String
    countryCode?: CountryCodeUpdateOneWithoutPhoneNumbersInput
    identifier?: IdentifierUpdateOneWithoutPhoneNumberInput
}

export interface ApplicationUpdateManyWithoutMembersInput {
    create?:
        | ApplicationCreateWithoutMembersInput[]
        | ApplicationCreateWithoutMembersInput
    connect?: ApplicationWhereUniqueInput[] | ApplicationWhereUniqueInput
    disconnect?: ApplicationWhereUniqueInput[] | ApplicationWhereUniqueInput
    delete?: ApplicationWhereUniqueInput[] | ApplicationWhereUniqueInput
    update?:
        | ApplicationUpdateWithWhereUniqueWithoutMembersInput[]
        | ApplicationUpdateWithWhereUniqueWithoutMembersInput
    upsert?:
        | ApplicationUpsertWithWhereUniqueWithoutMembersInput[]
        | ApplicationUpsertWithWhereUniqueWithoutMembersInput
}

export interface VerificationCodeUpsertWithWhereUniqueWithoutIdentifierInput {
    where: VerificationCodeWhereUniqueInput
    update: VerificationCodeUpdateWithoutIdentifierDataInput
    create: VerificationCodeCreateWithoutIdentifierInput
}

export interface ApplicationUpdateWithWhereUniqueWithoutMembersInput {
    where: ApplicationWhereUniqueInput
    data: ApplicationUpdateWithoutMembersDataInput
}

export interface VerificationCodeUpsertWithWhereUniqueWithoutApplicationInput {
    where: VerificationCodeWhereUniqueInput
    update: VerificationCodeUpdateWithoutApplicationDataInput
    create: VerificationCodeCreateWithoutApplicationInput
}

export interface ApplicationUpdateWithoutMembersDataInput {
    appId?: String
    name?: String
    description?: String
    owners?: UserUpdateManyWithoutOwnedApplicationsInput
    users?: UserUpdateManyWithoutUserOfInput
    credentials?: ApplicationCredentialsUpdateOneInput
    verificationCodes?: VerificationCodeUpdateManyWithoutApplicationInput
}

export interface UserCreateOneWithoutIdentifierInput {
    create?: UserCreateWithoutIdentifierInput
    connect?: UserWhereUniqueInput
}

export interface UserUpdateManyWithoutUserOfInput {
    create?: UserCreateWithoutUserOfInput[] | UserCreateWithoutUserOfInput
    connect?: UserWhereUniqueInput[] | UserWhereUniqueInput
    disconnect?: UserWhereUniqueInput[] | UserWhereUniqueInput
    delete?: UserWhereUniqueInput[] | UserWhereUniqueInput
    update?:
        | UserUpdateWithWhereUniqueWithoutUserOfInput[]
        | UserUpdateWithWhereUniqueWithoutUserOfInput
    upsert?:
        | UserUpsertWithWhereUniqueWithoutUserOfInput[]
        | UserUpsertWithWhereUniqueWithoutUserOfInput
}

export interface PhoneNumberCreateOneWithoutIdentifierInput {
    create?: PhoneNumberCreateWithoutIdentifierInput
    connect?: PhoneNumberWhereUniqueInput
}

export interface UserUpdateWithWhereUniqueWithoutUserOfInput {
    where: UserWhereUniqueInput
    data: UserUpdateWithoutUserOfDataInput
}

export interface ApplicationCredentialsSubscriptionWhereInput {
    AND?:
        | ApplicationCredentialsSubscriptionWhereInput[]
        | ApplicationCredentialsSubscriptionWhereInput
    OR?:
        | ApplicationCredentialsSubscriptionWhereInput[]
        | ApplicationCredentialsSubscriptionWhereInput
    mutation_in?: MutationType[] | MutationType
    updatedFields_contains?: String
    updatedFields_contains_every?: String[] | String
    updatedFields_contains_some?: String[] | String
    node?: ApplicationCredentialsWhereInput
}

export interface UserUpdateWithoutUserOfDataInput {
    uuid?: String
    isVerified?: Boolean
    identifier?: IdentifierUpdateOneWithoutUserInput
    ownedApplications?: ApplicationUpdateManyWithoutOwnersInput
    memberOf?: ApplicationUpdateManyWithoutMembersInput
}

export interface ApplicationWhereUniqueInput {
    id?: ID_Input
    name?: String
}

export interface UserUpsertWithWhereUniqueWithoutUserOfInput {
    where: UserWhereUniqueInput
    update: UserUpdateWithoutUserOfDataInput
    create: UserCreateWithoutUserOfInput
}

export interface ApplicationUpdateWithoutUsersDataInput {
    appId?: String
    name?: String
    description?: String
    owners?: UserUpdateManyWithoutOwnedApplicationsInput
    members?: UserUpdateManyWithoutMemberOfInput
    credentials?: ApplicationCredentialsUpdateOneInput
    verificationCodes?: VerificationCodeUpdateManyWithoutApplicationInput
}

export interface VerificationCodeUpdateManyWithoutApplicationInput {
    create?:
        | VerificationCodeCreateWithoutApplicationInput[]
        | VerificationCodeCreateWithoutApplicationInput
    connect?:
        | VerificationCodeWhereUniqueInput[]
        | VerificationCodeWhereUniqueInput
    disconnect?:
        | VerificationCodeWhereUniqueInput[]
        | VerificationCodeWhereUniqueInput
    delete?:
        | VerificationCodeWhereUniqueInput[]
        | VerificationCodeWhereUniqueInput
    update?:
        | VerificationCodeUpdateWithWhereUniqueWithoutApplicationInput[]
        | VerificationCodeUpdateWithWhereUniqueWithoutApplicationInput
    upsert?:
        | VerificationCodeUpsertWithWhereUniqueWithoutApplicationInput[]
        | VerificationCodeUpsertWithWhereUniqueWithoutApplicationInput
}

export interface ApplicationCredentialsUpsertNestedInput {
    update: ApplicationCredentialsUpdateDataInput
    create: ApplicationCredentialsCreateInput
}

export interface ApplicationCredentialsUpdateDataInput {
    secret?: String
    active?: Boolean
}

export interface ApplicationCredentialsUpdateOneInput {
    create?: ApplicationCredentialsCreateInput
    delete?: Boolean
    update?: ApplicationCredentialsUpdateDataInput
    upsert?: ApplicationCredentialsUpsertNestedInput
}

export interface PhoneNumberCreateManyWithoutCountryCodeInput {
    create?:
        | PhoneNumberCreateWithoutCountryCodeInput[]
        | PhoneNumberCreateWithoutCountryCodeInput
    connect?: PhoneNumberWhereUniqueInput[] | PhoneNumberWhereUniqueInput
}

export interface UserUpsertWithoutIdentifierInput {
    update: UserUpdateWithoutIdentifierDataInput
    create: UserCreateWithoutIdentifierInput
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

export interface VerificationCodeCreateManyWithoutIdentifierInput {
    create?:
        | VerificationCodeCreateWithoutIdentifierInput[]
        | VerificationCodeCreateWithoutIdentifierInput
    connect?:
        | VerificationCodeWhereUniqueInput[]
        | VerificationCodeWhereUniqueInput
}

export interface UserCreateManyWithoutMemberOfInput {
    create?: UserCreateWithoutMemberOfInput[] | UserCreateWithoutMemberOfInput
    connect?: UserWhereUniqueInput[] | UserWhereUniqueInput
}

export interface Node {
    id: ID_Output
}

export interface ApplicationCredentialsPreviousValues {
    secret: String
    active?: Boolean
}

export interface BatchPayload {
    count: Long
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

export interface CountryCodeConnection {
    pageInfo: PageInfo
    edges: CountryCodeEdge[]
    aggregate: AggregateCountryCode
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

export interface ApplicationCredentialsSubscriptionPayload {
    mutation: MutationType
    node?: ApplicationCredentials
    updatedFields?: String[]
    previousValues?: ApplicationCredentialsPreviousValues
}

export interface AggregateApplicationCredentials {
    count: Int
}

export interface ApplicationCredentialsEdge {
    node: ApplicationCredentials
    cursor: String
}

export interface AggregateApplication {
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

export interface ApplicationConnection {
    pageInfo: PageInfo
    edges: ApplicationEdge[]
    aggregate: AggregateApplication
}

export interface ApplicationPreviousValues {
    id: ID_Output
    appId: String
    name: String
    description?: String
}

export interface VerificationCodeEdge {
    node: VerificationCode
    cursor: String
}

export interface ApplicationSubscriptionPayload {
    mutation: MutationType
    node?: Application
    updatedFields?: String[]
    previousValues?: ApplicationPreviousValues
}

export interface AggregateUser {
    count: Int
}

export interface CountryCodeSubscriptionPayload {
    mutation: MutationType
    node?: CountryCode
    updatedFields?: String[]
    previousValues?: CountryCodePreviousValues
}

export interface UserConnection {
    pageInfo: PageInfo
    edges: UserEdge[]
    aggregate: AggregateUser
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

export interface PhoneNumberEdge {
    node: PhoneNumber
    cursor: String
}

export interface VerificationCode extends Node {
    id: ID_Output
    code: String
    createdAt: DateTime
    application: Application
    identifier?: Identifier
    updatedAt: DateTime
    validUntil: DateTime
}

export interface AggregateIdentifier {
    count: Int
}

export interface IdentifierSubscriptionPayload {
    mutation: MutationType
    node?: Identifier
    updatedFields?: String[]
    previousValues?: IdentifierPreviousValues
}

export interface IdentifierConnection {
    pageInfo: PageInfo
    edges: IdentifierEdge[]
    aggregate: AggregateIdentifier
}

export interface IdentifierPreviousValues {
    id: ID_Output
    hash: String
    createdAt: DateTime
    updatedAt: DateTime
}

export interface CountryCodeEdge {
    node: CountryCode
    cursor: String
}

export interface ApplicationCredentials {
    secret: String
    active?: Boolean
}

export interface ApplicationCredentialsConnection {
    pageInfo: PageInfo
    edges: ApplicationCredentialsEdge[]
    aggregate: AggregateApplicationCredentials
}

export interface PhoneNumberSubscriptionPayload {
    mutation: MutationType
    node?: PhoneNumber
    updatedFields?: String[]
    previousValues?: PhoneNumberPreviousValues
}

export interface AggregateVerificationCode {
    count: Int
}

export interface PhoneNumberPreviousValues {
    createdAt: DateTime
    id: ID_Output
    phoneNumber: String
    updatedAt: DateTime
}

export interface UserEdge {
    node: User
    cursor: String
}

export interface Application extends Node {
    id: ID_Output
    appId: String
    name: String
    description?: String
    owners?: User[]
    members?: User[]
    users?: User[]
    credentials: ApplicationCredentials
    verificationCodes?: VerificationCode[]
}

export interface PhoneNumberConnection {
    pageInfo: PageInfo
    edges: PhoneNumberEdge[]
    aggregate: AggregatePhoneNumber
}

export interface UserSubscriptionPayload {
    mutation: MutationType
    node?: User
    updatedFields?: String[]
    previousValues?: UserPreviousValues
}

export interface AggregateCountryCode {
    count: Int
}

export interface ApplicationEdge {
    node: Application
    cursor: String
}

export interface VerificationCodePreviousValues {
    id: ID_Output
    code: String
    createdAt: DateTime
    updatedAt: DateTime
    validUntil: DateTime
}

export interface VerificationCodeSubscriptionPayload {
    mutation: MutationType
    node?: VerificationCode
    updatedFields?: String[]
    previousValues?: VerificationCodePreviousValues
}

export interface User extends Node {
    createdAt: DateTime
    id: ID_Output
    identifier?: Identifier
    updatedAt: DateTime
    uuid?: String
    isVerified?: Boolean
    ownedApplications?: Application[]
    memberOf?: Application[]
    userOf?: Application[]
}

export interface UserPreviousValues {
    createdAt: DateTime
    id: ID_Output
    updatedAt: DateTime
    uuid?: String
    isVerified?: Boolean
}

export interface VerificationCodeConnection {
    pageInfo: PageInfo
    edges: VerificationCodeEdge[]
    aggregate: AggregateVerificationCode
}

export interface PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    startCursor?: String
    endCursor?: String
}

export interface IdentifierEdge {
    node: Identifier
    cursor: String
}

export interface AggregatePhoneNumber {
    count: Int
}

export type Long = string

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
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

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
    countryCodes: (
        args: {
            where?: CountryCodeWhereInput
            orderBy?: CountryCodeOrderByInput
            skip?: Int
            after?: String
            before?: String
            first?: Int
            last?: Int
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<CountryCode[]>
    identifiers: (
        args: {
            where?: IdentifierWhereInput
            orderBy?: IdentifierOrderByInput
            skip?: Int
            after?: String
            before?: String
            first?: Int
            last?: Int
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<Identifier[]>
    phoneNumbers: (
        args: {
            where?: PhoneNumberWhereInput
            orderBy?: PhoneNumberOrderByInput
            skip?: Int
            after?: String
            before?: String
            first?: Int
            last?: Int
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<PhoneNumber[]>
    users: (
        args: {
            where?: UserWhereInput
            orderBy?: UserOrderByInput
            skip?: Int
            after?: String
            before?: String
            first?: Int
            last?: Int
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<User[]>
    verificationCodes: (
        args: {
            where?: VerificationCodeWhereInput
            orderBy?: VerificationCodeOrderByInput
            skip?: Int
            after?: String
            before?: String
            first?: Int
            last?: Int
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<VerificationCode[]>
    applications: (
        args: {
            where?: ApplicationWhereInput
            orderBy?: ApplicationOrderByInput
            skip?: Int
            after?: String
            before?: String
            first?: Int
            last?: Int
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<Application[]>
    applicationCredentialses: (
        args: {
            where?: ApplicationCredentialsWhereInput
            orderBy?: ApplicationCredentialsOrderByInput
            skip?: Int
            after?: String
            before?: String
            first?: Int
            last?: Int
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<ApplicationCredentials[]>
    countryCode: (
        args: { where: CountryCodeWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<CountryCode | null>
    identifier: (
        args: { where: IdentifierWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<Identifier | null>
    phoneNumber: (
        args: { where: PhoneNumberWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<PhoneNumber | null>
    user: (
        args: { where: UserWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<User | null>
    verificationCode: (
        args: { where: VerificationCodeWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<VerificationCode | null>
    application: (
        args: { where: ApplicationWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<Application | null>
    countryCodesConnection: (
        args: {
            where?: CountryCodeWhereInput
            orderBy?: CountryCodeOrderByInput
            skip?: Int
            after?: String
            before?: String
            first?: Int
            last?: Int
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<CountryCodeConnection>
    identifiersConnection: (
        args: {
            where?: IdentifierWhereInput
            orderBy?: IdentifierOrderByInput
            skip?: Int
            after?: String
            before?: String
            first?: Int
            last?: Int
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<IdentifierConnection>
    phoneNumbersConnection: (
        args: {
            where?: PhoneNumberWhereInput
            orderBy?: PhoneNumberOrderByInput
            skip?: Int
            after?: String
            before?: String
            first?: Int
            last?: Int
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<PhoneNumberConnection>
    usersConnection: (
        args: {
            where?: UserWhereInput
            orderBy?: UserOrderByInput
            skip?: Int
            after?: String
            before?: String
            first?: Int
            last?: Int
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<UserConnection>
    verificationCodesConnection: (
        args: {
            where?: VerificationCodeWhereInput
            orderBy?: VerificationCodeOrderByInput
            skip?: Int
            after?: String
            before?: String
            first?: Int
            last?: Int
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<VerificationCodeConnection>
    applicationsConnection: (
        args: {
            where?: ApplicationWhereInput
            orderBy?: ApplicationOrderByInput
            skip?: Int
            after?: String
            before?: String
            first?: Int
            last?: Int
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<ApplicationConnection>
    applicationCredentialsesConnection: (
        args: {
            where?: ApplicationCredentialsWhereInput
            orderBy?: ApplicationCredentialsOrderByInput
            skip?: Int
            after?: String
            before?: String
            first?: Int
            last?: Int
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<ApplicationCredentialsConnection>
    node: (
        args: { id: ID_Output },
        info?: GraphQLResolveInfo | string,
    ) => Promise<Node | null>
}

export type Mutation = {
    createCountryCode: (
        args: { data: CountryCodeCreateInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<CountryCode>
    createIdentifier: (
        args: { data: IdentifierCreateInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<Identifier>
    createPhoneNumber: (
        args: { data: PhoneNumberCreateInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<PhoneNumber>
    createUser: (
        args: { data: UserCreateInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<User>
    createVerificationCode: (
        args: { data: VerificationCodeCreateInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<VerificationCode>
    createApplication: (
        args: { data: ApplicationCreateInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<Application>
    createApplicationCredentials: (
        args: { data: ApplicationCredentialsCreateInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<ApplicationCredentials>
    updateCountryCode: (
        args: {
            data: CountryCodeUpdateInput
            where: CountryCodeWhereUniqueInput
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<CountryCode | null>
    updateIdentifier: (
        args: {
            data: IdentifierUpdateInput
            where: IdentifierWhereUniqueInput
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<Identifier | null>
    updatePhoneNumber: (
        args: {
            data: PhoneNumberUpdateInput
            where: PhoneNumberWhereUniqueInput
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<PhoneNumber | null>
    updateUser: (
        args: { data: UserUpdateInput; where: UserWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<User | null>
    updateVerificationCode: (
        args: {
            data: VerificationCodeUpdateInput
            where: VerificationCodeWhereUniqueInput
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<VerificationCode | null>
    updateApplication: (
        args: {
            data: ApplicationUpdateInput
            where: ApplicationWhereUniqueInput
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<Application | null>
    deleteCountryCode: (
        args: { where: CountryCodeWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<CountryCode | null>
    deleteIdentifier: (
        args: { where: IdentifierWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<Identifier | null>
    deletePhoneNumber: (
        args: { where: PhoneNumberWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<PhoneNumber | null>
    deleteUser: (
        args: { where: UserWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<User | null>
    deleteVerificationCode: (
        args: { where: VerificationCodeWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<VerificationCode | null>
    deleteApplication: (
        args: { where: ApplicationWhereUniqueInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<Application | null>
    upsertCountryCode: (
        args: {
            where: CountryCodeWhereUniqueInput
            create: CountryCodeCreateInput
            update: CountryCodeUpdateInput
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<CountryCode>
    upsertIdentifier: (
        args: {
            where: IdentifierWhereUniqueInput
            create: IdentifierCreateInput
            update: IdentifierUpdateInput
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<Identifier>
    upsertPhoneNumber: (
        args: {
            where: PhoneNumberWhereUniqueInput
            create: PhoneNumberCreateInput
            update: PhoneNumberUpdateInput
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<PhoneNumber>
    upsertUser: (
        args: {
            where: UserWhereUniqueInput
            create: UserCreateInput
            update: UserUpdateInput
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<User>
    upsertVerificationCode: (
        args: {
            where: VerificationCodeWhereUniqueInput
            create: VerificationCodeCreateInput
            update: VerificationCodeUpdateInput
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<VerificationCode>
    upsertApplication: (
        args: {
            where: ApplicationWhereUniqueInput
            create: ApplicationCreateInput
            update: ApplicationUpdateInput
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<Application>
    updateManyCountryCodes: (
        args: { data: CountryCodeUpdateInput; where?: CountryCodeWhereInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<BatchPayload>
    updateManyIdentifiers: (
        args: { data: IdentifierUpdateInput; where?: IdentifierWhereInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<BatchPayload>
    updateManyPhoneNumbers: (
        args: { data: PhoneNumberUpdateInput; where?: PhoneNumberWhereInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<BatchPayload>
    updateManyUsers: (
        args: { data: UserUpdateInput; where?: UserWhereInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<BatchPayload>
    updateManyVerificationCodes: (
        args: {
            data: VerificationCodeUpdateInput
            where?: VerificationCodeWhereInput
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<BatchPayload>
    updateManyApplications: (
        args: { data: ApplicationUpdateInput; where?: ApplicationWhereInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<BatchPayload>
    updateManyApplicationCredentialses: (
        args: {
            data: ApplicationCredentialsUpdateInput
            where?: ApplicationCredentialsWhereInput
        },
        info?: GraphQLResolveInfo | string,
    ) => Promise<BatchPayload>
    deleteManyCountryCodes: (
        args: { where?: CountryCodeWhereInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<BatchPayload>
    deleteManyIdentifiers: (
        args: { where?: IdentifierWhereInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<BatchPayload>
    deleteManyPhoneNumbers: (
        args: { where?: PhoneNumberWhereInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<BatchPayload>
    deleteManyUsers: (
        args: { where?: UserWhereInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<BatchPayload>
    deleteManyVerificationCodes: (
        args: { where?: VerificationCodeWhereInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<BatchPayload>
    deleteManyApplications: (
        args: { where?: ApplicationWhereInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<BatchPayload>
    deleteManyApplicationCredentialses: (
        args: { where?: ApplicationCredentialsWhereInput },
        info?: GraphQLResolveInfo | string,
    ) => Promise<BatchPayload>
}

export type Subscription = {
    countryCode: (
        args: { where?: CountryCodeSubscriptionWhereInput },
        infoOrQuery?: GraphQLResolveInfo | string,
    ) => Promise<AsyncIterator<CountryCodeSubscriptionPayload>>
    identifier: (
        args: { where?: IdentifierSubscriptionWhereInput },
        infoOrQuery?: GraphQLResolveInfo | string,
    ) => Promise<AsyncIterator<IdentifierSubscriptionPayload>>
    phoneNumber: (
        args: { where?: PhoneNumberSubscriptionWhereInput },
        infoOrQuery?: GraphQLResolveInfo | string,
    ) => Promise<AsyncIterator<PhoneNumberSubscriptionPayload>>
    user: (
        args: { where?: UserSubscriptionWhereInput },
        infoOrQuery?: GraphQLResolveInfo | string,
    ) => Promise<AsyncIterator<UserSubscriptionPayload>>
    verificationCode: (
        args: { where?: VerificationCodeSubscriptionWhereInput },
        infoOrQuery?: GraphQLResolveInfo | string,
    ) => Promise<AsyncIterator<VerificationCodeSubscriptionPayload>>
    application: (
        args: { where?: ApplicationSubscriptionWhereInput },
        infoOrQuery?: GraphQLResolveInfo | string,
    ) => Promise<AsyncIterator<ApplicationSubscriptionPayload>>
    applicationCredentials: (
        args: { where?: ApplicationCredentialsSubscriptionWhereInput },
        infoOrQuery?: GraphQLResolveInfo | string,
    ) => Promise<AsyncIterator<ApplicationCredentialsSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
    constructor({
        endpoint,
        secret,
        fragmentReplacements,
        debug,
    }: BasePrismaOptions) {
        super({ typeDefs, endpoint, secret, fragmentReplacements, debug })
    }

    exists = {
        CountryCode: (where: CountryCodeWhereInput): Promise<boolean> =>
            super.existsDelegate(
                'query',
                'countryCodes',
                { where },
                {},
                '{ id }',
            ),
        Identifier: (where: IdentifierWhereInput): Promise<boolean> =>
            super.existsDelegate(
                'query',
                'identifiers',
                { where },
                {},
                '{ id }',
            ),
        PhoneNumber: (where: PhoneNumberWhereInput): Promise<boolean> =>
            super.existsDelegate(
                'query',
                'phoneNumbers',
                { where },
                {},
                '{ id }',
            ),
        User: (where: UserWhereInput): Promise<boolean> =>
            super.existsDelegate('query', 'users', { where }, {}, '{ id }'),
        VerificationCode: (
            where: VerificationCodeWhereInput,
        ): Promise<boolean> =>
            super.existsDelegate(
                'query',
                'verificationCodes',
                { where },
                {},
                '{ id }',
            ),
        Application: (where: ApplicationWhereInput): Promise<boolean> =>
            super.existsDelegate(
                'query',
                'applications',
                { where },
                {},
                '{ id }',
            ),
        ApplicationCredentials: (
            where: ApplicationCredentialsWhereInput,
        ): Promise<boolean> =>
            super.existsDelegate(
                'query',
                'applicationCredentialses',
                { where },
                {},
                '{ id }',
            ),
    }

    query: Query = {
        countryCodes: (args, info): Promise<CountryCode[]> =>
            super.delegate('query', 'countryCodes', args, {}, info),
        identifiers: (args, info): Promise<Identifier[]> =>
            super.delegate('query', 'identifiers', args, {}, info),
        phoneNumbers: (args, info): Promise<PhoneNumber[]> =>
            super.delegate('query', 'phoneNumbers', args, {}, info),
        users: (args, info): Promise<User[]> =>
            super.delegate('query', 'users', args, {}, info),
        verificationCodes: (args, info): Promise<VerificationCode[]> =>
            super.delegate('query', 'verificationCodes', args, {}, info),
        applications: (args, info): Promise<Application[]> =>
            super.delegate('query', 'applications', args, {}, info),
        applicationCredentialses: (
            args,
            info,
        ): Promise<ApplicationCredentials[]> =>
            super.delegate('query', 'applicationCredentialses', args, {}, info),
        countryCode: (args, info): Promise<CountryCode | null> =>
            super.delegate('query', 'countryCode', args, {}, info),
        identifier: (args, info): Promise<Identifier | null> =>
            super.delegate('query', 'identifier', args, {}, info),
        phoneNumber: (args, info): Promise<PhoneNumber | null> =>
            super.delegate('query', 'phoneNumber', args, {}, info),
        user: (args, info): Promise<User | null> =>
            super.delegate('query', 'user', args, {}, info),
        verificationCode: (args, info): Promise<VerificationCode | null> =>
            super.delegate('query', 'verificationCode', args, {}, info),
        application: (args, info): Promise<Application | null> =>
            super.delegate('query', 'application', args, {}, info),
        countryCodesConnection: (args, info): Promise<CountryCodeConnection> =>
            super.delegate('query', 'countryCodesConnection', args, {}, info),
        identifiersConnection: (args, info): Promise<IdentifierConnection> =>
            super.delegate('query', 'identifiersConnection', args, {}, info),
        phoneNumbersConnection: (args, info): Promise<PhoneNumberConnection> =>
            super.delegate('query', 'phoneNumbersConnection', args, {}, info),
        usersConnection: (args, info): Promise<UserConnection> =>
            super.delegate('query', 'usersConnection', args, {}, info),
        verificationCodesConnection: (
            args,
            info,
        ): Promise<VerificationCodeConnection> =>
            super.delegate(
                'query',
                'verificationCodesConnection',
                args,
                {},
                info,
            ),
        applicationsConnection: (args, info): Promise<ApplicationConnection> =>
            super.delegate('query', 'applicationsConnection', args, {}, info),
        applicationCredentialsesConnection: (
            args,
            info,
        ): Promise<ApplicationCredentialsConnection> =>
            super.delegate(
                'query',
                'applicationCredentialsesConnection',
                args,
                {},
                info,
            ),
        node: (args, info): Promise<Node | null> =>
            super.delegate('query', 'node', args, {}, info),
    }

    mutation: Mutation = {
        createCountryCode: (args, info): Promise<CountryCode> =>
            super.delegate('mutation', 'createCountryCode', args, {}, info),
        createIdentifier: (args, info): Promise<Identifier> =>
            super.delegate('mutation', 'createIdentifier', args, {}, info),
        createPhoneNumber: (args, info): Promise<PhoneNumber> =>
            super.delegate('mutation', 'createPhoneNumber', args, {}, info),
        createUser: (args, info): Promise<User> =>
            super.delegate('mutation', 'createUser', args, {}, info),
        createVerificationCode: (args, info): Promise<VerificationCode> =>
            super.delegate(
                'mutation',
                'createVerificationCode',
                args,
                {},
                info,
            ),
        createApplication: (args, info): Promise<Application> =>
            super.delegate('mutation', 'createApplication', args, {}, info),
        createApplicationCredentials: (
            args,
            info,
        ): Promise<ApplicationCredentials> =>
            super.delegate(
                'mutation',
                'createApplicationCredentials',
                args,
                {},
                info,
            ),
        updateCountryCode: (args, info): Promise<CountryCode | null> =>
            super.delegate('mutation', 'updateCountryCode', args, {}, info),
        updateIdentifier: (args, info): Promise<Identifier | null> =>
            super.delegate('mutation', 'updateIdentifier', args, {}, info),
        updatePhoneNumber: (args, info): Promise<PhoneNumber | null> =>
            super.delegate('mutation', 'updatePhoneNumber', args, {}, info),
        updateUser: (args, info): Promise<User | null> =>
            super.delegate('mutation', 'updateUser', args, {}, info),
        updateVerificationCode: (
            args,
            info,
        ): Promise<VerificationCode | null> =>
            super.delegate(
                'mutation',
                'updateVerificationCode',
                args,
                {},
                info,
            ),
        updateApplication: (args, info): Promise<Application | null> =>
            super.delegate('mutation', 'updateApplication', args, {}, info),
        deleteCountryCode: (args, info): Promise<CountryCode | null> =>
            super.delegate('mutation', 'deleteCountryCode', args, {}, info),
        deleteIdentifier: (args, info): Promise<Identifier | null> =>
            super.delegate('mutation', 'deleteIdentifier', args, {}, info),
        deletePhoneNumber: (args, info): Promise<PhoneNumber | null> =>
            super.delegate('mutation', 'deletePhoneNumber', args, {}, info),
        deleteUser: (args, info): Promise<User | null> =>
            super.delegate('mutation', 'deleteUser', args, {}, info),
        deleteVerificationCode: (
            args,
            info,
        ): Promise<VerificationCode | null> =>
            super.delegate(
                'mutation',
                'deleteVerificationCode',
                args,
                {},
                info,
            ),
        deleteApplication: (args, info): Promise<Application | null> =>
            super.delegate('mutation', 'deleteApplication', args, {}, info),
        upsertCountryCode: (args, info): Promise<CountryCode> =>
            super.delegate('mutation', 'upsertCountryCode', args, {}, info),
        upsertIdentifier: (args, info): Promise<Identifier> =>
            super.delegate('mutation', 'upsertIdentifier', args, {}, info),
        upsertPhoneNumber: (args, info): Promise<PhoneNumber> =>
            super.delegate('mutation', 'upsertPhoneNumber', args, {}, info),
        upsertUser: (args, info): Promise<User> =>
            super.delegate('mutation', 'upsertUser', args, {}, info),
        upsertVerificationCode: (args, info): Promise<VerificationCode> =>
            super.delegate(
                'mutation',
                'upsertVerificationCode',
                args,
                {},
                info,
            ),
        upsertApplication: (args, info): Promise<Application> =>
            super.delegate('mutation', 'upsertApplication', args, {}, info),
        updateManyCountryCodes: (args, info): Promise<BatchPayload> =>
            super.delegate(
                'mutation',
                'updateManyCountryCodes',
                args,
                {},
                info,
            ),
        updateManyIdentifiers: (args, info): Promise<BatchPayload> =>
            super.delegate('mutation', 'updateManyIdentifiers', args, {}, info),
        updateManyPhoneNumbers: (args, info): Promise<BatchPayload> =>
            super.delegate(
                'mutation',
                'updateManyPhoneNumbers',
                args,
                {},
                info,
            ),
        updateManyUsers: (args, info): Promise<BatchPayload> =>
            super.delegate('mutation', 'updateManyUsers', args, {}, info),
        updateManyVerificationCodes: (args, info): Promise<BatchPayload> =>
            super.delegate(
                'mutation',
                'updateManyVerificationCodes',
                args,
                {},
                info,
            ),
        updateManyApplications: (args, info): Promise<BatchPayload> =>
            super.delegate(
                'mutation',
                'updateManyApplications',
                args,
                {},
                info,
            ),
        updateManyApplicationCredentialses: (
            args,
            info,
        ): Promise<BatchPayload> =>
            super.delegate(
                'mutation',
                'updateManyApplicationCredentialses',
                args,
                {},
                info,
            ),
        deleteManyCountryCodes: (args, info): Promise<BatchPayload> =>
            super.delegate(
                'mutation',
                'deleteManyCountryCodes',
                args,
                {},
                info,
            ),
        deleteManyIdentifiers: (args, info): Promise<BatchPayload> =>
            super.delegate('mutation', 'deleteManyIdentifiers', args, {}, info),
        deleteManyPhoneNumbers: (args, info): Promise<BatchPayload> =>
            super.delegate(
                'mutation',
                'deleteManyPhoneNumbers',
                args,
                {},
                info,
            ),
        deleteManyUsers: (args, info): Promise<BatchPayload> =>
            super.delegate('mutation', 'deleteManyUsers', args, {}, info),
        deleteManyVerificationCodes: (args, info): Promise<BatchPayload> =>
            super.delegate(
                'mutation',
                'deleteManyVerificationCodes',
                args,
                {},
                info,
            ),
        deleteManyApplications: (args, info): Promise<BatchPayload> =>
            super.delegate(
                'mutation',
                'deleteManyApplications',
                args,
                {},
                info,
            ),
        deleteManyApplicationCredentialses: (
            args,
            info,
        ): Promise<BatchPayload> =>
            super.delegate(
                'mutation',
                'deleteManyApplicationCredentialses',
                args,
                {},
                info,
            ),
    }

    subscription: Subscription = {
        countryCode: (
            args,
            infoOrQuery,
        ): Promise<AsyncIterator<CountryCodeSubscriptionPayload>> =>
            super.delegateSubscription('countryCode', args, {}, infoOrQuery),
        identifier: (
            args,
            infoOrQuery,
        ): Promise<AsyncIterator<IdentifierSubscriptionPayload>> =>
            super.delegateSubscription('identifier', args, {}, infoOrQuery),
        phoneNumber: (
            args,
            infoOrQuery,
        ): Promise<AsyncIterator<PhoneNumberSubscriptionPayload>> =>
            super.delegateSubscription('phoneNumber', args, {}, infoOrQuery),
        user: (
            args,
            infoOrQuery,
        ): Promise<AsyncIterator<UserSubscriptionPayload>> =>
            super.delegateSubscription('user', args, {}, infoOrQuery),
        verificationCode: (
            args,
            infoOrQuery,
        ): Promise<AsyncIterator<VerificationCodeSubscriptionPayload>> =>
            super.delegateSubscription(
                'verificationCode',
                args,
                {},
                infoOrQuery,
            ),
        application: (
            args,
            infoOrQuery,
        ): Promise<AsyncIterator<ApplicationSubscriptionPayload>> =>
            super.delegateSubscription('application', args, {}, infoOrQuery),
        applicationCredentials: (
            args,
            infoOrQuery,
        ): Promise<AsyncIterator<ApplicationCredentialsSubscriptionPayload>> =>
            super.delegateSubscription(
                'applicationCredentials',
                args,
                {},
                infoOrQuery,
            ),
    }
}
