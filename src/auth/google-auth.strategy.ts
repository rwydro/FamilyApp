import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../db/schemas/user.schema';
import { Model } from 'mongoose';
import { AuthenticationUserDto } from './dtos';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8888/oauth2/google/callback',
      scope: ['openid', 'email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<AuthenticationUserDto> {
    const { name, emails, photos } = profile;
    const userFromDb = await this.userModel.findOne({email: emails[0].value})
    const user = {
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      accessToken,
      isExistingUser: !!userFromDb
    };
    return done(null, user);
  }
}
