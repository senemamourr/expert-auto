import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export enum TypeRapport {
  ESTIMATIF_REPARATION = 'estimatif_reparation',
  VALEUR_VENALE = 'valeur_venale',
  TIERCE_EXPERTISE = 'tierce_expertise',
}

export enum StatutRapport {
  BROUILLON = 'brouillon',
  EN_COURS = 'en_cours',
  TERMINE = 'termine',
  ARCHIVE = 'archive',
}

interface RapportAttributes {
  id: string;
  typeRapport: TypeRapport;
  numeroOrdreService?: string;
  bureauId: string;
  numeroSinistre: string;
  dateSinistre: Date;
  dateVisite?: Date;
  statut: StatutRapport;
  montantTotal?: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RapportCreationAttributes extends Optional<RapportAttributes, 'id'> {}

class Rapport extends Model<RapportAttributes, RapportCreationAttributes> implements RapportAttributes {
  public id!: string;
  public typeRapport!: TypeRapport;
  public numeroOrdreService?: string;
  public bureauId!: string;
  public numeroSinistre!: string;
  public dateSinistre!: Date;
  public dateVisite?: Date;
  public statut!: StatutRapport;
  public montantTotal?: number;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Rapport.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    typeRapport: {
      type: DataTypes.ENUM(...Object.values(TypeRapport)),
      allowNull: false,
    },
    numeroOrdreService: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    bureauId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'bureaux',
        key: 'id',
      },
    },
    numeroSinistre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dateSinistre: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dateVisite: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    statut: {
      type: DataTypes.ENUM(...Object.values(StatutRapport)),
      allowNull: false,
      defaultValue: StatutRapport.BROUILLON,
    },
    montantTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'rapports',
    timestamps: true,
    indexes: [
      {
        fields: ['numeroSinistre'],
      },
      {
        fields: ['statut'],
      },
      {
        fields: ['userId'],
      },
    ],
  }
);

export default Rapport;
