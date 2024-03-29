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
import { HttpExceptionFilter } from 'src/utils/filter/http-exception.filter';
import { RolesGuard } from 'src/utils/guards/role.guard';
import { LoggingInterceptor } from 'src/utils/interceptor/logging.interceptor';
import { UserDto } from './dto/user-dto';
import { UserService } from './user.service';

const API = 'v1/user';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller()
@UseGuards(RolesGuard)
@Roles('admin')
@UseInterceptors(LoggingInterceptor)
// @UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('v1/login')
  async login(@Body() user: { username: string; password: string }) {
    console.log('received', user);
    try {
      const result = await this.userService.login(user);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Post('v1/verify')
  async verify(@Body() data: { userId: string; token: string }) {
    console.log('received verify');
    try {
      const result = await this.userService.verify(data);
      return result;
    } catch (err) {
      throw err;
    }
  }

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
