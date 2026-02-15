import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface VehiculeAttributes {
  id: string;
  rapportId: string;
  marque: string;
  type: string;
  genre: string;
  immatriculation: string;
  numeroChassis: string; // ✅ 2 's'
  kilometrage: number;
  dateMiseCirculation: Date;
  couleur: string;
  sourceEnergie: string;
  puissanceFiscale: number;
  valeurNeuve: number;
  chargeUtile?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface VehiculeCreationAttributes extends Optional<VehiculeAttributes, 'id'> {}

class Vehicule extends Model<VehiculeAttributes, VehiculeCreationAttributes> implements VehiculeAttributes {
  public id!: string;
  public rapportId!: string;
  public marque!: string;
  public type!: string;
  public genre!: string;
  public immatriculation!: string;
  public numeroChassis!: string; // ✅ 2 's'
  public kilometrage!: number;
  public dateMiseCirculation!: Date;
  public couleur!: string;
  public sourceEnergie!: string;
  public puissanceFiscale!: number;
  public valeurNeuve!: number;
  public chargeUtile?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Vehicule.init(
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
    marque: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    immatriculation: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    numeroChassis: { // ✅ 2 's'
      type: DataTypes.STRING(17),
      allowNull: false,
      validate: {
        len: [17, 17],
      },
    },
    kilometrage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateMiseCirculation: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    couleur: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    sourceEnergie: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    puissanceFiscale: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valeurNeuve: {
      type: DataTypes.DECIMAL(15, 2), // ✅ CORRIGÉ : 15 chiffres
      allowNull: false,
    },
    chargeUtile: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'vehicules',
    timestamps: true,
    underscored: true,
  }
);

export default Vehicule;
