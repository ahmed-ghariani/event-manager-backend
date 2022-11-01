const ResponceError = require('./responceError')


module.exports = (err,req,res,next)=>{
    if(err instanceof ResponceError ){
        res.status(err.status).json({
            message: err.message
        });
    }else{
        console.error(err);
        if(err.errors){ ///mongoose error
            res.status(400).json({
                message: err.message
            });
        }else if(err.name === "MongoServerError"){
            switch (err.code) {
                case 11000: ///unique error
                const key = Object.keys(err.keyPattern)[0];
                res.status(400).json({
                    message: `${key} '${err.keyValue[key]}' is allready used`
                });
                    break;
                default:
                    res.status(400).json({
                        message: err.message
                    });
                    break;
            }
        }else{
            res.status(500).json({
                message: "something went wrong"
            });
        }
        
    }
};