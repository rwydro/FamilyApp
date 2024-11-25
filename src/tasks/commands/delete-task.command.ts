export class DeleteTaskCommand {
  constructor(
    public readonly taskId: string
  ) {
  }
}

export class DeleteTaskCommandResult {
  constructor(
    public readonly taskId: string
  ) {
  }
}