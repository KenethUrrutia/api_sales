import { /* inject, */ BindingScope, injectable } from '@loopback/core';
import { IsolationLevel, repository, Transaction } from '@loopback/repository';
import { EmailRepository } from './../email/email.repository';
import { PersonRepository } from './person.repository';
import { PersonSchema } from './person.schema';

@injectable({ scope: BindingScope.TRANSIENT })
export class PersonService {
	constructor(
		@repository(PersonRepository)
		public personRepository: PersonRepository,
		@repository(EmailRepository)
		public emailRepository: EmailRepository
	) {}

	async create(data: PersonSchema): Promise<any> {
		let result: PersonSchema = new PersonSchema();

		const tx: Transaction = await this.personRepository.beginTransaction({
			isolationLevel: IsolationLevel.SERIALIZABLE,
			timeout: 8000 // 8000ms = 8s
		});

		try {
			// 1. Crear registro de la persona
			const person = await this.personRepository.create(
				{
					is_active: data.is_active
				},
				{ transaction: tx }
			);
			// 2. Asociar emails al nuevo registro de la persona
			data.emails?.forEach(
				async (item) =>
					await this.emailRepository.create(
						{
							person_id: person.id_person,
							email: item.email
						},
						{
							transaction: tx
						}
					)
			);
			result.id_person = person.id_person;
			result.is_active = person.is_active;
			await tx.commit();
			return result;
		} catch {
			tx.rollback();
		}
	}
}
