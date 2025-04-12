import {readdirSync} from 'fs'
import {
  basename,
  join
} from 'path'
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
for (const file of readdirSync(url).filter((fileName: String): boolean => (
  fileName.indexOf('.') !== 0 &&
  fileName !== basename(url.toString()) &&
  fileName.slice(-11) === 'SqlModel.ts' &&
  fileName.indexOf('.test') === -1
))) {
  const model: any = await import(join(
    url.toString(),
    file
  ))
  db[model.default.name] = model.default
}
for (const modelName of Object.keys(db)) db[modelName].associate && db[modelName].associate(db)
export default db