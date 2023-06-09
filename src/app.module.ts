import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/filter/http-exception.filter';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    ChatModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10000s' },
    }),
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('v1/user');
    consumer.apply(LoggerMiddleware).forRoutes('v1/chat');
    // .forRoutes({ path: 'cats', method: RequestMethod.GET });
    // forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
    //  .forRoutes(CatsController);
    // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
  }
}
