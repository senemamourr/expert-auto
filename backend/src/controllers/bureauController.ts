import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { Bureau } from '../models';
import { Op } from 'sequelize';

export const getAllBureaux = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search } = req.query;
    const where: any = {};

    if (search) {
      where.nomAgence = {
        [Op.iLike]: `%${search}%`,
      };
    }

    const bureaux = await Bureau.findAll({
      where,
      order: [['nomAgence', 'ASC']],
    });

    res.json({ bureaux });
  } catch (error) {
    console.error('Erreur lors de la récupération des bureaux:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getBureauById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const bureau = await Bureau.findByPk(id);

    if (!bureau) {
      res.status(404).json({ message: 'Bureau non trouvé' });
      return;
    }

    res.json({ bureau });
  } catch (error) {
    console.error('Erreur lors de la récupération du bureau:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getBureauByCode = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { code } = req.params;

    const bureau = await Bureau.findOne({ where: { code } });

    if (!bureau) {
      res.status(404).json({ message: 'Bureau non trouvé' });
      return;
    }

    res.json({ bureau });
  } catch (error) {
    console.error('Erreur lors de la récupération du bureau:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const createBureau = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { code, nomAgence, responsableSinistres, telephone, email, adresse } = req.body;

    const existingBureau = await Bureau.findOne({ where: { code } });
    if (existingBureau) {
      res.status(400).json({ message: 'Ce code bureau existe déjà' });
      return;
    }

    const bureau = await Bureau.create({
      code,
      nomAgence,
      responsableSinistres,
      telephone,
      email,
      adresse,
    });

    res.status(201).json({
      message: 'Bureau créé avec succès',
      bureau,
    });
  } catch (error) {
    console.error('Erreur lors de la création du bureau:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const updateBureau = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const bureau = await Bureau.findByPk(id);

    if (!bureau) {
      res.status(404).json({ message: 'Bureau non trouvé' });
      return;
    }

    await bureau.update(updates);

    res.json({
      message: 'Bureau mis à jour avec succès',
      bureau,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du bureau:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const deleteBureau = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const bureau = await Bureau.findByPk(id);

    if (!bureau) {
      res.status(404).json({ message: 'Bureau non trouvé' });
      return;
    }

    await bureau.destroy();

    res.json({ message: 'Bureau supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du bureau:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
