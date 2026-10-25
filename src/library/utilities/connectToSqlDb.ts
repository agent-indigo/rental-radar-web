import sequelize from '@/connectors/sequelize'
const connectToSqlDb: Function = async (): Promise<void> => {
  let isConnected: boolean = false
  if (!isConnected) try {
    await sequelize.authenticate()
    isConnected = true
    console.log('PostgreSQL database successfully connected.')
    await sequelize.sync({
      alter: true
    })
    console.log('Schema successfully synchronized.')
  } catch (error: any) {
    console.error(error.toString())
    throw error
  }
}
export default connectToSqlDb