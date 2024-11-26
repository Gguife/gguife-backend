import s3 from "../../config/aws";
import multer from "multer";
import multerS3 from "multer-s3";

const storage = multerS3({
  s3,
  bucket: 'gguife-portfolio-images',
  ACL: 'public-read',
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
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Tipo de arquivo inválido, apenas PNG e JPEG são permitidos."));
      }
      cb(null, true);

    }catch(e){
      cb(new Error("Falha ao processar arquivo para validação de dimensões."));
    }
  },
}).single('imageUrl');


export default upload;