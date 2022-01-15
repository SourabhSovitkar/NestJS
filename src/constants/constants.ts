export const CRYPT = {
    PASSWORD_LENGTH: 32,
    SALT_LENGTH: 16,
    ITERATIONS: 10000,
    DIGEST: 'sha256',
    BYTE_TO_STRING_ENCODING: 'hex',
}

export interface PersistedPassword {
    salt: string
    hash: string
    iterations: number
}
