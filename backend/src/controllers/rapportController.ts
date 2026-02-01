import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { Rapport, Bureau, Vehicule, User } from '../models';

export const getAllRapports = async (req: AuthRequest, res: Response) => {
  try {
    const { statut, numeroSinistre, page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const where: any = {};
    
    // Filtrer par utilisateur si pas admin
    if (req.user?.role !== 'admin') {
      where.userId = req.userId;
    }

    if (statut) where.statut = statut;
    if (numeroSinistre) where.numeroSinistre = numeroSinistre;

    const { rows: rapports, count } = await Rapport.findAndCountAll({
      where,
      include: [
        { model: Bureau, as: 'bureau' },
        { model: Vehicule, as: 'vehicule' },
        { model: User, as: 'expert', attributes: ['id', 'nom', 'prenom', 'email'] },
      ],
      limit: Number(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      rapports,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des rapports:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getRapportById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const rapport = await Rapport.findByPk(id, {
      include: [
        { model: Bureau, as: 'bureau' },
        { model: Vehicule, as: 'vehicule' },
        { model: User, as: 'expert', attributes: ['id', 'nom', 'prenom', 'email'] },
      ],
    });

    if (!rapport) {
      return res.status(404).json({ message: 'Rapport non trouvé' });
    }

    // Vérifier les permissions
    if (req.user?.role !== 'admin' && rapport.userId !== req.userId) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    res.json({ rapport });
  } catch (error) {
    console.error('Erreur lors de la récupération du rapport:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const createRapport = async (req: AuthRequest, res: Response) => {
  try {
    const {
      typeRapport,
      numeroOrdreService,
      bureauId,
      numeroSinistre,
      dateSinistre,
      dateVisite,
      vehicule,
    } = req.body;

    // Créer le rapport
    const rapport = await Rapport.create({
      typeRapport,
      numeroOrdreService,
      bureauId,
      numeroSinistre,
      dateSinistre,
      dateVisite,
      userId: req.userId!,
      statut: 'brouillon',
    });

    // Créer le véhicule associé
    if (vehicule) {
      await Vehicule.create({
        ...vehicule,
        rapportId: rapport.id,
      });
    }

    // Récupérer le rapport complet
    const rapportComplet = await Rapport.findByPk(rapport.id, {
      include: [
        { model: Bureau, as: 'bureau' },
        { model: Vehicule, as: 'vehicule' },
      ],
    });

    res.status(201).json({
      message: 'Rapport créé avec succès',
      rapport: rapportComplet,
    });
  } catch (error) {
    console.error('Erreur lors de la création du rapport:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const updateRapport = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const rapport = await Rapport.findByPk(id);

    if (!rapport) {
      return res.status(404).json({ message: 'Rapport non trouvé' });
    }

    // Vérifier les permissions
    if (req.user?.role !== 'admin' && rapport.userId !== req.userId) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    await rapport.update(updates);

    // Mettre à jour le véhicule si fourni
    if (updates.vehicule) {
      const vehicule = await Vehicule.findOne({ where: { rapportId: id } });
      if (vehicule) {
        await vehicule.update(updates.vehicule);
      }
    }

    // Récupérer le rapport mis à jour
    const rapportMisAJour = await Rapport.findByPk(id, {
      include: [
        { model: Bureau, as: 'bureau' },
        { model: Vehicule, as: 'vehicule' },
      ],
    });

    res.json({
      message: 'Rapport mis à jour avec succès',
      rapport: rapportMisAJour,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rapport:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const deleteRapport = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const rapport = await Rapport.findByPk(id);

    if (!rapport) {
      return res.status(404).json({ message: 'Rapport non trouvé' });
    }

    // Vérifier les permissions
    if (req.user?.role !== 'admin' && rapport.userId !== req.userId) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    await rapport.destroy();

    res.json({ message: 'Rapport supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du rapport:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
