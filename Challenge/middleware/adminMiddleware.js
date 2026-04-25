const adminMiddleware = async (req , res, next)=>{
    try {

        let user = req.user

        if(!user.isAdmin){
            return res.status(403).json({
                message:"Admin Only access"
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