export class AuthenticationUserDto {
  constructor(
    private readonly email: string,
    private readonly name: string,
    private readonly picture: string,
    private readonly accessToken: string,
    private readonly isExistingUser: boolean = false,
  ) {
  }
}