import { Response } from 'express';

export function trySetResponseStatus(res: Response, statusCode: number): Response {
    if (!res.headersSent) {
      res.status(statusCode);
    }
    return res;
}