import { Controller, Get, Param, Post, Delete, Patch, Query, HttpCode, HttpStatus } from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from "./dto/update-message.dto";
import { MessageRdo } from "./rdo/message.rdo";
import { fillDto } from '@project/shared/helpers';
import { MessageService } from "./message.service";
import { MessageQuery } from "./query/message.query";

@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
  ) {}

  @Get('/:id')
  async show(@Param('id') id: string) {
    const comment = await this.messageService.getMessage(id);

    return fillDto(MessageRdo, comment.toPOJO());
  }

  @Get('/')
  async index(@Query() query: MessageQuery) {
    const comments = await this.messageService.getMessages(query);

    return fillDto(MessageRdo, comments.map((comment) => comment.toPOJO()));
  }

  @Post('/')
  async create(dto: CreateMessageDto) {
    const newComment = await this.messageService.createMessage(dto);

    return fillDto(MessageRdo, newComment.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    await this.messageService.deleteMessage(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, dto: UpdateMessageDto) {
    const updatedComment = await this.messageService.updateMessage(id, dto);

    return fillDto(MessageRdo, updatedComment.toPOJO());
  }
}
