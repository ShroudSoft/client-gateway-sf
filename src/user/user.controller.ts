import {
  Controller,
  // Get,
  Post,
  Body,
  Inject,
  UseGuards,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
// import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/sercices';
import { catchError } from 'rxjs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  create(@Body() createUserDto: CreateUserDto) {
    return this.client.send('users.user.create', createUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error as object);
      }),
    );
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
