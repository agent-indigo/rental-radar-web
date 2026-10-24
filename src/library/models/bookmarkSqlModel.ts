import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import createId from '@/utilities/createId'
import sequelize from '@/connectors/sequelize'
import Bookmark from '@/types/Bookmark'
const bookmarkSqlModel: ModelStatic<Model<Bookmark>> = sequelize.models.bookmark ?? sequelize.define<Model<Bookmark>>(
  'bookmark', {
    ...createId(),
    userId: {
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
    }
  }, {
    timestamps: true
  }
)
export default bookmarkSqlModel