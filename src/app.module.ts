import { Module } from '@nestjs/common';
import {UsersModule} from "./users/users.module";
import {DevtoolsModule} from "@nestjs/devtools-integration";

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
      UsersModule
  ]
})
export class AppModule {}
