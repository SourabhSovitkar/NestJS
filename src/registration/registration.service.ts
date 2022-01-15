import {
    Injectable,
    Logger,
    HttpException,
    HttpStatus,
    BadRequestException,
} from '@nestjs/common'
import { Like, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { RegistrationDto } from './dto/registration.dto'
import { RegistrationEntity } from './registration.entity'
import * as crypto from 'crypto'
import { CRYPT, PersistedPassword } from './../constants/constants'
import { PaginationDto } from './dto/pagination.dto'
import { UpdateRegistrationDto } from './dto/update-registration.dto'
import { SearchDto } from './dto/search.dto'

@Injectable()
export class RegistrationService {
    constructor(
        @InjectRepository(RegistrationEntity)
        private registrationRepository: Repository<RegistrationEntity>,
    ) { }

    private async hashPassword(password: string): Promise<PersistedPassword> {
        return new Promise<PersistedPassword>((accept, reject) => {
            const salt = crypto.randomBytes(CRYPT.SALT_LENGTH).toString('hex')
            crypto.pbkdf2(
                password,
                salt,
                CRYPT.ITERATIONS,
                CRYPT.PASSWORD_LENGTH,
                CRYPT.DIGEST,
                (error, hash) => {
                    if (error) {
                        reject(error)
                    } else {
                        accept({
                            salt,
                            hash: hash.toString('hex'),
                            iterations: CRYPT.ITERATIONS,
                        })
                    }
                },
            )
        })
    }

    async createRegistration(data: RegistrationDto): Promise<{}> {
        const methodName = `RegistrationService: userRegistration`
        const uniqueEmail = await this.registrationRepository.findOne({
            where: { email: data.email },
        })
        Logger.debug(
            `Registration with Email Details: ${JSON.stringify(uniqueEmail)}`,
            methodName,
        )
        if (uniqueEmail) {
            throw new HttpException(
                'Email already exist',
                HttpStatus.BAD_REQUEST,
            )
        }

        const uniqueMobileNo = await this.registrationRepository.findOne({
            where: { mobileNo: data.mobileNo },
        })
        Logger.debug(
            `Registration with Mobile Number Details:${JSON.stringify(
                uniqueMobileNo,
            )}`,
            methodName,
        )
        if (uniqueMobileNo) {
            throw new BadRequestException('Phone number already exists')
        }

        try {
            const hashUserPassword: PersistedPassword = await this.hashPassword(
                data.password,
            )

            const createRegistration = await this.registrationRepository.create(
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashUserPassword.hash,
                    mobileNo: data.mobileNo,
                    address: data.address,
                    salt: hashUserPassword.salt,
                },
            )
            Logger.log(
                `Create Registration:${JSON.stringify(createRegistration)}`,
                methodName,
            )

            const saveRegistration = await this.registrationRepository.save(
                createRegistration,
            )
            Logger.log(
                `Save Registration:${JSON.stringify(saveRegistration)}`,
                methodName,
            )

            return {
                statusCode: HttpStatus.CREATED,
                message: 'Registration Successfully',
                data: saveRegistration,
            }
        } catch (err) {
            Logger.error(
                `Error while creating Registration:${JSON.stringify(err)}`,
                methodName,
            )
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getAllRegistrations(queryParam: PaginationDto): Promise<{}> {
        const methodName = `RegistrationService: getAllRegistrations`
        Logger.debug(
            `Get all Registration Details by row count: ${queryParam.take} and offset: ${queryParam.skip}`,
            methodName,
        )
        try {
            const [getRegistrations, count] =
                await this.registrationRepository.findAndCount({
                    select: [
                        'uid',
                        'firstName',
                        'lastName',
                        'email',
                        'mobileNo',
                        'address',
                    ],
                    order: {
                        id: 'ASC',
                    },
                    take: queryParam.take,
                    skip: queryParam.skip,
                })

            if (getRegistrations.length > 0) {
                Logger.log(
                    `All Registration Details fetched Successfully`,
                    methodName,
                )
                return {
                    statusCode: HttpStatus.OK,
                    message: 'List of Registrations',
                    payload: getRegistrations,
                    total: count,
                }
            } else {
                throw new HttpException('No Content', HttpStatus.NO_CONTENT)
            }
        } catch (error) {
            Logger.error(
                `Error while fetching Registration details:${JSON.stringify(error)}`,
                methodName,
            )
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async updateUserDetails(data: UpdateRegistrationDto, user: any): Promise<{}> {
        const methodName = `RegistrationService: updateUserDetails`

        const { firstName, lastName, mobileNo, address } = data
        const updateRegistrationData = { firstName, lastName, mobileNo, address };

        try {
            const updateUser = await this.registrationRepository.update({ uid: user.userUid }, updateRegistrationData)
            Logger.log(`Profile Updated Successfully`, methodName)
            return {
                statusCode: HttpStatus.OK,
                message: 'Profile Updated Successfully',
                data: updateUser
            }
        } catch (error) {
            Logger.error(
                `Error while updating Registration details:${JSON.stringify(error)}`,
                methodName,
            )
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }

    async searchDetails(queryParam: SearchDto) {
        const methodName = `RegistrationService: getAllRegistrations`
        let firstName: string, lastName: string, email: string, mobileNo: string, address: string
        if (queryParam !== undefined) {
            firstName = queryParam.firstName !== undefined ? queryParam.firstName : '';
            lastName = queryParam.lastName !== undefined ? queryParam.lastName : '';
            email = queryParam.email !== undefined ? queryParam.email : '';
            mobileNo = queryParam.mobileNo !== undefined ? queryParam.mobileNo : '';
            address = queryParam.address !== undefined ? queryParam.address : '';
        }
        Logger.debug(
            `Get all Registration Details by Query Params: ${JSON.stringify(queryParam)} and row count: ${queryParam.take} and offset: ${queryParam.skip}`,
            methodName,
        )

        const [searchData, count] = await this.registrationRepository.find({
            select: [
                'uid',
                'firstName',
                'lastName',
                'email',
                'mobileNo',
                'address',
            ],
            order: {
                id: 'ASC',
            },
            take: queryParam.take,
            skip: queryParam.skip,
            where: {
                firstName: Like(`%${firstName}%`),
                lastName: Like(`%${lastName}%`),
                email: Like(`%${email}%`),
                mobileNo: Like(`%${mobileNo}%`),
                address: Like(`%${address}%`)
            }
        })

        Logger.log(
            `All Registration Details fetched Successfully`,
            methodName,
        )
        return {
            statusCode: HttpStatus.OK,
            message: 'Search in Registrations',
            payload: searchData,
            total: count,
        }

    }
}
