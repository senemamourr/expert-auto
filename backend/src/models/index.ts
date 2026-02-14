import Bureau from './Bureau';
import User from './User';
import Rapport from './Rapport';
import Vehicule from './Vehicule';
import Assure from './Assure';
import Choc from './Choc';
import Fourniture from './Fourniture';
import sequelize from '../config/database';

// ============================================
// DÉFINIR TOUTES LES ASSOCIATIONS (RELATIONS)
// ============================================

// Bureau <-> Rapports
Bureau.hasMany(Rapport, {
  foreignKey: 'bureauId',
  as: 'rapports',
  onDelete: 'CASCADE',
});
Rapport.belongsTo(Bureau, {
  foreignKey: 'bureauId',
  as: 'bureau',
});

// User <-> Rapports  
User.hasMany(Rapport, {
  foreignKey: 'userId',
  as: 'rapports',
});
Rapport.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// Rapport <-> Vehicule (1:1)
Rapport.hasOne(Vehicule, {
  foreignKey: 'rapportId',
  as: 'vehicule',
  onDelete: 'CASCADE',
});
Vehicule.belongsTo(Rapport, {
  foreignKey: 'rapportId',
  as: 'rapport',
});

// Rapport <-> Assure (1:1)
Rapport.hasOne(Assure, {
  foreignKey: 'rapportId',
  as: 'assure',
  onDelete: 'CASCADE',
});
Assure.belongsTo(Rapport, {
  foreignKey: 'rapportId',
  as: 'rapport',
});

// Rapport <-> Chocs (1:N)
Rapport.hasMany(Choc, {
  foreignKey: 'rapportId',
  as: 'chocs',
  onDelete: 'CASCADE',
});
Choc.belongsTo(Rapport, {
  foreignKey: 'rapportId',
  as: 'rapport',
});

// Choc <-> Fournitures (1:N)
Choc.hasMany(Fourniture, {
  foreignKey: 'chocId',
  as: 'fournitures',
  onDelete: 'CASCADE',
});
Fourniture.belongsTo(Choc, {
  foreignKey: 'chocId',
  as: 'choc',
});

// ============================================
// FONCTION DE SYNCHRONISATION
// ============================================

export const syncDatabase = async (alter: boolean = false): Promise<void> => {
  try {
    if (alter) {
      await sequelize.sync({ alter: true });
      console.log('✅ Base de données synchronisée (mode: alter)');
    } else {
      await sequelize.sync();
      console.log('✅ Base de données synchronisée (mode: safe)');
    }
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
    throw error;
  }
};

// Export des modèles
export {
  sequelize,
  Bureau,
  User,
  Rapport,
  Vehicule,
  Assure,
  Choc,
  Fourniture,
};

export default {
  sequelize,
  Bureau,
  User,
  Rapport,
  Vehicule,
  Assure,
  Choc,
  Fourniture,
  syncDatabase,
};
