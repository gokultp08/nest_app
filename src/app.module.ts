import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/filter/http-exception.filter';

@Module({
  imports: [ConfigModule.forRoot(), UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('v1/user');
    // .forRoutes({ path: 'cats', method: RequestMethod.GET });
    // forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
    //  .forRoutes(CatsController);
    // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
  }
}
