// backend/src/controllers/rapportsController.js

const { Rapport, Vehicule, Assure, Choc, Fourniture, Bureau } = require('../models');
const { sequelize } = require('../config/database');

// Créer un nouveau rapport
exports.create = async (req, res) => {
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
      return res.status(400).json({ 
        message: 'Champs obligatoires manquants',
        required: ['typeRapport', 'numeroOrdreService', 'bureauId', 'numeroSinistre']
      });
    }

    // 1. CRÉER LE RAPPORT D'ABORD
    const rapport = await Rapport.create({
      typeRapport,
      numeroOrdreService,
      bureauId,
      numeroSinistre,
      dateSinistre,
      dateVisite,
      statut: statut || 'BROUILLON',
      montantTotal: montantTotal || 0,
      userId: req.user?.id, // Si vous avez l'authentification
    }, { transaction });

    // 2. CRÉER LE VÉHICULE (maintenant rapportId existe)
    if (vehicule) {
      await Vehicule.create({
        rapportId: rapport.id, // ✅ Maintenant rapportId existe !
        marque: vehicule.marque,
        type: vehicule.type,
        genre: vehicule.genre,
        immatriculation: vehicule.immatriculation,
        numeroChasis: vehicule.numeroChasis,
        kilometrage: vehicule.kilometrage,
        dateMiseCirculation: vehicule.dateMiseCirculation,
        couleur: vehicule.couleur,
        sourceEnergie: vehicule.sourceEnergie,
        puissanceFiscale: vehicule.puissanceFiscale,
        valeurNeuve: vehicule.valeurNeuve,
        chargeUtile: vehicule.chargeUtile || null,
      }, { transaction });
    }

    // 3. CRÉER L'ASSURÉ
    if (assure) {
      await Assure.create({
        rapportId: rapport.id,
        nom: assure.nom,
        prenom: assure.prenom,
        telephone: assure.telephone,
        email: assure.email || null,
        adresse: assure.adresse,
      }, { transaction });
    }

    // 4. CRÉER LES CHOCS
    if (chocs && chocs.length > 0) {
      for (let i = 0; i < chocs.length; i++) {
        const choc = chocs[i];
        
        const chocCreated = await Choc.create({
          rapportId: rapport.id,
          nomChoc: choc.nomChoc,
          description: choc.description,
          modeleVehiculeSvg: choc.modeleVehiculeSvg || null,
          tempsReparation: choc.tempsReparation,
          montantPeinture: choc.montantPeinture || 0,
          ordre: i + 1,
        }, { transaction });

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
        }
      }
    }

    // Commit de la transaction
    await transaction.commit();

    // Recharger le rapport avec toutes les relations
    const rapportComplet = await Rapport.findByPk(rapport.id, {
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
    
  } catch (error) {
    // Rollback en cas d'erreur
    await transaction.rollback();
    
    console.error('❌ Erreur création rapport:', error);
    
    res.status(500).json({ 
      message: 'Erreur lors de la création du rapport',
      error: error.message,
      details: error.errors ? error.errors.map(e => e.message) : []
    });
  }
};

// Récupérer tous les rapports
exports.getAll = async (req, res) => {
  try {
    const { search, statut, typeRapport, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    
    if (search) {
      where[Op.or] = [
        { numeroSinistre: { [Op.iLike]: `%${search}%` } },
        { numeroOrdreService: { [Op.iLike]: `%${search}%` } },
      ];
    }
    
    if (statut) where.statut = statut;
    if (typeRapport) where.typeRapport = typeRapport;

    const { count, rows } = await Rapport.findAndCountAll({
      where,
      include: [
        { model: Bureau, as: 'bureau' },
        { model: Vehicule, as: 'vehicule' },
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset,
    });

    res.json({
      rapports: rows,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error('Erreur récupération rapports:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des rapports',
      error: error.message 
    });
  }
};

// Récupérer un rapport par ID
exports.getById = async (req, res) => {
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
      return res.status(404).json({ message: 'Rapport non trouvé' });
    }

    res.json(rapport);
  } catch (error) {
    console.error('Erreur récupération rapport:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du rapport',
      error: error.message 
    });
  }
};

// Mettre à jour le statut
exports.updateStatut = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut, commentaire } = req.body;

    const rapport = await Rapport.findByPk(id);
    
    if (!rapport) {
      return res.status(404).json({ message: 'Rapport non trouvé' });
    }

    await rapport.update({ statut });

    res.json({ message: 'Statut mis à jour', rapport });
  } catch (error) {
    console.error('Erreur mise à jour statut:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du statut',
      error: error.message 
    });
  }
};

// Supprimer un rapport
exports.delete = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;

    const rapport = await Rapport.findByPk(id);
    
    if (!rapport) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Rapport non trouvé' });
    }

    // Sequelize supprimera automatiquement les relations avec onDelete: 'CASCADE'
    await rapport.destroy({ transaction });
    
    await transaction.commit();

    res.json({ message: 'Rapport supprimé avec succès' });
  } catch (error) {
    await transaction.rollback();
    console.error('Erreur suppression rapport:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la suppression du rapport',
      error: error.message 
    });
  }
};
