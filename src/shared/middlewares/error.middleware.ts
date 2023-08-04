/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { HTTP_CODES } from '../../core/constants/http-codes';
import { Prisma } from '@prisma/client';
import { UNEXPECTED_ERROR_MESSAGES } from '../../core/constants/unexpected-error-messages';
import { env } from '../../env';
import { container } from '../../core/bootstrappers';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';
import { Logger } from '../../lib/logger';

@Middleware({ type: 'after' })
@injectable()
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: Request, response: Response, next: NextFunction) {
    const status = getErrorStatus(error);
    const message = getErrorMessage(error);

    response.status(status).json({
      status,
      message,
    });
  }
}

function getErrorStatus(error: any): number {
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

function getErrorMessage(error: any): string {
  // Swallow database messages on production environment
  if (env.isProduction && (
    error instanceof Prisma.PrismaClientInitializationError
    || error instanceof Prisma.PrismaClientKnownRequestError
    || error instanceof Prisma.PrismaClientRustPanicError
    || error instanceof Prisma.PrismaClientUnknownRequestError
    || error instanceof Prisma.PrismaClientValidationError
  )) {
    const logger: Logger = container.get(INJECTION_TOKENS.Logger);
    logger.error(error.message);
    return UNEXPECTED_ERROR_MESSAGES.DefaultMessage;
  }

  const possibleMsgProperties = ['errors', 'message'];
  for(const prop of possibleMsgProperties) {
    if (error[prop]) {
      return error[prop] as string;
    }
  }

  return UNEXPECTED_ERROR_MESSAGES.DefaultMessage;
}

