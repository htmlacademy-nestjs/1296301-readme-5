import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Post, Delete, Patch, Query, Body, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';

import { fillDto } from '@project/shared/helpers';
import { RequestWithTokenPayload } from '@project/shared/app/types';
import { CreateMessageDto, UpdateMessageDto, MessageQuery } from '@project/shared/blog/dto';

import { MessageInfo } from './constants/message.constants';
import { MessageService } from './message.service';

import { CreateMessageValidationPipe } from './pipes/create-message-validation.pipe';
import { UpdateMessageValidationPipe } from './pipes/update-message-validation.pipe';

import { MessageRdo } from './rdo/message.rdo';
import { CheckAuthGuard } from '../guards/check-auth.guard';

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
  @UseGuards(CheckAuthGuard)
  @Post('/')
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
    const updatedComment = await this.messageService.updateMessage(id, dto, user.sub);

    return fillDto(MessageRdo, updatedComment.toPOJO());
  }
}
