/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { HTTP_CODES } from '../../core/constants/http-codes';

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
  const possibleMsgProperties = ['errors', 'message'];
  for(const prop of possibleMsgProperties) {
    if (error[prop]) {
      return error[prop] as string;
    }
  }

  return 'Unexpected error has occurred!';
}

