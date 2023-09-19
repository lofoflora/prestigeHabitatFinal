import multer from 'multer';

// multerConfig.js

export const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Destination callback triggered");
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    console.log("Filename callback triggered");
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
