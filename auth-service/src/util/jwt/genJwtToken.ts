import jwt from 'jsonwebtoken'

export default (payload:{userId:string, userEmail:string, isAdmin:boolean, isBlocked:boolean})=>{
    let Token=jwt.sign(payload,String(process.env.AUTH_JWT_SECRET),{expiresIn:60*60*24})
    return Token
}