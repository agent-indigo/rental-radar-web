import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import {Account} from 'better-auth'
import createId from '@/utilities/createId'
import sequelize from '@/configuration/sequelize'
const accountSqlModel: ModelStatic<Model<Account>> = sequelize.models.Account ?? sequelize.define<Model<Account>>(
  'Account', {
    ...createId(),
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    accountId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    providerId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accessToken: {
      type: DataTypes.STRING
    },
    refreshToken: {
      type: DataTypes.STRING
    },
    accessTokenExpiresAt: {
      type: DataTypes.DATE
    },
    refreshTokenExpiresAt: {
      type: DataTypes.DATE
    },
    scope: {
      type: DataTypes.STRING
    },
    idToken: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'accounts',
    timestamps: true
  }
)
export default accountSqlModel