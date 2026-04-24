const adminMiddleware = async (req , res, next)=>{
    try {

        let user = req.user

        if(!user.isAdmin){
            return res.status(401).json({
                message:"you are not authorized User"
            })
        }

        next();
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error" ,
            error
        })
    }
}

module.exports = adminMiddleware