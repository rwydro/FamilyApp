import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {UsersModule} from "./users/users.module";
import {DevtoolsModule} from "@nestjs/devtools-integration";
import { Connection } from 'mongoose';
import { TasksModule } from './tasks/tasks.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/familyDB',
      {
        onConnectionCreate: (connection: Connection) => {
            connection.on('connected', (event) => console.log('connected', event));
            connection.on('open', () => console.log('open'));
            connection.on('disconnected', () => console.log('disconnected'));
            connection.on('reconnected', () => console.log('reconnected'));
            connection.on('disconnecting', () => console.log('disconnecting'));
            return connection;
          }
        }
      ),
    UsersModule,
    TasksModule,
    DbModule
  ]
})
export class AppModule {}
