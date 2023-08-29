import { Request, Response } from 'express';

export function trySetResponseStatus(res: Response, statusCode: number): Response {
    if (!res.headersSent) {
      res.status(statusCode);
    }
    return res;
}

export function setRequestProp(req: Request, prop: string, propValue: unknown): Request {
    (req as unknown as Record<string, unknown>)[prop] = propValue;
    return req;
}

export function getRequestProp<T = unknown>(req: Request, prop: string): T | undefined {
  return (req as unknown as Record<string, unknown>)[prop] as T | undefined;
}