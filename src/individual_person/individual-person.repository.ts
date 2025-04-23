import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlSalesDataSource } from '../datasources';
import { IndividualPerson, IndividualPersonRelations } from './individual-person.model';

export class IndividualPersonRepository extends DefaultCrudRepository<
	IndividualPerson,
	typeof IndividualPerson.prototype.person_id,
	IndividualPersonRelations
> {
	constructor(@inject('datasources.mysql_sales') dataSource: MysqlSalesDataSource) {
		super(IndividualPerson, dataSource);
	}
}
