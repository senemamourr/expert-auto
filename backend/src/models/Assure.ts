import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface AssureAttributes {
  id: string;
  rapportId: string;
  nom: string;
  prenom: string;
  telephone: string;
  email?: string;
  adresse: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AssureCreationAttributes extends Optional<AssureAttributes, 'id'> {}

class Assure extends Model<AssureAttributes, AssureCreationAttributes> implements AssureAttributes {
  public id!: string;
  public rapportId!: string;
  public nom!: string;
  public prenom!: string;
  public telephone!: string;
  public email?: string;
  public adresse!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Assure.init(
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
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: false,
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
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'assures',
    timestamps: true,
    underscored: true,
  }
);

export default Assure;
