import multer, { MulterError, diskStorage } from 'multer';
import path from 'path';

type DestinationCallback = (error: MulterError | null, destination: string) => void;
type FilenameCallback = (error: MulterError | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (req: any, file: Express.Multer.File, cb: DestinationCallback) => {
    cb(null, 'src/public/images'); 
  },
  filename: (req: any, file: Express.Multer.File, cb: FilenameCallback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedExtensions = /jpeg|jpg|png|avif/;
    const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedExtensions.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error('Only JPEG, JPG, PNG, and AVIF files are allowed'));
    }
  },
});

export default upload;

