import {
    Controller,
    HttpStatus,
    Post,
    UsePipes,
    ValidationPipe,
    Body,
    HttpCode,
} from '@nestjs/common'
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
} from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthDto } from './auth.dto'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Customer Login' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Customer Login Api' })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Bad Request',
    })
    @Post('login')
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.OK)
    customerLogin(@Body() data: AuthDto) {
        return this.authService.userSignIn(data)
    }
}
