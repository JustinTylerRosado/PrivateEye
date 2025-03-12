import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Interview extends Model {
  public id!: number;
  public application_id!: number;
  public interview_date!: Date;
  public interviewer!: string;
  public interview_notes!: string;
  public outcome!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Interview.init(
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
    interview_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    interviewer: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    interview_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    outcome: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'Pending',
      validate: {
        isIn: [['Pending', 'Passed', 'Failed']],
      },
    },
  },
  {
    sequelize,
    tableName: 'interviews',
    timestamps: true,
  }
);