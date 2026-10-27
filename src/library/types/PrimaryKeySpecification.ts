import {AbstractDataTypeConstructor} from 'sequelize'
export default interface PrimaryKeySpecification {
  id: {
    type: AbstractDataTypeConstructor
    allowNull: boolean
    primaryKey: boolean
    defaultValue: AbstractDataTypeConstructor
  }
}