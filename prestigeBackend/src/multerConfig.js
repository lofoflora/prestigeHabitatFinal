import multer from 'multer';

// Définition du storage pour les images
export const upload = multer ({dest :process.env["file-path"]})

