import jwt from "jsonwebtoken";

export const verifyToken = async(token:string)=>{
try{
return jwt.verify(token, process.env.JWT_SECRET!) ;
}catch{
    throw new Error("Unauthorized");
}

}