import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    Generated,
} from 'typeorm'
import * as crypto from 'crypto'
import { CRYPT, PersistedPassword } from '../constants/constants'

@Entity('registration')
@Unique(['email'])
@Unique(['mobileNo'])
export class RegistrationEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @Column()
    @Generated('uuid')
    uid: string

    @Column({ type: 'varchar', length: 75 })
    firstName: string

    @Column({ type: 'varchar', length: 75 })
    lastName: string

    @Column({ type: 'varchar', length: 50 })
    email: string

    @Column({ type: 'varchar', length: 100 })
    password: string

    @Column({ type: 'varchar', length: 20 })
    mobileNo: string

    @Column({ type: 'text', default: null, nullable: true })
    address: string

    @Column()
    salt: string

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP()',
        select: false,
    })
    createdAt: Date

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP()',
        onUpdate: 'CURRENT_TIMESTAMP()',
        select: false,
    })
    updatedAt: Date

    // async validatePassword(password: string): Promise<boolean> {
    //     const hash = await bcrypt.hash(password, this.salt);
    //     return hash === this.password;
    // }

    async verifyPassword(
        persistedPassword: PersistedPassword,
    ): Promise<boolean> {
        return new Promise<boolean>((accept, reject) => {
            crypto.pbkdf2(
                persistedPassword.hash,
                persistedPassword.salt,
                persistedPassword.iterations,
                CRYPT.PASSWORD_LENGTH,
                CRYPT.DIGEST,
                (error, hash) => {
                    if (error) {
                        reject(error)
                    } else {
                        accept(this.password === hash.toString('hex'))
                    }
                },
            )
        })
    }
}
