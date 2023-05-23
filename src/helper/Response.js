const StatusCode = require("./StatusCode");

class Response {
  constructor(success, message, data, status_code) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.status_code = status_code;
  }

  static success(res, message, data) {
    const response = new Response(true, message, data, StatusCode.OK);
    return response.send(res);
  }

  static error(res, message, status_code = StatusCode.INTERNAL_SERVER_ERROR) {
    const response = new Response(false, message, [], status_code);
    return response.send(res);
  }

  send(res) {
    const responseData = {
      success: this.success,
      message: this.message,
      data: this.data,
    };
    res.status(this.status_code).json(responseData);
  }
}
module.exports = Response;