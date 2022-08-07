import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (authorization) {
      next();
    } else {
      res.status(HttpStatus.UNAUTHORIZED).send({
        status: HttpStatus.BAD_REQUEST,
        msg: 'No authorization token found',
      });
    }
  }
}
