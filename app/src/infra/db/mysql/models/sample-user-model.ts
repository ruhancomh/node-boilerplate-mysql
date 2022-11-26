import { Model, DataTypes } from 'sequelize'
import { ISampleUserModel } from '../../../../domain/models/sample-user-model'
import { db } from '../../../../main/config/database'

export class SampleUserMysqlModel extends Model implements ISampleUserModel {
  declare id: number
  declare name: string
  declare createdAt: Date
}

SampleUserMysqlModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'sample_user',
  sequelize: db
})
