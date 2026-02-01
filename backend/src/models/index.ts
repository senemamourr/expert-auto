import User from './User';
import Bureau from './Bureau';
import Rapport from './Rapport';
import Vehicule from './Vehicule';

// Définition des relations

// User <-> Rapport (1:N)
User.hasMany(Rapport, {
  foreignKey: 'userId',
  as: 'rapports',
});
Rapport.belongsTo(User, {
  foreignKey: 'userId',
  as: 'expert',
});

// Bureau <-> Rapport (1:N)
Bureau.hasMany(Rapport, {
  foreignKey: 'bureauId',
  as: 'rapports',
});
Rapport.belongsTo(Bureau, {
  foreignKey: 'bureauId',
  as: 'bureau',
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

export { User, Bureau, Rapport, Vehicule };

export const syncDatabase = async (force: boolean = false) => {
  try {
    await User.sync({ force });
    await Bureau.sync({ force });
    await Rapport.sync({ force });
    await Vehicule.sync({ force });
    console.log('✅ Base de données synchronisée avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation de la base de données:', error);
    throw error;
  }
};
