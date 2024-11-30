import { Post, Logger, Body, Put, Req } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { ApiController } from '@src/common/decorators/api-controller.decorator'
import { ZodValidationPipe } from '@src/common/pipes/zod-input-validation.pipe'
import {
    EmailCheckBodyDto,
    EmailCheckResDto,
    emailCheckSchema,
    LoginResDto,
    SignupBodyDto,
    SignupResDto,
    signupSchema,
    UserUpdateBodyDto,
    UserUpdateResDto,
    userUpdateSchema,
} from './profile.dto'
import {
    ApiAuthenticatedRes,
    // ApiAuthorizedResponse,
    ApiOpenResponse,
    ApiBasicAuthenticatedResponse,
} from '@src/common/decorators/swagger.decorator'
import { ModFasReq } from '@src/utils/auth-payload.util'

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

    @Post('/login')
    @ApiBasicAuthenticatedResponse({ type: LoginResDto })
    async login(@Req() req: ModFasReq): Promise<LoginResDto> {
        return await this.profileService.login(req.userInfo!)
    }

    @Put('/refresh/token')
    @ApiAuthenticatedRes({ type: LoginResDto })
    async refreshToken(@Req() req: ModFasReq): Promise<LoginResDto> {
        return await this.profileService.refreshToken(req.user!)
    }

    @Put('/update-user')
    @ApiAuthenticatedRes({ type: UserUpdateResDto })
    async updateUser(
        @Body(new ZodValidationPipe(userUpdateSchema))
        input: UserUpdateBodyDto,
        @Req() req: ModFasReq,
    ): Promise<UserUpdateResDto> {
        return await this.profileService.UpdateUser(input, req.user!)
    }

    // @Get('/protected-route')
    // @ApiAuthenticatedRes({ type: SignupResDto })
    // checkMeOut(): string {
    //     this.profileService.checkMeOut()
    //     return 'haha'
    // }

    // @Get('/authorized-route')
    // @ApiAuthorizedResponse({ roles: [Roles.ADMIN] })
    // authorizeMe(): string {
    //     this.profileService.checkMeOut()
    //     return 'haha'
    // }
}
