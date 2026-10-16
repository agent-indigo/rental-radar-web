import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import {Session} from 'better-auth'
import createId from '@/utilities/createId'
import sequelize from '@/configuration/sequelize'
const sessionSqlModel: ModelStatic<Model<Session>> = sequelize.models.Session ?? sequelize.define<Model<Session>>(
  'Session', {
    ...createId(),
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now()
    },
    ipAddress: {
      type: DataTypes.STRING,
      validate: {
        isIP: true
      }
    },
    userAgent: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'sessions',
    timestamps: true
  }
)
export default sessionSqlModel