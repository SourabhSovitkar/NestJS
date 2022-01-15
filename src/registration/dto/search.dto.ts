import { BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, ValidationArguments } from 'class-validator'

export class SearchDto {

    @ApiProperty({
        example: 'First Name',
        description: 'First Name of User',
        required: false
    })
    firstName?: string

    @ApiProperty({
        example: 'Last Name',
        description: 'Last Name of User',
        required: false
    })
    lastName?: string


    @ApiProperty({
        example: 'a@b.com',
        description: ' Email Id of User',
        required: false
    })
    email?: string

    @ApiProperty({
        example: '+911010101010',
        description: 'Mobile number of User',
        required: false
    })
    mobileNo?: string

    @ApiProperty({
        example: ' EU01, AB street, 123',
        description: 'Address of user',
        required: false,
    })
    address: string

    @ApiProperty({
        example: '10',
        description:
            'limit (row_count) max number of entities that should be taken',
        required: true,
    })
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
    take: number

    @ApiProperty({
        example: '0',
        description: 'offset (skips_rows) from where entities should be taken',
        required: true,
    })
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
    skip: number
}
