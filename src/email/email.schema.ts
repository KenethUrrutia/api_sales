import { Model, model, property } from '@loopback/repository';

@model({})
export class EmailSchema extends Model {
	@property({
		name: 'id_email',
		description: 'ID del correo electrónico.',
		type: 'number',
		id: true,
		generated: true
	})
	id_email?: number;

	@property({
		name: 'person_id',
		description: 'ID de la persona propietaria del correo electrónico.',
		type: 'number',
		generated: false,
		required: true,
		jsonSchema: {
			minimum: 1,
			errorMessage: {
				minimum: 'El ID de la persona debe ser mayor a 0.'
			}
		}
	})
	person_id: number;

	@property({
		type: 'string',
		required: true,
		jsonSchema: {
			format: 'email',
			minLength: 5,
			maxLength: 100,
			errorMessage: {
				minLength: 'El email debe tener al menos 5 caracteres.',
				maxLength: 'El email no puede tener más de 100 caracteres.',
				format: 'El email no es válido.'
			}
		}
	})
	email: string;

	constructor(data?: Partial<EmailSchema>) {
		super(data);
	}
}
