import * as modules from '@modules';
import { UserModule } from '@modules';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { GlobalModule } from './global.module';

@Module({
  imports: [
    GlobalModule,

    ...Object.values(modules),

    RouterModule.register([
      {
        path: '/user',
        module: UserModule,
      },
    ]),
  ],
})
export class AppModule {}
