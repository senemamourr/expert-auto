import { Request, Response } from 'express';
import { Rapport, Vehicule, Assure, Choc, Fourniture, Bureau } from '../models';
import sequelize from '../config/database';
import { randomUUID } from 'crypto';

// Créer un nouveau rapport
export const createRapport = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const {
      typeRapport,
      numeroOrdreService,
      bureauId,
      numeroSinistre,
      dateSinistre,
      dateVisite,
      statut,
      montantTotal,
      vehicule,
      assure,
      chocs,
    } = req.body;

    // Validation
    if (!typeRapport || !numeroOrdreService || !bureauId || !numeroSinistre) {
      await transaction.rollback();
      res.status(400).json({ 
        message: 'Champs obligatoires manquants',
        required: ['typeRapport', 'numeroOrdreService', 'bureauId', 'numeroSinistre']
      });
      return;
    }

    console.log('📝 Création du rapport...');

    // Générer l'ID manuellement pour éviter les problèmes
    const rapportId = randomUUID();

    // 1. CRÉER LE RAPPORT D'ABORD
    const rapport = await Rapport.create({
      id: rapportId, // ✅ ID explicite
      typeRapport,
      numeroOrdreService,
      bureauId,
      numeroSinistre,
      dateSinistre,
      dateVisite,
      statut: statut || 'BROUILLON',
      montantTotal: montantTotal || 0,
      userId: (req as any).user?.id || null,
    }, { 
      transaction,
      returning: true,
    });

    console.log('✅ Rapport créé avec ID:', rapportId);

    // 2. CRÉER LE VÉHICULE (maintenant rapportId existe)
    if (vehicule) {
      await Vehicule.create({
        rapportId: rapportId, // ✅ Utiliser rapportId directement
        marque: vehicule.marque,
        marque: vehicule.marque,
        type: vehicule.type,
        genre: vehicule.genre,
        immatriculation: vehicule.immatriculation,
        numeroChassis: vehicule.numeroChasis, // ✅ Corrigé : numeroChassis avec 2 's'
        kilometrage: vehicule.kilometrage,
        dateMiseCirculation: vehicule.dateMiseCirculation,
        couleur: vehicule.couleur,
        sourceEnergie: vehicule.sourceEnergie,
        puissanceFiscale: vehicule.puissanceFiscale,
        valeurNeuve: vehicule.valeurNeuve,
      }, { transaction });

      console.log('✅ Véhicule créé');
    }

    // 3. CRÉER L'ASSURÉ
    if (assure) {
      await Assure.create({
        rapportId: rapportId, // ✅ Utiliser rapportId directement
        nom: assure.nom,
        prenom: assure.prenom,
        telephone: assure.telephone,
        email: assure.email || null,
        adresse: assure.adresse,
      }, { transaction });

      console.log('✅ Assuré créé');
    }

    // 4. CRÉER LES CHOCS
    if (chocs && chocs.length > 0) {
      for (let i = 0; i < chocs.length; i++) {
        const choc = chocs[i];
        
        const chocCreated = await Choc.create({
          rapportId: rapportId, // ✅ Utiliser rapportId directement
          nomChoc: choc.nomChoc,
          description: choc.description,
          modeleVehiculeSvg: choc.modeleVehiculeSvg || null,
          tempsReparation: choc.tempsReparation,
          tauxHoraire: choc.tauxHoraire || 4000, // ✅ Taux horaire par choc (défaut 4000 CFA)
          montantPeinture: choc.montantPeinture || 0,
          ordre: i + 1,
        }, { transaction });

        console.log(`✅ Choc ${i + 1} créé`);

        // 5. CRÉER LES FOURNITURES DU CHOC
        if (choc.fournitures && choc.fournitures.length > 0) {
          for (const fourniture of choc.fournitures) {
            await Fourniture.create({
              chocId: chocCreated.id,
              designation: fourniture.designation,
              reference: fourniture.reference || null,
              quantite: fourniture.quantite || 1,
              prixUnitaire: fourniture.prixUnitaire || 0,
              prixTotal: (fourniture.quantite || 1) * (fourniture.prixUnitaire || 0),
            }, { transaction });
          }
          console.log(`✅ ${choc.fournitures.length} fourniture(s) créée(s) pour le choc ${i + 1}`);
        }
      }
    }

    // Commit de la transaction
    await transaction.commit();
    console.log('✅ Transaction commitée');

    // Recharger le rapport avec toutes les relations
    const rapportComplet = await Rapport.findByPk(rapportId, { // ✅ Utiliser rapportId directement
      include: [
        { model: Bureau, as: 'bureau' },
        { model: Vehicule, as: 'vehicule' },
        { model: Assure, as: 'assure' },
        { 
          model: Choc, 
          as: 'chocs',
          include: [{ model: Fourniture, as: 'fournitures' }]
        },
      ],
    });

    res.status(201).json(rapportComplet);
    
  } catch (error: any) {
    // Rollback en cas d'erreur
    await transaction.rollback();
    
    console.error('❌ Erreur création rapport:', error);
    
    res.status(500).json({ 
      message: 'Erreur lors de la création du rapport',
      error: error.message,
      details: error.errors ? error.errors.map((e: any) => e.message) : []
    });
  }
};

// Récupérer tous les rapports
export const getAllRapports = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, statut, typeRapport, page = 1, limit = 20 } = req.query;
    const offset = ((page as number) - 1) * (limit as number);

    const where: any = {};
    
    if (statut) where.statut = statut;
    if (typeRapport) where.typeRapport = typeRapport;

    const { count, rows } = await Rapport.findAndCountAll({
      where,
      include: [
        { model: Bureau, as: 'bureau' },
        { model: Vehicule, as: 'vehicule' },
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit as string),
      offset,
    });

    res.json({
      rapports: rows,
      total: count,
      page: parseInt(page as string),
      totalPages: Math.ceil(count / parseInt(limit as string)),
    });
  } catch (error: any) {
    console.error('Erreur récupération rapports:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des rapports',
      error: error.message 
    });
  }
};

// Récupérer un rapport par ID
export const getRapportById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const rapport = await Rapport.findByPk(id, {
      include: [
        { model: Bureau, as: 'bureau' },
        { model: Vehicule, as: 'vehicule' },
        { model: Assure, as: 'assure' },
        { 
          model: Choc, 
          as: 'chocs',
          include: [{ model: Fourniture, as: 'fournitures' }]
        },
      ],
    });

    if (!rapport) {
      res.status(404).json({ message: 'Rapport non trouvé' });
      return;
    }

    res.json(rapport);
  } catch (error: any) {
    console.error('Erreur récupération rapport:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du rapport',
      error: error.message 
    });
  }
};

// Mettre à jour un rapport
export const updateRapport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const rapport = await Rapport.findByPk(id);
    
    if (!rapport) {
      res.status(404).json({ message: 'Rapport non trouvé' });
      return;
    }

    await rapport.update(updates);

    res.json({ message: 'Rapport mis à jour', rapport });
  } catch (error: any) {
    console.error('Erreur mise à jour rapport:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du rapport',
      error: error.message 
    });
  }
};

// Supprimer un rapport
export const deleteRapport = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;

    const rapport = await Rapport.findByPk(id);
    
    if (!rapport) {
      await transaction.rollback();
      res.status(404).json({ message: 'Rapport non trouvé' });
      return;
    }

    await rapport.destroy({ transaction });
    
    await transaction.commit();

    res.json({ message: 'Rapport supprimé avec succès' });
  } catch (error: any) {
    await transaction.rollback();
    console.error('Erreur suppression rapport:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la suppression du rapport',
      error: error.message 
    });
  }
};
