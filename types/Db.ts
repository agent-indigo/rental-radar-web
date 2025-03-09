import {Sequelize} from 'sequelize'
export default interface Db {
  Sequelize: typeof Sequelize
  sequelize: Sequelize
  [modelName: string]: any
}