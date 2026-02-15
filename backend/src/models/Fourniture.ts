import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface FournitureAttributes {
  id: string;
  chocId: string;
  designation: string;
  reference?: string;
  quantite: number;
  prixUnitaire: number;
  prixTotal: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FournitureCreationAttributes extends Optional<FournitureAttributes, 'id'> {}

class Fourniture extends Model<FournitureAttributes, FournitureCreationAttributes> implements FournitureAttributes {
  public id!: string;
  public chocId!: string;
  public designation!: string;
  public reference?: string;
  public quantite!: number;
  public prixUnitaire!: number;
  public prixTotal!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Fourniture.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    chocId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'chocs',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    designation: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    prixUnitaire: {
      type: DataTypes.DECIMAL(15, 2), // ✅ CORRIGÉ : 15 chiffres
      allowNull: false,
      defaultValue: 0,
    },
    prixTotal: {
      type: DataTypes.DECIMAL(15, 2), // ✅ CORRIGÉ : 15 chiffres
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'fournitures',
    timestamps: true,
  }
);

export default Fourniture;
