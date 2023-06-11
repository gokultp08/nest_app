import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from 'src/dto/user-dto';
import { UserService } from 'src/user/user.service';
import { HttpExceptionFilter } from 'src/utils/filter/http-exception.filter';
import { RolesGuard } from 'src/utils/guards/role.guard';
import { LoggingInterceptor } from 'src/utils/interceptor/logging.interceptor';

const API = 'v1/user';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller()
@UseGuards(RolesGuard)
@Roles('admin')
@UseInterceptors(LoggingInterceptor)
// @UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(`${API}`)
  async addUser(@Body() user: UserDto) {
    console.log('received', user);
    try {
      const result = await this.userService.add(user);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Get(`${API}`)
  async getAllUsers(): Promise<any> {
    try {
      const result = await this.userService.findAll();
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Get(`${API}/:id`)
  async getUser(@Param('id') id: string): Promise<any> {
    try {
      const result = await this.userService.find(id);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Put(`${API}/:id`)
  async updateUser(
    @Param('id') id: string,
    @Body() user: UserDto,
  ): Promise<any> {
    try {
      const result = await this.userService.update(id, user);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
