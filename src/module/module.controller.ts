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
  UseGuards,
} from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { NATS_SERVICE } from 'src/config/sercices';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/pagination.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Token } from 'src/auth/decorators/token.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('module')
export class ModuleController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('sf')
  @ApiOperation({
    description:
      'Este endpoint es para modulos exclusivamente creados por SellFlix',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  createModuleSf(
    @Body() createModuleDto: CreateModuleDto,
    @Token() token: string,
  ) {
    return this.client
      .send('exams.create-sf.module', {
        Authorization: token,
        Body: createModuleDto,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Post('bs')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    description: 'Este endpoint es para modulos creados por businesses',
  })
  createModuleBs(
    @Body() createModuleDto: CreateModuleDto,
    @User() user: string,
  ) {
    return this.client
      .send('exams.create-bs.module', { Id: user, Body: createModuleDto })
      .pipe(
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

  @Get(':id')
  findOneModule(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('exams.findone.module', { Body: { id } }).pipe(
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

  @Delete(':id')
  removeModule(@Param('id', ParseIntPipe) id: string) {
    return this.client.send('exams.delete.module', { Body: { id } }).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }
}
