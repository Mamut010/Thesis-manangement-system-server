import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { HTTP_CODES } from '../../core/constants/http-codes';
import { Prisma } from '@prisma/client';
import { ERROR_MESSAGES } from '../../contracts/constants/error-messages';
import { env } from '../../env';
import { LoggerInterface } from '../../lib/logger';
import { ErrorResponse } from '../../contracts/responses';
import { isEnumerableObject } from '../../utils/object-helpers';
import { trySetResponseStatus } from '../../utils/req-res-helpers';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';

@Middleware({ type: 'after' })
@injectable()
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  constructor(@inject(INJECTION_TOKENS.Logger) private logger: LoggerInterface) {

  }

  error(error: unknown, request: Request, response: Response, next: NextFunction) {
    const prismaError = this.handlePrismaError(error);
    if (prismaError) {
      trySetResponseStatus(response, prismaError.status).json(prismaError);
    }
    else if (isEnumerableObject(error)) {
      const status = this.getErrorStatus(error);
      const message = this.getErrorMessage(error);
  
      const errorResponse: ErrorResponse = {
        status,
        message
      };
  
      trySetResponseStatus(response, status).json(errorResponse);
      
    }
    else {
      trySetResponseStatus(response, HTTP_CODES.InternalServerError);
    }
  }

  private handlePrismaError(error: unknown): ErrorResponse | undefined {
    // Swallow database messages in production environment
    if (env.isProduction && (
      error instanceof Prisma.PrismaClientInitializationError
      || error instanceof Prisma.PrismaClientKnownRequestError
      || error instanceof Prisma.PrismaClientRustPanicError
      || error instanceof Prisma.PrismaClientUnknownRequestError
      || error instanceof Prisma.PrismaClientValidationError
    )) {
      this.logger.error(error.message);
      return {
        status: HTTP_CODES.InternalServerError,
        message: ERROR_MESSAGES.Unexpected.DefaultMessage
      };
    }

    return undefined;
  }

  private getErrorStatus(error: Record<string, any>): number {
    if (Array.isArray(error) && error.length > 0 && error.every(err => err instanceof ValidationError)) {
      return HTTP_CODES.BadRequest;
    }
    else {
      const possibleStatusProperties = ['status', 'httpCode'];
      for(const prop of possibleStatusProperties) {
        if (error[prop]) {
          return error[prop] as number;
        }
      }
  
      return HTTP_CODES.InternalServerError;
    }
  }

  private getErrorMessage(error: Record<string, any>): string {
    const possibleMsgProperties = ['errors', 'message'];
    for(const prop of possibleMsgProperties) {
      if (error[prop]) {
        return error[prop] as string;
      }
    }
  
    return ERROR_MESSAGES.Unexpected.DefaultMessage;
  }
}