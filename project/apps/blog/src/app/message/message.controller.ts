import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Post, Delete, Patch, Query, Body, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';

import { fillDto, CheckAuthGuard } from '@project/shared/helpers';
import { RequestWithTokenPayload } from '@project/shared/app/types';
import { CreateMessageDto, UpdateMessageDto, MessageQuery } from '@project/shared/blog/dto';

import { MessageInfo } from './constants/message.constants';
import { MessageService } from './message.service';

import { CreateMessageValidationPipe } from './pipes/create-message-validation.pipe';
import { UpdateMessageValidationPipe } from './pipes/update-message-validation.pipe';

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
    const messages = await this.messageService.getMessages(query);

    return fillDto(MessageRdo, messages.map((message) => message.toPOJO()));
  }

  @ApiResponse({
    type: MessageRdo,
    status: HttpStatus.CREATED,
    description: MessageInfo.Add,
  })
  @UseGuards(CheckAuthGuard)
  @Post('/add')
  async create(@Req() { user }: RequestWithTokenPayload, @Body(CreateMessageValidationPipe) dto: CreateMessageDto) {
    const newComment = await this.messageService.createMessage(dto, user.sub);

    return fillDto(MessageRdo, newComment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: MessageInfo.Remove,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(CheckAuthGuard)
  @Delete(':id')
  async destroy(@Req() { user }: RequestWithTokenPayload, @Param('id') id: string) {
    await this.messageService.deleteMessage(id, user.sub);
  }

  @ApiResponse({
    type: MessageRdo,
    status: HttpStatus.OK,
    description: MessageInfo.Update,
  })
  @UseGuards(CheckAuthGuard)
  @Patch(':id')
  async update(@Req() { user }: RequestWithTokenPayload, @Param('id') id: string, @Body(UpdateMessageValidationPipe) dto: UpdateMessageDto) {
    const updatedMessage = await this.messageService.updateMessage(id, dto, user.sub);

    return fillDto(MessageRdo, updatedMessage.toPOJO());
  }
}
