import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidRequestException extends HttpException {
  constructor() {
    super('Invalid', HttpStatus.BAD_REQUEST);
  }
}
