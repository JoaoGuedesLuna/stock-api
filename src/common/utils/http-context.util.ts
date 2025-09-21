import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';

export function getRequestResponse(context: ExecutionContext | ArgumentsHost) {
  const ctx = context.switchToHttp();
  const request = ctx.getRequest<Request>();
  const response = ctx.getResponse<Response>();
  return { req: request, res: response };
}
