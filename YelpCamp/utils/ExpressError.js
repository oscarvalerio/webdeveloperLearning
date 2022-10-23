class ExpressError extends Error{
    constructor(message, statusCode){
        super();
        this.message = message;
        this.statsuCode = statusCode;
    }
}

module.exports = ExpressError;