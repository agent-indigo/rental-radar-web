import sequelize from '@/configuration/sequelize'
const connectToSqlDb = async (): Promise<void> => {
  let connected: boolean = false
  if (!connected) try {
    await sequelize.authenticate()
    connected = true
    console.log('PostgreSQL successfully connected.')
    await sequelize.sync()
    console.log('Schema successfully synchronized.')
  } catch (error) {
    console.error(error)
  }
}
export default connectToSqlDb