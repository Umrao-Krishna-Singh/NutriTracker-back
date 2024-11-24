import { Module } from '@nestjs/common'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'
import { JwtModule } from '@nestjs/jwt'
import { ENV } from '@src/app.config'

@Module({
    imports: [JwtModule.register({ secret: ENV.JWT_SECRET })],
    controllers: [ProfileController],
    providers: [ProfileService],
})
export class ProfileModule {}
