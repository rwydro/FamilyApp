import { Module } from '@nestjs/common';
import {UsersModule} from "./users/users.module";
import {DevtoolsModule} from "@nestjs/devtools-integration";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
      UsersModule
  ]
})
export class AppModule {}
