import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpResponse } from '@/common/interfaces';
import { getRequestResponse, hasProperty } from '@/common/utils/http-context.util';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const { req, res } = getRequestResponse(host);
    const status = this.getStatus(exception);
    const message = this.getMessage(exception);

    const responseBody: HttpResponse = {
      success: false,
      status,
      timestamp: new Date().toISOString(),
      path: req.url,
      message
    };

    res.status(status).json(responseBody);
  }

  private getStatus(exception: unknown): number {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'string') {
        return errorResponse;
      }

      if (hasProperty(errorResponse, 'message', (p): p is string => typeof p === 'string')) {
        return errorResponse.message;
      }
    }

    if (exception instanceof Error) return exception.message;

    return 'Unexpected error';
  }
}
