import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';

export enum UserRole {
  ADMIN = 'admin',
  EXPERT = 'expert',
  ASSISTANT = 'assistant',
}

interface UserAttributes {
  id: string;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public nom!: string;
  public prenom!: string;
  public role!: UserRole;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Méthode pour comparer les mots de passe
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    if (!this.password || !candidatePassword) {
      throw new Error('Password or candidate password is missing');
    }
    return bcrypt.compare(candidatePassword, this.password);
  }

  // Masquer le mot de passe dans les réponses JSON
  public toJSON(): Omit<UserAttributes, 'password'> {
    const values = Object.assign({}, this.get()) as any;
    delete values.password;
    return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.EXPERT,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        console.log('🔒 Hook beforeCreate - Hashing password...');
        if (user.password) {
          const salt = await bcrypt.genSalt(12);
          const hashedPassword = await bcrypt.hash(user.password, salt);
          user.password = hashedPassword;
          console.log('✅ Password hashed successfully');
        } else {
          console.error('❌ No password provided to hash!');
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password') && user.password) {
          console.log('🔒 Hook beforeUpdate - Hashing password...');
          const salt = await bcrypt.genSalt(12);
          const hashedPassword = await bcrypt.hash(user.password, salt);
          user.password = hashedPassword;
          console.log('✅ Password hashed successfully');
        }
      },
    },
  }
);

export default User;
