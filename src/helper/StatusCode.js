class StatusCode{
    static OK = 200;
    static BAD_REQUEST = 400;
    static UNAUTHORIZED = 401;
    static FORBIDDEN = 403;
    static NOT_FOUND = 404;
    static METHOD_NOT_ALLOWED = 405;
    static CONFLICT = 409;
    static INTERNAL_SERVER_ERROR = 500;
}

module.exports = StatusCode;