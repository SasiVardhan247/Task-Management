const { customAPIError } = require('../errors/customApiError');

const errorHandler = (err,req,res,next)=>{
    if(err instanceof customAPIError){
        return res.status(err.statusCode).json({msg: err.message})
    }

    return res.status(500).json({msg:"Internal Server Error"})
}

module.exports =  errorHandler;