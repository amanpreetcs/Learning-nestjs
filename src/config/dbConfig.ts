import { Property } from 'src/entities/property.entity';
import { PropertyFeature } from 'src/entities/propertyFeature.entity';
import { PropertyType } from 'src/entities/propertyType.entity';
import { User } from 'src/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default (): PostgresConnectionOptions => ({
  url: process.env.DB_URL,
  type: 'postgres',
  port: 3306,
  entities: [Property, PropertyFeature, PropertyType, User],
  synchronize: true,
});
