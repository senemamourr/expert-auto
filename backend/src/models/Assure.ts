import { DataTypes, Model, Sequelize } from 'sequelize';

export interface AssureAttributes {
  id: string;
  rapportId: string;
  nom: string;
  prenom: string;
  telephone: string;
  email?: string | null;
  adresse: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Assure extends Model<AssureAttributes> implements AssureAttributes {
  public id!: string;
  public rapportId!: string;
  public nom!: string;
  public prenom!: string;
  public telephone!: string;
  public email!: string | null;
  public adresse!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initAssure = (sequelize: Sequelize): typeof Assure => {
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

  return Assure;
};
