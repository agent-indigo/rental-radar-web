import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import createId from '@/utilities/createId'
import sequelize from '@/configuration/sequelize'
import Inquiry from '@/types/Inquiry'
const inquirySqlModel: ModelStatic<Model<Inquiry>> = sequelize.models.Inquiry ?? sequelize.define<Model<Inquiry>>(
  'Inquiry', {
    ...createId(),
    sender: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    recipient: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    listing: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Listing',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    senderName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senderEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    senderPhone: {
      type: DataTypes.STRING
    },
    body: {
      type: DataTypes.TEXT
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'inquiries',
    timestamps: true
  }
)
export default inquirySqlModel