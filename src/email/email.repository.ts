import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlSalesDataSource } from '../datasources';
import { Email, EmailRelations } from './email.model';

export class EmailRepository extends DefaultCrudRepository<Email, typeof Email.prototype.person_id, EmailRelations> {
	constructor(@inject('datasources.mysql_sales') dataSource: MysqlSalesDataSource) {
		super(Email, dataSource);
	}
}
