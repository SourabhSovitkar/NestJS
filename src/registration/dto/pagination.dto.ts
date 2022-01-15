import {
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, ValidationArguments } from 'class-validator'

export class PaginationDto {
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
