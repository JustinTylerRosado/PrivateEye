import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Company extends Model {
  public id!: number;
  public name!: string;
  public website!: string;
  public industry!: string;
  public location!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    industry: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'companies',
    timestamps: true,
  }
);