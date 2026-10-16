import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import {Verification} from 'better-auth'
import createId from '@/utilities/createId'
import sequelize from '@/configuration/sequelize'
const verificationSqlModel: ModelStatic<Model<Verification>> = sequelize.models.Verification ?? sequelize.define<Model<Verification>>(
  'Verification', {
    ...createId(),
    identifier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'verifications',
    timestamps: true
  }
)
export default verificationSqlModel