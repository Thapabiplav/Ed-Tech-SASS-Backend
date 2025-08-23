import jwt from 'jsonwebtoken'
const generateJwtToken = (data:{
  id:string,
  instituteNumber ?: string
}
)=>{
  const token =  jwt.sign(data,process.env.SECRET_KEY as string,{
      expiresIn:"7d"
    })
    return token
}

export default generateJwtToken