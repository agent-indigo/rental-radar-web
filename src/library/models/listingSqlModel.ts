import {
  DataTypes,
  Model,
  ModelStatic
} from 'sequelize'
import createId from '@/utilities/createId'
import sequelize from '@/configuration/sequelize'
import Listing from '@/types/Listing'
const listingSqlModel: ModelStatic<Model<Listing>> = sequelize.models.Listing ?? sequelize.define<Model<Listing>>(
  'Listing', {
    ...createId(),
    owner: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
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
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: []
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
    ownerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ownerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    ownerPhone: {
      type: DataTypes.STRING
    },
    imageUrls: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
      validate: {
        isUrl: true
      }
    },
    imageIds: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: []
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'listings',
    timestamps: true
  }
)
export default listingSqlModel