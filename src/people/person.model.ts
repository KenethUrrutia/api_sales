import { Entity, hasMany, model, property } from '@loopback/repository';
import { Email } from '../email/email.model';

@model({
	settings: {
		mysql: {
			table: 'person'
		}
	}
})
export class Person extends Entity {
	@property({
		type: 'number',
		id: true,
		generated: true
	})
	id_person?: number;

	@property({
		type: 'boolean',
		required: true
	})
	is_active: boolean;

	@hasMany(() => Email, {
		keyFrom: 'id_person',
		keyTo: 'person_id'
	})
	emails?: Email[];

	constructor(data?: Partial<Person>) {
		super(data);
	}
}

export interface PersonRelations {
	// describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;
