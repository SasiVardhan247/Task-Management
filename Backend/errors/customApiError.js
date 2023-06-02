class customAPIError extends Error{
    constructor(msg,statusCode){
        super(msg)
        this.statusCode=statusCode
    }
}

const createCustomError = (msg,statusCode)=>{
    return new customAPIError(msg,statusCode);
}

module.exports = {createCustomError , customAPIError}