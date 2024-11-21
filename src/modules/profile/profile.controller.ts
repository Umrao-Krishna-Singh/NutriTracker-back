import { Post, Logger, Body } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { ApiController } from '@src/common/decorators/api-controller.decorator'
import { ZodValidationPipe } from '@src/common/pipes/zod-input-validation.pipe'
import { EmailCheckBodyDto, EmailCheckResDto, emailCheckSchema } from './profile.dto'
import { ApiOpenResponse } from '@src/common/decorators/swagger.decorator'

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
}
