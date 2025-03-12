import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Note extends Model {
  public id!: number;
  public application_id!: number;
  public user_id!: number;
  public note!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    application_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'notes',
    timestamps: true,
  }
);