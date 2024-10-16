import jwt from "jsonwebtoken";

const auth= (req, res, next) => {
      //grab token from cookie
      console.log(req.cookies)
      const {token} = req.cookies
 
      if(!token){
         res.status(403).json({error : "Please login first"})
      }
 
      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        console.log(decode)
      } catch (error) {
        console.log(error)
res.status(401).json("Invalid Token", error)
      }

      return next()
q
    }

    export default auth