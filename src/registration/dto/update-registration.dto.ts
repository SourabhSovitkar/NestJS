import {
    MinLength,
    ValidationArguments,
    IsString,
    IsNotEmpty,
    Matches,
    Length,
} from 'class-validator'
import {
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateRegistrationDto {
    @MinLength(2, {
        message: (args: ValidationArguments) => {
            if (args.value.length < 3) {
                throw new BadRequestException(
                    `${args.property} length should be min 2`,
                )
            } else {
                throw new InternalServerErrorException()
            }
        },
    })
    @IsString()
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
        example: 'First Name',
        description: 'First Name of User',
        required: true,
    })
    firstName: string

    @IsString()
    @MinLength(2, {
        message: (args: ValidationArguments) => {
            if (args.value.length < 3) {
                throw new BadRequestException(
                    `${args.property} length should be min 2`,
                )
            } else {
                throw new InternalServerErrorException()
            }
        },
    })
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
        example: 'Last Name',
        description: 'Last Name of User',
        required: true,
    })
    lastName: string

    @IsString()
    @Matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, {
        message: (args: ValidationArguments) => {
            if (args.value !== /^\+(?:[0-9] ?){6,14}[0-9]$/) {
                throw new BadRequestException(
                    `${args.value} Not a Phone Number`,
                )
            } else {
                throw new InternalServerErrorException()
            }
        },
    })
    @Length(12, 14, {
        message: (args: ValidationArguments) => {
            if (args.value.length < 12 || args.value.length > 14) {
                throw new BadRequestException(
                    `${args.value} Wrong Phone Number`,
                )
            } else {
                throw new InternalServerErrorException()
            }
        },
    })
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
        example: '+911010101010',
        description: 'Unique(with +91) 10 digit mobile number of User',
        uniqueItems: true,
        required: true,
    })
    mobileNo: string


    @IsString()
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
        example: ' EU01, AB street, 123',
        description: 'Address of user',
    })
    address: string
}
