class ApiError extends Error {
  statusCode: number;
  success: boolean;
  data: any;
  message: string;
  errors: any[];

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
