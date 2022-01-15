import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { RegistrationModule } from './registration/registration.module'
import { dbConfig } from './config/db.config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [TypeOrmModule.forRoot(dbConfig), AuthModule, RegistrationModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
