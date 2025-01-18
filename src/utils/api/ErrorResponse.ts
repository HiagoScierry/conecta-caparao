type ErrorStatus = 400 | 401 | 403 | 404 | 500;

export class ErrorResponse extends Response {
  constructor(body: Error, status: ErrorStatus, headers?: HeadersInit) {
    super(JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      status
    });
  }
}