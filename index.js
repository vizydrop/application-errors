const util = require(`util`);

const BadRequestError = function(message) {
    Error.call(this);
    Error.captureStackTrace(this, BadRequestError);
    this.status = 400;
    this.message = message || null;
};

util.inherits(BadRequestError, Error);

const NotFoundError = function(message) {
    Error.call(this);
    Error.captureStackTrace(this, NotFoundError);
    this.status = 404;
    this.message = message || null;
};

util.inherits(NotFoundError, Error);

const ForbiddenError = function(message) {
    Error.call(this);
    Error.captureStackTrace(this, ForbiddenError);
    this.status = 403;
    this.message = message || null;
};

util.inherits(ForbiddenError, Error);

const StatusCodeError = function(message, status, details) {
    Error.call(this);
    Error.captureStackTrace(this, StatusCodeError);
    this.status = status;
    this.message = message || null;
    this.details = details;
};

util.inherits(StatusCodeError, Error);

const allowedFields = [
    `message`,
    `status`,
    `details`,
    `correlationId`,
    `code`,
    `description`,
    `type`,
];
if (process.env.NODE_ENV !== `production`) {
    allowedFields.push(`stack`);
}

module.exports = {
    convertForStringify(value) {
        if (value) {
            return allowedFields.reduce((acc, fieldName) => {
                const fieldValue = value[fieldName];
                if (fieldValue) {
                    acc[fieldName] = value[fieldName];
                }

                return acc;
            }, {});
        }

        return value;
    },
    createUserLoggedOutError() {
        return new StatusCodeError(`Unauthorized`, 401, {isLoggedOut: true});
    },
    BadRequestError,
    NotFoundError,
    ForbiddenError,
    StatusCodeError,
};
