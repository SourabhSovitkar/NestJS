import 'dotenv/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { RegistrationEntity } from '../registration/registration.entity'

export const dbConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [RegistrationEntity],
    retryAttempts: 10,
    retryDelay: 3000,
    synchronize: true,
    logging: ['query', 'error', 'schema', 'warn', 'info', 'log', 'migration'],
}
