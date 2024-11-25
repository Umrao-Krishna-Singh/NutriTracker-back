import { Post, Get, Logger, Body } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { ApiController } from '@src/common/decorators/api-controller.decorator'
import { ZodValidationPipe } from '@src/common/pipes/zod-input-validation.pipe'
import {
    EmailCheckBodyDto,
    EmailCheckResDto,
    emailCheckSchema,
    SignupBodyDto,
    SignupResDto,
    signupSchema,
} from './profile.dto'
import {
    ApiAuthenticatedResponse,
    ApiAuthorizedResponse,
    ApiOpenResponse,
} from '@src/common/decorators/swagger.decorator'
import { Roles } from '@prism/keysley/enums'

@ApiController('profile')
export class ProfileController {
    private readonly logger = new Logger(ProfileController.name)
    constructor(private readonly profileService: ProfileService) {}

    @Post('/check-email')
    @ApiOpenResponse({ type: EmailCheckResDto })
    async checkEmail(
        @Body(new ZodValidationPipe(emailCheckSchema))
        input: EmailCheckBodyDto,
    ): Promise<EmailCheckResDto> {
        return await this.profileService.checkEmail(input.email)
    }

    @Post('/signup')
    @ApiOpenResponse({ type: SignupResDto })
    async signup(
        @Body(new ZodValidationPipe(signupSchema))
        input: SignupBodyDto,
    ): Promise<SignupResDto> {
        return await this.profileService.signup(input)
    }

    @Get('/protected-route')
    @ApiAuthenticatedResponse({ type: SignupResDto })
    checkMeOut(): string {
        this.profileService.checkMeOut()
        return 'no haha'
    }

    @Get('/authorized-route')
    @ApiAuthorizedResponse({ roles: [Roles.ADMIN] })
    authorizeMe(): string {
        this.profileService.checkMeOut()
        return 'haha'
    }
}
