import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google-auth.strategy';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../db/schemas/user.schema';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    MongooseModule.forFeature([ { name: User.name, schema: UserSchema }]),
  ],
  providers: [GoogleStrategy],
})
export class AuthModule {}
