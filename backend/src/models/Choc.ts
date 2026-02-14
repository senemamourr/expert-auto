import { DataTypes, Model, Sequelize } from 'sequelize';

export interface ChocAttributes {
  id: string;
  rapportId: string;
  nomChoc: string;
  description: string;
  modeleVehiculeSvg?: string | null;
  tempsReparation: number;
  montantPeinture: number;
  ordre: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Choc extends Model<ChocAttributes> implements ChocAttributes {
  public id!: string;
  public rapportId!: string;
  public nomChoc!: string;
  public description!: string;
  public modeleVehiculeSvg!: string | null;
  public tempsReparation!: number;
  public montantPeinture!: number;
  public ordre!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initChoc = (sequelize: Sequelize): typeof Choc => {
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
      montantPeinture: {
        type: DataTypes.DECIMAL(12, 2),
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
      underscored: true,
    }
  );

  return Choc;
};
