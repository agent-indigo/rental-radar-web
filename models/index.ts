import fs from 'fs'
import path from 'path'
import {Sequelize} from 'sequelize'
import sequelize from '@/config/sequelize'
import Db from '@/types/Db'
const db: Db = {
  Sequelize,
  sequelize
}
const url: URL = new URL(
  '.',
  import.meta.url
)
fs.readdirSync(url).filter((fileName: String): boolean => (
  fileName.indexOf('.') !== 0 &&
  fileName !== path.basename(url.toString()) &&
  fileName.slice(-11) === 'SqlModel.ts' &&
  fileName.indexOf('.test') === -1
)).map(async (file: string): Promise<void> => {
  const model: any = await import(path.join(
    url.toString(),
    file
  ))
  db[model.default.name] = model.default
})
Object.keys(db).map((modelName: string): void => db[modelName].associate && db[modelName].associate(db))
export default db