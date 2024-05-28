import { v2 as cloudinary } from "cloudinary";
import Cloudinary from "../configs/cloudinary.config";
import { NextFunction } from "express";

export const uploadFile = async (file: any, next: NextFunction) => {
  cloudinary.config({
    cloud_name: Cloudinary.cloud_name,
    api_key: Cloudinary.api_key,
    api_secret: Cloudinary.api_secret,
  });

  const resultUpload = await cloudinary.uploader
    .upload(file.path, {
      allowed_formats: ["jpg", "png", "svg"],
      public_id: file.fileName,
    })
    .catch((err) => next(err));

  return resultUpload?.url;
};
