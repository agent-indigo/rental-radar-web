import PrimaryKeySpecification from '@/types/PrimaryKeySpecification'
import {UUIDV4} from 'sequelize'
const createId = (): PrimaryKeySpecification => ({
  id: {
    type: UUIDV4,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4
  }
})
export default createId