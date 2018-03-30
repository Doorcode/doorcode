import * as uuid from 'uuid/v1'

export default class Identity {
    static generateUUID() {
        return uuid()
    }
}
