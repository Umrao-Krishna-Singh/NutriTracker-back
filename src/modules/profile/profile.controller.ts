import { Get, UsePipes, Logger, Body } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { ApiController } from '@src/common/decorators/api-controller.decorator'
import { SignupValPipe } from './profile.pipe'
import { UserOptionalDefaults } from '@prism/zod'
import { UserResponseDto } from './profile.dto'

@ApiController('profile')
export class ProfileController {
    private readonly logger: Logger
    constructor(private readonly profileService: ProfileService) {
        this.logger = new Logger(ProfileController.name)
    }

    @Get('/test')
    async getHello(): Promise<'Success from backend!'> {
        this.logger.log('request received')

        return await this.profileService.getHello()
    }

    @Get('/signup')
    @UsePipes(SignupValPipe)
    async signup(@Body() user: UserOptionalDefaults): Promise<UserResponseDto> {
        this.logger.log('request received')
        const userInfo = await this.profileService.signup(user)
        return userInfo
    }
}
