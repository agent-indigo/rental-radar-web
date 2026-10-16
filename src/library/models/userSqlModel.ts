import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import createId from '@/utilities/createId'
import sequelize from '@/configuration/sequelize'
import User from '@/types/User'
import connectToSqlDb from '@/utilities/connectToSqlDb'
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
    timestamps: true,
    hooks: {
      beforeCreate: async (user: Model<User>): Promise<void> => {
        await connectToSqlDb()
        if (await userSqlModel.count({
          where: {
            role: 'root'
          }
        }) > 0) {
          throw new Error('The root user already exists.')
        } else {
          user.setDataValue(
            'role',
            'root'
          )
        }
      },
      beforeDestroy: (user: Model<User>): void => {
        if (user.getDataValue('role') === 'root') throw new Error('The root user shouldn\'t be deleted.')
      }
    }
  }
)
export default userSqlModel