import fs from 'fs'
import path from 'path'
import {Sequelize} from 'sequelize'
import sequelize from '@/connectors/sequelize'
import Database from '@/types/Database'
const database: Database = {
  Sequelize,
  sequelize
}
const url: URL = new URL(
  '.',
  import.meta.url
)
fs.readdirSync(url).filter((fileName: string): boolean => (
  fileName.indexOf('.') !== 0 &&
  fileName !== path.basename(url.toString()) &&
  fileName.slice(-11) === 'SqlModel.ts' &&
  fileName.indexOf('.test') === -1
)).map(async (file: string): Promise<void> => {
  const model = await import(path.join(
    url.toString(),
    file
  ))
  database[model.default.name] = model.default
})
Object.keys(database).map((modelName: string): void => database[modelName].associate && database[modelName].associate(database))
export default database