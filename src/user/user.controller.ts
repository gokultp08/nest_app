import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { IUser } from 'src/dto/user-dto';
import { UserService } from 'src/user/user.service';
import { HttpExceptionFilter } from 'src/utils/filter/http-exception.filter';

const API = 'v1/user';

@Controller(API)
// @UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(@Body() user: IUser, @Res() res: Response): Promise<IUser> {
    return await this.userService.addUser(user);
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<any> {
    return await this.userService.getUser(id);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() user: IUser): Promise<any> {
    return await this.userService.getUser(id);
  }
}
