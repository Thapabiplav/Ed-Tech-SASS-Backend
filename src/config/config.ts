export const envConfig = {
  portNumber: process.env.PORT,
};

export const dbConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
};

export const cloudinaryConfig = {
  cloudName:process.env.CLOUDINARY_CLOUD_NAME,
  apiKey:process.env.CLOUDINARY_API_KEY,
  apiSecret : process.env.ClOUDINARY_API_SECRET
}

export const mailService = {
  email:process.env.EMAIL,
  pass:process.env.PASS
}