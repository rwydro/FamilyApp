import { User } from '../../db/schemas/user.schema';

export class GetUsersQuery {}

export class GetUsersQueryResult {
  constructor(
    public readonly Users: User[],
  ) {}
}