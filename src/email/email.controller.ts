import { Count, CountSchema, Filter, FilterExcludingWhere, repository, Where } from '@loopback/repository';
import { del, get, getModelSchemaRef, param, patch, post, put, requestBody, response } from '@loopback/rest';
import { Email } from './email.model';
import { EmailRepository } from './email.repository';
import { EmailSchema } from './email.schema';

export class EmailController {
	constructor(
		@repository(EmailRepository)
		public emailRepository: EmailRepository
	) {}

	@post('/emails')
	@response(200, {
		description: 'Email model instance',
		content: { 'application/json': { schema: getModelSchemaRef(EmailSchema) } }
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(EmailSchema, {
						title: 'NewEmail',
						exclude: ['id_email']
					})
				}
			}
		})
		email: Omit<Email, 'id_email'>
	): Promise<Email> {
		return this.emailRepository.create(email);
	}

	@get('/emails/count')
	@response(200, {
		description: 'Email model count',
		content: { 'application/json': { schema: CountSchema } }
	})
	async count(@param.where(Email) where?: Where<Email>): Promise<Count> {
		return this.emailRepository.count(where);
	}

	@get('/emails')
	@response(200, {
		description: 'Array of Email model instances',
		content: {
			'application/json': {
				schema: {
					type: 'array',
					items: getModelSchemaRef(Email, { includeRelations: true })
				}
			}
		}
	})
	async find(@param.filter(Email) filter?: Filter<Email>): Promise<Email[]> {
		return this.emailRepository.find(filter);
	}

	@patch('/emails')
	@response(200, {
		description: 'Email PATCH success count',
		content: { 'application/json': { schema: CountSchema } }
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Email, { partial: true })
				}
			}
		})
		email: Email,
		@param.where(Email) where?: Where<Email>
	): Promise<Count> {
		return this.emailRepository.updateAll(email, where);
	}

	@get('/emails/{id}')
	@response(200, {
		description: 'Email model instance',
		content: {
			'application/json': {
				schema: getModelSchemaRef(Email, { includeRelations: true })
			}
		}
	})
	async findById(
		@param.path.number('id') id: number,
		@param.filter(Email, { exclude: 'where' }) filter?: FilterExcludingWhere<Email>
	): Promise<Email> {
		return this.emailRepository.findById(id, filter);
	}

	@patch('/emails/{id}')
	@response(204, {
		description: 'Email PATCH success'
	})
	async updateById(
		@param.path.number('id') id: number,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Email, { partial: true })
				}
			}
		})
		email: Email
	): Promise<void> {
		await this.emailRepository.updateById(id, email);
	}

	@put('/emails/{id}')
	@response(204, {
		description: 'Email PUT success'
	})
	async replaceById(@param.path.number('id') id: number, @requestBody() email: Email): Promise<void> {
		await this.emailRepository.replaceById(id, email);
	}

	@del('/emails/{id}')
	@response(204, {
		description: 'Email DELETE success'
	})
	async deleteById(@param.path.number('id') id: number): Promise<void> {
		await this.emailRepository.deleteById(id);
	}
}
