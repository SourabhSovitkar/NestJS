import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { RegistrationEntity } from '../../registration/registration.entity'
import 'dotenv/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(RegistrationEntity)
        private registrationRepository: Repository<RegistrationEntity>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET!,
        })
    }

    async validate(email: string) {
        const methodName = 'JwtStrategy: validate'
        const user = await this.registrationRepository.findOne({ email: email })
        if (!user) {
            Logger.error(`Error while validating username`, methodName)
            throw new UnauthorizedException()
        }
        return user
    }
}
