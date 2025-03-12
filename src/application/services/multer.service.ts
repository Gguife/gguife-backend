import s3 from '../config/aws.config';
import multer from 'multer';
import multerS3 from 'multer-s3';


class UploadService{
  private storage: multer.StorageEngine;

  constructor() {
    this.storage = multerS3({
      s3,
      bucket: process.env.S3_BUCKET_NAME || 'default-bucket',
      ACL: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (
        req: Express.Request,
        file: Express.Multer.File,
        cb: (error: Error | null, key?: string) => void
      ) => {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${Date.now()}.${fileExtension}`;
        cb(null, `uploads/${fileName}`);
      } 
    })
  }


  private fileFilter(req: Express.Request, 
    file: Express.Multer.File, 
    cb: (error: Error | null, acceptFile?: boolean) => void
  ) {
    const allowedTypes = ['image/jpeg', 'image/png']
    if(!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Ivalid file type, only PNG or JPEG are allowed.'));
    }
    cb(null, true);
  }


  public getUpload() {
    return multer({
      storage: this.storage,
      limits: {
        fileSize: 5 * 1024 * 1024
      },
      fileFilter: this.fileFilter,
    }).single('/uploads');
  }
}

export default new UploadService;