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
import { User } from 'src/dto/user-dto';
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

  @Post()
  async addUser(@Body() user: User, @Res() res: Response): Promise<User> {
    return await this.userService.addUser(user);
  }

  @Get(`${API}/:id`)
  async getUser(@Param('id') id: string): Promise<any> {
    return await this.userService.getUser(id);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() user: User): Promise<any> {
    return await this.userService.getUser(id);
  }
}
