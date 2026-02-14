import { DataTypes, Model, Sequelize } from 'sequelize';

export interface FournitureAttributes {
  id: string;
  chocId: string;
  designation: string;
  reference?: string | null;
  quantite: number;
  prixUnitaire: number;
  prixTotal: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Fourniture extends Model<FournitureAttributes> implements FournitureAttributes {
  public id!: string;
  public chocId!: string;
  public designation!: string;
  public reference!: string | null;
  public quantite!: number;
  public prixUnitaire!: number;
  public prixTotal!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initFourniture = (sequelize: Sequelize): typeof Fourniture => {
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
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      prixTotal: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'fournitures',
      timestamps: true,
      underscored: true,
    }
  );

  return Fourniture;
};
