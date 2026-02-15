import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ChocAttributes {
  id: string;
  rapportId: string;
  nomChoc: string;
  description: string;
  modeleVehiculeSvg?: string;
  tempsReparation: number; // En heures
  tauxHoraire: number; // ✅ NOUVEAU : Prix de la main d'œuvre horaire pour ce choc
  montantPeinture: number;
  ordre: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ChocCreationAttributes extends Optional<ChocAttributes, 'id'> {}

class Choc extends Model<ChocAttributes, ChocCreationAttributes> implements ChocAttributes {
  public id!: string;
  public rapportId!: string;
  public nomChoc!: string;
  public description!: string;
  public modeleVehiculeSvg?: string;
  public tempsReparation!: number;
  public tauxHoraire!: number; // ✅ NOUVEAU
  public montantPeinture!: number;
  public ordre!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Choc.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rapportId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'rapports',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    nomChoc: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    modeleVehiculeSvg: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tempsReparation: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      defaultValue: 0,
    },
    tauxHoraire: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 4000, // Valeur par défaut : 4000 CFA/heure
      comment: 'Prix de la main d\'œuvre horaire pour ce choc spécifique',
    },
    montantPeinture: {
      type: DataTypes.DECIMAL(15, 2), // ✅ Augmenté à 15 chiffres
      allowNull: false,
      defaultValue: 0,
    },
    ordre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: 'chocs',
    timestamps: true,
  }
);

export default Choc;
