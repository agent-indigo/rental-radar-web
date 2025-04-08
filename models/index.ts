import fs from 'fs'
import path from 'path'
import {Sequelize} from 'sequelize'
import sequelize from '@/config/sequelize.js'
import Db from '@/types/Db'
const db: Db = {
  Sequelize,
  sequelize
}
for (const file of fs.readdirSync(new URL(
  '.',
  import.meta.url
)).filter((fileName: string): boolean => (
  fileName.indexOf('.') !== 0 &&
  fileName !== path.basename(import.meta.url) &&
  fileName.slice(-11) === 'SqlModel.ts' &&
  fileName.indexOf('.test') === -1
))) {
  const model: any = await import(path.join(
    new URL(
      '.',
      import.meta.url
    ).toString(),
    file
  ))
  db[model.default.name] = model.default
}
for (const modelName of Object.keys(db)) db[modelName].associate && db[modelName].associate(db)
export default db