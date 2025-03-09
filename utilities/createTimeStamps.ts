import {DataTypes} from 'sequelize'
const createTimeStamps: Function = (): object => {
  return {
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }
}
export default createTimeStamps