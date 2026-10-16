import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import createId from '@/utilities/createId'
import sequelize from '@/configuration/sequelize'
import User from '@/types/User'
const userSqlModel: ModelStatic<Model<User>> = sequelize.models.User ?? sequelize.define<Model<User>>(
  'User', {
    ...createId(),
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    bookmarkedListings: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      defaultValue: [],
      references: {
        model: 'Listing',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: true
  }
)
export default userSqlModel