import { Sequelize } from 'sequelize';
import { initBureau } from './Bureau';
import { initUser } from './User';
import { initRapport } from './Rapport';
import { initVehicule } from './Vehicule';
import { initAssure } from './Assure';
import { initChoc } from './Choc';
import { initFourniture } from './Fourniture';

// Sequelize instance (à initialiser depuis config)
export const sequelize = new Sequelize(
  process.env.DATABASE_URL || '',
  {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Initialiser tous les modèles
export const Bureau = initBureau(sequelize);
export const User = initUser(sequelize);
export const Rapport = initRapport(sequelize);
export const Vehicule = initVehicule(sequelize);
export const Assure = initAssure(sequelize);
export const Choc = initChoc(sequelize);
export const Fourniture = initFourniture(sequelize);

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

// Export tous les modèles
export default {
  sequelize,
  Sequelize,
  Bureau,
  User,
  Rapport,
  Vehicule,
  Assure,
  Choc,
  Fourniture,
};
