import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlSalesDataSource } from '../datasources';
import { LegalPerson, LegalPersonRelations } from './legal-person.model';

export class LegalPersonRepository extends DefaultCrudRepository<
	LegalPerson,
	typeof LegalPerson.prototype.person_id,
	LegalPersonRelations
> {
	constructor(@inject('datasources.mysql_sales') dataSource: MysqlSalesDataSource) {
		super(LegalPerson, dataSource);
	}
}
