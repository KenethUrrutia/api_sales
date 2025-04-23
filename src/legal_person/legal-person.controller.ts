import { Count, CountSchema, Filter, FilterExcludingWhere, repository, Where } from '@loopback/repository';
import { del, get, getModelSchemaRef, param, patch, post, put, requestBody, response } from '@loopback/rest';
import { LegalPerson } from './legal-person.model';
import { LegalPersonRepository } from './legal-person.repository';

export class LegalPersonController {
	constructor(
		@repository(LegalPersonRepository)
		public legalPersonRepository: LegalPersonRepository
	) {}

	@post('/legal-people')
	@response(200, {
		description: 'LegalPerson model instance',
		content: { 'application/json': { schema: getModelSchemaRef(LegalPerson) } }
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(LegalPerson, {
						title: 'NewLegalPerson'
					})
				}
			}
		})
		legalPerson: LegalPerson
	): Promise<LegalPerson> {
		return this.legalPersonRepository.create(legalPerson);
	}

	@get('/legal-people/count')
	@response(200, {
		description: 'LegalPerson model count',
		content: { 'application/json': { schema: CountSchema } }
	})
	async count(@param.where(LegalPerson) where?: Where<LegalPerson>): Promise<Count> {
		return this.legalPersonRepository.count(where);
	}

	@get('/legal-people')
	@response(200, {
		description: 'Array of LegalPerson model instances',
		content: {
			'application/json': {
				schema: {
					type: 'array',
					items: getModelSchemaRef(LegalPerson, { includeRelations: true })
				}
			}
		}
	})
	async find(@param.filter(LegalPerson) filter?: Filter<LegalPerson>): Promise<LegalPerson[]> {
		return this.legalPersonRepository.find(filter);
	}

	@patch('/legal-people')
	@response(200, {
		description: 'LegalPerson PATCH success count',
		content: { 'application/json': { schema: CountSchema } }
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(LegalPerson, { partial: true })
				}
			}
		})
		legalPerson: LegalPerson,
		@param.where(LegalPerson) where?: Where<LegalPerson>
	): Promise<Count> {
		return this.legalPersonRepository.updateAll(legalPerson, where);
	}

	@get('/legal-people/{id}')
	@response(200, {
		description: 'LegalPerson model instance',
		content: {
			'application/json': {
				schema: getModelSchemaRef(LegalPerson, { includeRelations: true })
			}
		}
	})
	async findById(
		@param.path.number('id') id: number,
		@param.filter(LegalPerson, { exclude: 'where' }) filter?: FilterExcludingWhere<LegalPerson>
	): Promise<LegalPerson> {
		return this.legalPersonRepository.findById(id, filter);
	}

	@patch('/legal-people/{id}')
	@response(204, {
		description: 'LegalPerson PATCH success'
	})
	async updateById(
		@param.path.number('id') id: number,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(LegalPerson, { partial: true })
				}
			}
		})
		legalPerson: LegalPerson
	): Promise<void> {
		await this.legalPersonRepository.updateById(id, legalPerson);
	}

	@put('/legal-people/{id}')
	@response(204, {
		description: 'LegalPerson PUT success'
	})
	async replaceById(@param.path.number('id') id: number, @requestBody() legalPerson: LegalPerson): Promise<void> {
		await this.legalPersonRepository.replaceById(id, legalPerson);
	}

	@del('/legal-people/{id}')
	@response(204, {
		description: 'LegalPerson DELETE success'
	})
	async deleteById(@param.path.number('id') id: number): Promise<void> {
		await this.legalPersonRepository.deleteById(id);
	}
}
