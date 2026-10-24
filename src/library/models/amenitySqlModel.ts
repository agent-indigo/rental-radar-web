import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import createId from '@/utilities/createId'
import sequelize from '@/connectors/sequelize'
import Amenity from '@/types/Amenity'
const amenitySqlModel: ModelStatic<Model<Amenity>> = sequelize.models.amenity ?? sequelize.define<Model<Amenity>>(
  'amenity', {
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
    amenity: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true
  }
)
export default amenitySqlModel