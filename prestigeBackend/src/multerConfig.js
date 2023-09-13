import multer from 'multer';

// Configuration de Multer pour les images
export const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadImage = multer({ storage: imageStorage });

// Configuration de Multer pour les vues 3D
export const threeDStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'threeDViews/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadThreeD = multer({ storage: threeDStorage });
