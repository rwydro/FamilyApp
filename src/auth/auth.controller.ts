import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('oauth2/google')
export class AuthController {

  @Get('')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // This method redirect user to GoogleAuth
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return req.user;
  }
}
