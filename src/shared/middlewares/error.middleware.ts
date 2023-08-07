import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { HTTP_CODES } from '../../core/constants/http-codes';
import { Prisma } from '@prisma/client';
import { ERROR_MESSAGES } from '../../core/constants/error-messages';
import { env } from '../../env';
import { container } from '../../core/bootstrappers';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';
import { Logger } from '../../lib/logger';
import { ErrorResponse } from '../../contracts/responses/error.response';
import { isEnumerableObject } from '../../utils/object-helpers';

@Middleware({ type: 'after' })
@injectable()
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: unknown, request: Request, response: Response, next: NextFunction) {
    const prismaError = this.handlePrismaError(error);
    if (prismaError) {
      response.status(prismaError.status).json(prismaError);
    }
    else if (isEnumerableObject(error)) {
      const status = this.getErrorStatus(error);
      const message = this.getErrorMessage(error);
  
      const errorResponse: ErrorResponse = {
        status,
        message
      };
  
      response.status(status).json(errorResponse);
      
    }
    else {
      response.status(HTTP_CODES.InternalServerError);
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
      const logger: Logger = container.get(INJECTION_TOKENS.Logger);
      logger.error(error.message);
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