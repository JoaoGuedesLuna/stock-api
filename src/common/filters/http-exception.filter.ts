import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpResponse } from '@/common/interfaces';
import { getRequestResponse } from '@/common/utils';

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

      if (this.hasMessage(errorResponse)) {
        return errorResponse.message;
      }
    }

    if (exception instanceof Error) return exception.message;

    return 'Unexpected error';
  }

  private hasMessage(obj: unknown): obj is { message: string } {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'message' in obj &&
      typeof (obj as { message: unknown }).message === 'string'
    );
  }
}
