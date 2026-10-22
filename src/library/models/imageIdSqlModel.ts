import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import createId from '@/utilities/createId'
import sequelize from '@/connectors/sequelize'
import ImageId from '@/types/ImageId'
const imageIdSqlModel: ModelStatic<Model<ImageId>> = sequelize.models.imageId ?? sequelize.define<Model<ImageId>>(
  'imageId', {
    ...createId(),
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'listing',
        key: 'id'
      }
    },
    imageId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: true
  }
)
export default imageIdSqlModel