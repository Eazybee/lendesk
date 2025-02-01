import { Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { LoggerService } from './logger/logger.service';


type ExceptionResponse = {
  statusCode: number;
  response: string | Object;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new LoggerService('AllExceptionsFilter');
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptionResponse: ExceptionResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      response: 'Internal Server Error',
    };

    if (exception instanceof HttpException) {
      exceptionResponse.statusCode = exception.getStatus();
      exceptionResponse.response = exception.getResponse();
    } 

    response.status(exceptionResponse.statusCode).json(exceptionResponse);

    this.logger.error(AllExceptionsFilter.name, exception as string);
    super.catch(exception, host);
  }
}