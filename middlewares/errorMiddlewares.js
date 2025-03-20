class ErrorHandler extends Error {
    constructor( message,statusCode) {
        super(message);
        this.statusCode = statusCode;
        
    }
}
export const errorMiddlewares = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    if(err.code ===11000){
        const statusCode = 400;
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;   
        err = new ErrorHandler(message,statusCode);
    }
    if(err.name === "JsonWebTokenError"){
        const statusCode = 401;
        const message = "Json Web Token is invalid. Try again";
        err = new ErrorHandler(message,statusCode);
    }
    if(err.name === "TokenExpiredError"){
        const statusCode = 401;
        const message = "Json Web Token is expired. Try again";
        err = new ErrorHandler(message,statusCode);
    }
    if(err.name === "CastError"){
        const statusCode = 400;
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,statusCode);
    }
    const errorMessage = err.errors ? Object.values(err.errors).map(value => value.message) : err.message;
    return res.status(err.statusCode).json({
        success: false,
        error: errorMessage || "Internal Server Error"
    });
}
export default ErrorHandler;