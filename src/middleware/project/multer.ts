import s3 from "../../config/aws";
import multer from "multer";
import multerS3 from "multer-s3";
import sharp from "sharp";

const storage = multerS3({
  s3,
  bucket: 'gguife-portfolio-images',
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, key?: string) => void) => {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    cb(null, `uploads/${fileName}`);
  },
});


const upload = multer({
  storage,
  limits: {fileSize: 5 * 1024 * 1024}, // Limite de 5MB
  fileFilter: async  (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if(!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Tipo de arquivo inválido, apenas PNG e JPEG são permitidos.'))
    }

    try{
      const buffer = (file as any).buffer;
      const metadata = await sharp(buffer).metadata();

      const maxWidth = 1024; 
      const maxHeight = 768; 

      if (metadata.width && metadata.height) {
        if (metadata.width > maxWidth || metadata.height > maxHeight) {
          return cb(new Error(`Dimensões máximas permitidas são ${maxWidth}x${maxHeight}.`));
        }
      }

      cb(null, true);
    }catch(e){
      cb(new Error("Falha ao processar arquivo para validação de dimensões."));
    }
  },
}).single('file');


export default upload;