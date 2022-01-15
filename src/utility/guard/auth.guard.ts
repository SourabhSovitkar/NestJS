import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const methodName = 'AuthGuard: canActivate'

        const request = context.switchToHttp().getRequest()
        if (!request.headers.authorization) {
            Logger.error(`Error in Authorization Headers`, methodName)
            return false
        }
        const decoded = await this.validateToken(request.headers.authorization)
        request.user = decoded

        return true
    }

    async validateToken(auth: string) {
        const methodName = 'AuthGuard: validateToken'
        if (auth.split(' ')[0] !== 'Bearer') {
            Logger.error(`Error Bearer token not authorize`, methodName)
            throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN)
        }
        const token = auth.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!)
            return decoded
        } catch (err) {
            Logger.error(
                `Error while decoding bearer token, error:${JSON.stringify(
                    err,
                )}`,
                methodName,
            )
            const message = 'Token error: ' + (err.message || err.name)
            throw new HttpException(message, HttpStatus.FORBIDDEN)
        }
    }
}
