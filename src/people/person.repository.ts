import { Getter, inject } from '@loopback/core';
import { DefaultTransactionalRepository, HasManyRepositoryFactory, juggler, repository } from '@loopback/repository';
import { EmailRepository } from '../email/email.repository';
import { Email } from '../models';
import { Person, PersonRelations } from './person.model';

export class PersonRepository extends DefaultTransactionalRepository<
	Person,
	typeof Person.prototype.id_person,
	PersonRelations
> {
	public readonly emails: HasManyRepositoryFactory<Email, typeof Person.prototype.id_person>;
	constructor(
		@inject('datasources.mysql_sales') protected db: juggler.DataSource,
		@repository.getter('EmailRepository')
		emailRepositoryGetter: Getter<EmailRepository>
	) {
		super(Person, db);
		this.emails = this.createHasManyRepositoryFactoryFor('emails', emailRepositoryGetter);
		this.registerInclusionResolver('emails', this.emails.inclusionResolver);
	}
}
