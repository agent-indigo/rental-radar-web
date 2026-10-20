import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import createId from '@/utilities/createId'
import sequelize from '@/configuration/sequelize'
import Listing from '@/types/Listing'
const listingSqlModel: ModelStatic<Model<Listing>> = sequelize.models.listing ?? sequelize.define<Model<Listing>>(
  'listing', {
    ...createId(),
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    beds: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    baths: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sqft: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nightlyRate: {
      type: DataTypes.INTEGER
    },
    weeklyRate: {
      type: DataTypes.INTEGER
    },
    monthlyRate: {
      type: DataTypes.INTEGER
    },
    ownerPhone: {
      type: DataTypes.STRING
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: true
  }
)
export default listingSqlModel