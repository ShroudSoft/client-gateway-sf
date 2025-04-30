import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { NATS_SERVICE } from 'src/config/sercices';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiOperation } from '@nestjs/swagger';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/pagination.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('module')
export class ModuleController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createModule(@Body() createModuleDto: CreateModuleDto) {
    return this.client.send('exams.create.module', createModuleDto).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }

  @Get()
  findAllModules(@Query() paginationDto: PaginationDto) {
    return this.client.send('exams.findall.module', paginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }

  @Patch(':id')
  updateModule(
    @Param('id') id: number,
    @Body() updateModuleDto: UpdateModuleDto,
  ) {
    return this.client
      .send('exams.update.module', { Body: { id, ...updateModuleDto } })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Get(':id/questions')
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

  @Get('question/:id')
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

  @Patch('question/:id')
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

  @Delete(':id')
  removeModule(@Param('id', ParseIntPipe) id: string) {
    return this.client.send('exams.delete.module', { Body: { id } }).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }
}
