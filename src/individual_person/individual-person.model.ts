import { Entity, model, property } from '@loopback/repository';

@model({
	settings: {
		mysql: {
			table: 'individual_person'
		}
	}
})
export class IndividualPerson extends Entity {
	@property({
		type: 'number',
		id: true,
		generated: false,
		required: true
	})
	person_id: number;

	@property({
		type: 'string',
		required: true
	})
	name: string;

	@property({
		type: 'string',
		required: true
	})
	surname: string;

	@property({
		type: 'boolean',
		default: 1
	})
	is_male?: boolean;

	constructor(data?: Partial<IndividualPerson>) {
		super(data);
	}
}

export interface IndividualPersonRelations {
	// describe navigational properties here
}

export type IndividualPersonWithRelations = IndividualPerson & IndividualPersonRelations;
