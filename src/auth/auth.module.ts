import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RegistrationEntity } from '../registration/registration.entity'
import { JwtStrategy } from './jwt/jwt.strategy'
import 'dotenv/config'

@Module({
    imports: [
        TypeOrmModule.forFeature([RegistrationEntity]),
        JwtModule.register({
            secret: process.env.JWT_SECRET!,
            signOptions: { expiresIn: 3600 },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
