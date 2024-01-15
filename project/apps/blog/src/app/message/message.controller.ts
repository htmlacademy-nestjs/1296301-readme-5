import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Post, Delete, Patch, Query, HttpCode, HttpStatus } from '@nestjs/common';

import { fillDto } from '@project/shared/helpers';

import { MessageInfo } from './constants/message.constants';
import { MessageService } from './message.service';
import { MessageQuery } from './query/message.query';

import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRdo } from './rdo/message.rdo';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
  ) {}

  @ApiResponse({
    type: MessageRdo,
    status: HttpStatus.OK,
    description: MessageInfo.Show,
  })
  @Get(':id')
  async show(@Param('id') id: string) {
    const comment = await this.messageService.getMessage(id);

    return fillDto(MessageRdo, comment.toPOJO());
  }

  @ApiResponse({
    type: MessageRdo,
    status: HttpStatus.OK,
    description: MessageInfo.ShowAll,
  })
  @Get('/')
  async index(@Query() query: MessageQuery) {
    const comments = await this.messageService.getMessages(query);

    return fillDto(MessageRdo, comments.map((comment) => comment.toPOJO()));
  }

  @ApiResponse({
    type: MessageRdo,
    status: HttpStatus.CREATED,
    description: MessageInfo.Add,
  })
  @Post('/')
  async create(dto: CreateMessageDto) {
    const newComment = await this.messageService.createMessage(dto, 'userId');

    return fillDto(MessageRdo, newComment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: MessageInfo.Remove,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async destroy(@Param('id') id: string) {
    await this.messageService.deleteMessage(id, 'userId');
  }

  @ApiResponse({
    type: MessageRdo,
    status: HttpStatus.OK,
    description: MessageInfo.Update,
  })
  @Patch(':id')
  async update(@Param('id') id: string, dto: UpdateMessageDto) {
    const updatedComment = await this.messageService.updateMessage(id, dto, 'userId');

    return fillDto(MessageRdo, updatedComment.toPOJO());
  }
}
