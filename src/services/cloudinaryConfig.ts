import {v2 as cloudinary} from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { cloudinaryConfig } from '../config/config'

cloudinary.config({
  cloud_name:cloudinaryConfig.cloudName,
  api_key:cloudinaryConfig.apiKey,
  api_secret:cloudinaryConfig.apiSecret
})

 const storage = new CloudinaryStorage({
  cloudinary,
  params:async(req,file)=>({
    folder:'edtech'
  })
})

export {cloudinary,storage}