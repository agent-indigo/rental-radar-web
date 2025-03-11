import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import createId from '@/utilities/createId'
import sequelize from '@/config/sequelize'
import UserSqlRecord from '@/types/UserSqlRecord'
const userSqlModel: ModelStatic<Model<UserSqlRecord>> = sequelize.models.User ?? sequelize.define<Model<UserSqlRecord>>(
  'User', {
    ...createId(),
    email: {
      type: DataTypes.STRING,
      unique: [
        true,
        'A user with this email address already exists.'
      ],
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM(
        'admin',
        'dev',
        'root',
        'user'
      ),
      allowNull: false,
      defaultValue: 'user'
    },
    advertisedEstates: {
      type: [DataTypes.STRING],
      references: {
        model: 'Estate',
        key: 'id'
      }
    },
    advertisedVehicles: {
      type: [DataTypes.STRING],
      references: {
        model: 'Vehicle',
        key: 'id'
      }
    },
    bookmarkedEstates: {
      type: [DataTypes.STRING],
      references: {
        model: 'Estate',
        key: 'id'
      }
    },
    bookmarkedVehicles: {
      type: [DataTypes.STRING],
      references: {
        model: 'Vehicle',
        key: 'id'
      }
    },
    invoices: {
      type: [DataTypes.STRING],
      references: {
        model: 'Invoice',
        key: 'id'
      }
    },
    payments: {
      type: [DataTypes.STRING],
      references: {
        model: 'Payment',
        key: 'id'
      }
    }
  }, {
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user: Model<UserSqlRecord>): Promise<void> => {
        if (user.get('role') === 'root') if (await userSqlModel.findOne({
          where: {
            role: 'root'
          }
        })) throw new Error('The root user already exists.')
      },
      beforeDestroy: async (user: Model<UserSqlRecord>): Promise<void> => {
        if (user.get('role') === 'root') throw new Error('The root user shouldn\'t be deleted.')
      }
    }
  }
)
export default userSqlModel