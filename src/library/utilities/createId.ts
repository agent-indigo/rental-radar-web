import {DataTypes} from 'sequelize'
const createId = (): object => {
  return {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
  }
}
export default createId