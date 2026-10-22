import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import createId from '@/utilities/createId'
import sequelize from '@/connectors/sequelize'
import Inquiry from '@/types/Inquiry'
const inquirySqlModel: ModelStatic<Model<Inquiry>> = sequelize.models.inquiry ?? sequelize.define<Model<Inquiry>>(
  'inquiry', {
    ...createId(),
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    recipientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'listing',
        key: 'id'
      },
      onDelete: 'CASCADE'
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
    timestamps: true
  }
)
export default inquirySqlModel