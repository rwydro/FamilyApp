export class CreateUserCommand {
    constructor(
        public readonly email: string,
        public readonly name: string,
        public readonly password: string,
        public readonly description: string,
    ) {}
}

export class CreateUserCommandResult {
    constructor(
      public readonly userId: string,
      public readonly name: string,
      public readonly email: string,
      public readonly description: string,
    ){}
}