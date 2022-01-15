import {
    IsNotEmpty,
    IsString,
    ValidationArguments,
    IsEmail,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import {
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common'

export class AuthDto {
    @IsString()
    @IsEmail(
        {},
        {
            message: (args: ValidationArguments) => {
                throw new BadRequestException(`Invalid email, info:${args}`)
            },
        },
    )
    @IsNotEmpty({
        message: (args: ValidationArguments) => {
            if (
                args.value !== undefined ||
                args.constraints !== undefined ||
                args.value !== null ||
                args.value.length == 0
            ) {
                throw new BadRequestException(`${args.property} Field required`)
            } else {
                throw new InternalServerErrorException()
            }
        },
    })
    @ApiProperty({
        example: 'a@b.com',
        description: 'Email of User',
        required: true,
    })
    email: string

    @IsString()
    @IsNotEmpty({
        message: (args: ValidationArguments) => {
            if (
                args.value !== undefined ||
                args.constraints !== undefined ||
                args.value !== null ||
                args.value.length === 0
            ) {
                throw new BadRequestException(`${args.property} Field required`)
            } else {
                throw new InternalServerErrorException()
            }
        },
    })
    @ApiProperty({
        example: '12345',
        description: 'User Password',
        required: true,
    })
    password: string
}
