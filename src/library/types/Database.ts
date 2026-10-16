import {Sequelize} from 'sequelize'
export default interface Database {
  Sequelize: typeof Sequelize
  sequelize: Sequelize
  [modelName: string]: any
}