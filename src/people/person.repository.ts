import { Getter, inject } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { MysqlSalesDataSource } from '../datasources';
import { EmailRepository } from '../email/email.repository';
import { Email } from '../models';
import { Person, PersonRelations } from './person.model';

export class PersonRepository extends DefaultCrudRepository<
	Person,
	typeof Person.prototype.id_person,
	PersonRelations
> {
	public readonly emails: HasManyRepositoryFactory<Email, typeof Person.prototype.id_person>;
	constructor(
		@inject('datasources.mysql_sales') dataSource: MysqlSalesDataSource,
		@repository.getter('EmailRepository')
		emailRepositoryGetter: Getter<EmailRepository>
	) {
		super(Person, dataSource);
		this.emails = this.createHasManyRepositoryFactoryFor('emails', emailRepositoryGetter);
		this.registerInclusionResolver('emails', this.emails.inclusionResolver);
	}
}
