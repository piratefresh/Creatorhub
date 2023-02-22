import { v2 } from "cloudinary";
import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { env } from "env.mjs";

v2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const cloudinary = {
  uploadFile: async (
    file: string
  ): Promise<UploadApiResponse | UploadApiErrorResponse> => {
    try {
      console.log("file: ", file);
      const result = await v2.uploader.upload(file, {
        upload_preset: "creatorhub",
      });

      console.log("result: ", result);
      return result;
    } catch (error) {
      return error as UploadApiErrorResponse;
    }
  },
  deleteFile: async (
    publicId: string
  ): Promise<UploadApiResponse | UploadApiErrorResponse> => {
    return new Promise((resolve, reject) => {
      return v2.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  },
};
