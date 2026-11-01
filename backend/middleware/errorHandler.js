
const errorHandler = (err, req, res, next) => {
    console.error(err);

    let statusCode = err.statusCode || err.status || 500;
    let message = err.message || "Internal Server Error";

    // MongoDB duplicate key error
    if (err.code === 11000) {
        statusCode = 409;
        message = "Duplicate value already exists";
    }

    // Mongoose validation error
    else if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Validation failed";

        return res.status(statusCode).json({
            success: false,
            message,
            errors: Object.values(err.errors).map(
                (item) => item.message
            )
        });
    }

    // Mongoose invalid ObjectId error
    else if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid identifier";
    }

    // Unexpected server errors
    else if (statusCode >= 500) {
        statusCode = 500;
        message = "Internal server error";
    }

    return res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = errorHandler;
