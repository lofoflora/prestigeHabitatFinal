import  {Carousel} from '../../models/annonces/carouselModel.js';

export const addCarouselItem = async (req, res) => {
  try {
    const newItem = await Carousel.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: "Erreur à l'ajout de l'item", error });
  }
};

export const getCarouselItems = async (req, res) => {
  try {
    const items = await Carousel.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la récupération des items', error });
  }
};

export const getCarouselItemById = async (req, res) => {
  try {
    const item = await Carousel.findByPk(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Item non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la récupération de l'item", error });
  }
};

export const updateCarouselItem = async (req, res) => {
  try {
    await Carousel.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: 'Item mis à jour' });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de l'item", error });
  }
};

export const removeCarouselItem = async (req, res) => {
  try {
    await Carousel.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la suppression de l'item", error });
  }
};
