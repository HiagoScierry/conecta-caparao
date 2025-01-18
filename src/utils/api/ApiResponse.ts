type TBody = string | object;

export class ApiResponse extends Response {
  constructor(body: TBody , status: number, headers?: HeadersInit) {
    super(JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      status
    });
  }
}