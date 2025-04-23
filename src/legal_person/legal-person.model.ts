import { Entity, model, property } from '@loopback/repository';

@model({
	settings: {
		mysql: {
			table: 'legal_person'
		}
	}
})
export class LegalPerson extends Entity {
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
	comercial_name: string;

	constructor(data?: Partial<LegalPerson>) {
		super(data);
	}
}

export interface LegalPersonRelations {
	// describe navigational properties here
}

export type LegalPersonWithRelations = LegalPerson & LegalPersonRelations;
