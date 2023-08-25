import { NextFunction, Request, RequestHandler, Response } from "express";
import expressBasicAuth from "express-basic-auth";

export const PassThroughMiddleware: RequestHandler = (_req: Request, _res: Response, next: NextFunction) => next();

export const makeBasicAuthOrPassThrough = (username: string | undefined, password: string | undefined): RequestHandler => {
    if (username && typeof password !== 'undefined') {
        return expressBasicAuth({
            users: {
                [`${username}`]: password,
            },
            challenge: true,
        })
    }
    else {
        return PassThroughMiddleware;
    }
}