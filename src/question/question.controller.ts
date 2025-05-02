import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiOperation } from '@nestjs/swagger';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config/sercices';
import { UpdateQuestionDto } from './dto/question-dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Get('module/:id')
  @ApiOperation({
    description:
      'Obtener todas las preguntas de un modulo junto con sus opciones (la búsqueda se realiza por el ID del module)',
  })
  findAllQuestions(@Param('id', ParseIntPipe) id: number) {
    return this.client
      .send('exams.findall.moduleQuestions', { Body: { id } })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Get(':id')
  @ApiOperation({
    description:
      'Obtener una pregunta junto con su info y sus opciones (la búsqueda se realiza por el ID de la pregunta)',
  })
  findQuestion(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('exams.find.question', { Body: { id } }).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }

  @Patch(':id')
  @ApiOperation({
    description: 'Modificar una pregunta y sus opciones',
  })
  updateQuestion(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.client
      .send('exams.update.question', { Body: { id, ...updateQuestionDto } })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }
}
