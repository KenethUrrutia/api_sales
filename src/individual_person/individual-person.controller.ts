import { Count, CountSchema, Filter, FilterExcludingWhere, repository, Where } from '@loopback/repository';
import { del, get, getModelSchemaRef, param, patch, post, put, requestBody, response } from '@loopback/rest';
import { IndividualPerson } from './individual-person.model';
import { IndividualPersonRepository } from './individual-person.repository';

export class IndividualPersonController {
	constructor(
		@repository(IndividualPersonRepository)
		public individualPersonRepository: IndividualPersonRepository
	) {}

	@post('/individual-person')
	@response(200, {
		description: 'IndividualPerson model instance',
		content: { 'application/json': { schema: getModelSchemaRef(IndividualPerson) } }
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(IndividualPerson, {
						title: 'NewIndividualPerson'
					})
				}
			}
		})
		individualPerson: IndividualPerson
	): Promise<IndividualPerson> {
		return this.individualPersonRepository.create(individualPerson);
	}

	@get('/individual-person/count')
	@response(200, {
		description: 'IndividualPerson model count',
		content: { 'application/json': { schema: CountSchema } }
	})
	async count(@param.where(IndividualPerson) where?: Where<IndividualPerson>): Promise<Count> {
		return this.individualPersonRepository.count(where);
	}

	@get('/individual-person')
	@response(200, {
		description: 'Array of IndividualPerson model instances',
		content: {
			'application/json': {
				schema: {
					type: 'array',
					items: getModelSchemaRef(IndividualPerson, { includeRelations: true })
				}
			}
		}
	})
	async find(@param.filter(IndividualPerson) filter?: Filter<IndividualPerson>): Promise<IndividualPerson[]> {
		return this.individualPersonRepository.find(filter);
	}

	@patch('/individual-person')
	@response(200, {
		description: 'IndividualPerson PATCH success count',
		content: { 'application/json': { schema: CountSchema } }
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(IndividualPerson, { partial: true })
				}
			}
		})
		individualPerson: IndividualPerson,
		@param.where(IndividualPerson) where?: Where<IndividualPerson>
	): Promise<Count> {
		return this.individualPersonRepository.updateAll(individualPerson, where);
	}

	@get('/individual-person/{id}')
	@response(200, {
		description: 'IndividualPerson model instance',
		content: {
			'application/json': {
				schema: getModelSchemaRef(IndividualPerson, { includeRelations: true })
			}
		}
	})
	async findById(
		@param.path.number('id') id: number,
		@param.filter(IndividualPerson, { exclude: 'where' }) filter?: FilterExcludingWhere<IndividualPerson>
	): Promise<IndividualPerson> {
		return this.individualPersonRepository.findById(id, filter);
	}

	@patch('/individual-person/{id}')
	@response(204, {
		description: 'IndividualPerson PATCH success'
	})
	async updateById(
		@param.path.number('id') id: number,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(IndividualPerson, { partial: true })
				}
			}
		})
		individualPerson: IndividualPerson
	): Promise<void> {
		await this.individualPersonRepository.updateById(id, individualPerson);
	}

	@put('/individual-person/{id}')
	@response(204, {
		description: 'IndividualPerson PUT success'
	})
	async replaceById(
		@param.path.number('id') id: number,
		@requestBody() individualPerson: IndividualPerson
	): Promise<void> {
		await this.individualPersonRepository.replaceById(id, individualPerson);
	}

	@del('/individual-person/{id}')
	@response(204, {
		description: 'IndividualPerson DELETE success'
	})
	async deleteById(@param.path.number('id') id: number): Promise<void> {
		await this.individualPersonRepository.deleteById(id);
	}
}
