import HttpStatusConstant from "../constant/httpstatus.constant.js";

export class ConfligError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;

    this.status = HttpStatusConstant.CONFLIG;
  }

  statusCode() {
    return this.status;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.status = HttpStatusConstant.BAD_REQUEST;
  }

  statusCode() {
    return this.status;
  }
}
