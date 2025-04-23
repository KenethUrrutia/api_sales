import { Entity, model, property } from '@loopback/repository';

@model({
	settings: {
		mysql: {
			table: 'email'
		}
	}
})
export class Email extends Entity {
	@property({
		type: 'number',
		id: true,
		generated: true
	})
	id_email?: number;

	@property({
		type: 'number',
		generated: false,
		required: true
	})
	person_id: number;

	@property({
		type: 'string',
		required: true
	})
	email: string;

	constructor(data?: Partial<Email>) {
		super(data);
	}
}

export interface EmailRelations {
	// describe navigational properties here
}

export type EmailWithRelations = Email & EmailRelations;
