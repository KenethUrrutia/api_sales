import { Entity, model, property } from '@loopback/repository';
import { Email } from '../email/email.model';

@model()
export class PersonSchema extends Entity {
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

	@property.array(Email)
	emails?: Email[];

	constructor(data?: Partial<PersonSchema>) {
		super(data);
	}
}

export interface PersonRelations {
	// describe navigational properties here
}

export type PersonWithRelations = PersonSchema & PersonRelations;
