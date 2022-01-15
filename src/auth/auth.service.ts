import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { AuthDto } from './auth.dto'
import { RegistrationEntity } from '../registration/registration.entity'
import { CRYPT } from '../constants/constants'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(RegistrationEntity)
        private registrationRepository: Repository<RegistrationEntity>,
        private readonly jwtService: JwtService,
    ) { }

    // Sign In
    async userSignIn(data: AuthDto): Promise<{}> {
        const methodName = `AuthService: userSignIn`

        const { email, password } = data
        const userData = await this.registrationRepository.findOne({
            where: { email: email },
        })
        const validateData = {
            salt: userData.salt,
            hash: password,
            iterations: CRYPT.ITERATIONS,
        }
        if (!userData || !(await userData.verifyPassword(validateData))) {
            Logger.error(
                `Error while Login Invalid username/password`,
                methodName,
            )
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            )
        }

        const payload = { userUid: userData.uid }
        const accessToken = await this.jwtService.sign(payload)

        return {
            statusCode: HttpStatus.OK,
            message: 'Authorization success',
            token: accessToken,
        }
    }
}
