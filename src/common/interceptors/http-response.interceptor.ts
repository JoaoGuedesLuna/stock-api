import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { HttpResponse, ResponseData } from '@/common/interfaces';
import { Observable } from 'rxjs';
import { getRequestResponse } from '@/common/utils';
import { Request, Response } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpResponseInterceptor<T> implements NestInterceptor<T, HttpResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<HttpResponse<T>> {
    const { req, res } = getRequestResponse(context);

    return next
      .handle()
      .pipe(map((data: T | ResponseData<T> | null | undefined) => this.formatResponse(data, req, res)));
  }

  private formatResponse(data: T | ResponseData<T> | null | undefined, req: Request, res: Response): HttpResponse<T> {
    const extractedData = this.extractData(data);
    const message = this.extractMessage(data) ?? this.defaultMessage(req.method);

    return {
      success: true,
      status: res.statusCode,
      timestamp: new Date().toISOString(),
      path: req.url,
      message,
      data: extractedData
    };
  }

  private extractData(data: T | ResponseData<T> | null | undefined): T | undefined {
    if (data && typeof data === 'object' && 'data' in data) return data.data ?? undefined;
    return data as T | undefined;
  }

  private extractMessage(data: T | ResponseData<T> | null | undefined): string | undefined {
    if (data && typeof data === 'object' && 'message' in data) return data.message ?? undefined;
    return undefined;
  }

  private defaultMessage(method: string): string {
    switch (method) {
      case 'POST':
        return 'Resource created successfully';
      case 'PUT':
      case 'PATCH':
        return 'Resource updated successfully';
      case 'DELETE':
        return 'Resource deleted successfully';
      default:
        return 'Request processed successfully';
    }
  }
}
