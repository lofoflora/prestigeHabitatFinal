import express from 'express';
import { 
  addCarouselItem, 
  getCarouselItems, 
  getCarouselItemById, 
  updateCarouselItem, 
  removeCarouselItem 
} from '../../controllers/annonces/carouselController.js'; // Adapte le chemin si nécessaire

const carouselRoutes = express.Router();

carouselRoutes.post('/add', addCarouselItem);
carouselRoutes.get('/', getCarouselItems);
carouselRoutes.get('/:id', getCarouselItemById);
carouselRoutes.put('/:id', updateCarouselItem);
carouselRoutes.delete('/remove/:id', removeCarouselItem);

export default carouselRoutes;
