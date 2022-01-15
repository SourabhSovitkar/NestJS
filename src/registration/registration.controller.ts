import {
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
    UseGuards,
    HttpStatus,
    Body,
    Get,
    HttpCode,
    Query,
    Put,
    Param,
    Logger,
} from '@nestjs/common'
import {
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
    ApiTags,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiUnauthorizedResponse,
    ApiQuery,
} from '@nestjs/swagger'
import { RegistrationService } from './registration.service'
import { RegistrationDto } from './dto/registration.dto'
import { AuthGuard } from '../utility/guard/auth.guard'
import { PaginationDto } from './dto/pagination.dto'
// import { GetUserProfile } from '../utility/decorators/getUserProfile.decorator'
import { UpdateRegistrationDto } from './dto/update-registration.dto'
import { GetUserDetails } from 'src/utility/decorators/getUserDetails.decorate'
import { SearchDto } from './dto/search.dto'

@ApiTags('Registration')
@Controller('registration')
export class RegistrationController {
    constructor(private readonly registrationService: RegistrationService) { }

    // Create User Registration
    @ApiOperation({ summary: 'Create User Registration' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Registration Successfully',
    })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Bad Request',
    })
    @Post('/')
    @UsePipes(ValidationPipe)
    async addCustomer(@Body() data: RegistrationDto) {
        return this.registrationService.createRegistration(data)
    }

    // Get All Registered  user
    @ApiOperation({ summary: 'Get all User Registrations' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get All User Registrations Info',
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    @ApiForbiddenResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
    })
    @ApiNoContentResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'No Content',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('/')
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.OK)
    async registrationList(@Query() query: PaginationDto) {
        return this.registrationService.getAllRegistrations(query)
    }


    // Update Registered User Info
    @ApiOperation({ summary: 'Update User details about Registration' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Successfully Updated User Registration Info',
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    @ApiForbiddenResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
    })
    @ApiNoContentResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'No Content',
    })
    @ApiBearerAuth()
    @Put('/user')
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.OK)
    async updateRegistration(
        @Body() data: UpdateRegistrationDto,
        @GetUserDetails() user: any
    ): Promise<{}> {
        return this.registrationService.updateUserDetails(data, user)
    }


    // Search API 
    @ApiOperation({ summary: 'Get all User Registrations' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get All User Registrations Info',
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    @ApiForbiddenResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
    })
    @ApiNoContentResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'No Content',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('/search')
    @UsePipes(ValidationPipe)
    @HttpCode(HttpStatus.OK)
    async searchDetailss(@Query() query: SearchDto) {
        return this.registrationService.searchDetails(query)
    }
}
