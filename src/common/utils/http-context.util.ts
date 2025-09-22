import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';

export function getRequestResponse(context: ExecutionContext | ArgumentsHost) {
  const ctx = context.switchToHttp();
  const request = ctx.getRequest<Request>();
  const response = ctx.getResponse<Response>();
  return { req: request, res: response };
}

export function hasProperty<K extends string, T = unknown>(
  obj: unknown,
  propertyName: K,
  typeCheck?: (value: unknown) => value is T
): obj is { [P in K]: T } {
  if (typeof obj !== 'object' || obj === null || !(propertyName in obj)) {
    return false;
  }

  if (typeCheck) {
    return typeCheck((obj as { [value: string]: unknown })[propertyName]);
  }

  return true;
}
