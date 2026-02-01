import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface BureauAttributes {
  id: string;
  code: string;
  nomAgence: string;
  responsableSinistres?: string;
  telephone?: string;
  email?: string;
  adresse?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BureauCreationAttributes extends Optional<BureauAttributes, 'id'> {}

class Bureau extends Model<BureauAttributes, BureauCreationAttributes> implements BureauAttributes {
  public id!: string;
  public code!: string;
  public nomAgence!: string;
  public responsableSinistres?: string;
  public telephone?: string;
  public email?: string;
  public adresse?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bureau.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    nomAgence: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    responsableSinistres: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    adresse: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'bureaux',
    timestamps: true,
  }
);

export default Bureau;
