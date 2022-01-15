import { Module } from '@nestjs/common'
import { RegistrationController } from './registration.controller'
import { RegistrationService } from './registration.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RegistrationEntity } from './registration.entity'

@Module({
    imports: [TypeOrmModule.forFeature([RegistrationEntity])],
    controllers: [RegistrationController],
    providers: [RegistrationService],
})
export class RegistrationModule {}
