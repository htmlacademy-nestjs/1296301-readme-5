import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/blog/models';
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { MessageRepository } from "./message.repository";

@Module({
  imports: [PrismaClientModule],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
  exports: [MessageRepository]
})
export class MessageModule {}
