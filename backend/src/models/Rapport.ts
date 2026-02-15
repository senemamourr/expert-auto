import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface RapportAttributes {
  id: string;
  typeRapport: 'ESTIMATIF_REPARATION' | 'VALEUR_VENALE' | 'TIERCE_EXPERTISE';
  numeroOrdreService: string;
  bureauId: string;
  numeroSinistre: string;
  dateSinistre: Date;
  dateVisite: Date;
  statut: 'BROUILLON' | 'EN_COURS' | 'TERMINE' | 'ARCHIVE';
  montantTotal: number;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RapportCreationAttributes extends Optional<RapportAttributes, 'id'> {}

class Rapport extends Model<RapportAttributes, RapportCreationAttributes> implements RapportAttributes {
  public id!: string;
  public typeRapport!: 'ESTIMATIF_REPARATION' | 'VALEUR_VENALE' | 'TIERCE_EXPERTISE';
  public numeroOrdreService!: string;
  public bureauId!: string;
  public numeroSinistre!: string;
  public dateSinistre!: Date;
  public dateVisite!: Date;
  public statut!: 'BROUILLON' | 'EN_COURS' | 'TERMINE' | 'ARCHIVE';
  public montantTotal!: number;
  public userId?: string;
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
      type: DataTypes.ENUM('ESTIMATIF_REPARATION', 'VALEUR_VENALE', 'TIERCE_EXPERTISE'),
      allowNull: false,
    },
    numeroOrdreService: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dateSinistre: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateVisite: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    statut: {
      type: DataTypes.ENUM('BROUILLON', 'EN_COURS', 'TERMINE', 'ARCHIVE'),
      defaultValue: 'BROUILLON',
      allowNull: false,
    },
    montantTotal: {
      type: DataTypes.DECIMAL(15, 2), // ✅ CORRIGÉ : 15 chiffres au lieu de 10
      defaultValue: 0,
      allowNull: false,
      comment: 'Montant total du rapport (peut atteindre 999 999 999 999 999,99)',
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
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
  }
);

export default Rapport;
