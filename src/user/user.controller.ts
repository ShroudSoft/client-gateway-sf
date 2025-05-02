import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  UseGuards,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/sercices';
import { catchError } from 'rxjs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/auth/decorators/token.decorator';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  create(@Body() createUserDto: CreateUserDto, @Token() token: string) {
    return this.client
      .send('users.user.create', {
        Authorization: token,
        Body: createUserDto,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  findAll(@Token() token: string) {
    return this.client
      .send('users.user.findAll', {
        Authorization: token,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  findOne(@Param('id') id: string, @Token() token: string) {
    return this.client
      .send('users.user.findOne', {
        Authorization: token,
        Body: { id },
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Token() token: string,
  ) {
    return this.client
      .send('users.user.update', {
        Authorization: token,
        Body: { id, ...updateUserDto },
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  remove(@Param('id') id: string, @Token() token: string) {
    return this.client
      .send('users.user.remove', {
        Authorization: token,
        Body: { id },
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as object);
        }),
      );
  }
}
