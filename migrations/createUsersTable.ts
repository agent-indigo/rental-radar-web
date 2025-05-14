import {
  DataTypes,
  Model,
  QueryInterface
} from 'sequelize'
import createId from '@/utilities/createId'
import UserSqlRecord from '@/types/UserSqlRecord'
import createTimeStamps from '@/utilities/createTimeStamps'
export const up = async (queryInterface: QueryInterface): Promise<void> => await queryInterface.createTable<Model<UserSqlRecord>>(
  'users', {
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
      type: DataTypes.STRING
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
    },
    ...createTimeStamps()
  }
)
export const down = async (queryInterface: QueryInterface): Promise<void> => await queryInterface.dropTable('users')