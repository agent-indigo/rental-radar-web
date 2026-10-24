import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import createId from '@/utilities/createId'
import sequelize from '@/connectors/sequelize'
import ImageUrl from '@/types/ImageUrl'
const imageUrlSqlModel: ModelStatic<Model<ImageUrl>> = sequelize.models.imageUrl ?? sequelize.define<Model<ImageUrl>>(
  'imageUrl', {
    ...createId(),
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'listing',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUrl: true
      }
    }
  }, {
    timestamps: true
  }
)
export default imageUrlSqlModel