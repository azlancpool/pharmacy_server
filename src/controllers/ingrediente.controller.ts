import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Ingrediente} from '../models';
import {IngredienteRepository} from '../repositories';

export class IngredienteController {
  constructor(
    @repository(IngredienteRepository)
    public ingredienteRepository : IngredienteRepository,
  ) {}

  @post('/ingredientes', {
    responses: {
      '200': {
        description: 'Ingrediente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ingrediente)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingrediente, {
            title: 'NewIngrediente',
            exclude: ['id'],
          }),
        },
      },
    })
    ingrediente: Omit<Ingrediente, 'id'>,
  ): Promise<Ingrediente> {
    return this.ingredienteRepository.create(ingrediente);
  }

  @get('/ingredientes/count', {
    responses: {
      '200': {
        description: 'Ingrediente model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Ingrediente)) where?: Where<Ingrediente>,
  ): Promise<Count> {
    return this.ingredienteRepository.count(where);
  }

  @get('/ingredientes', {
    responses: {
      '200': {
        description: 'Array of Ingrediente model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ingrediente, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Ingrediente)) filter?: Filter<Ingrediente>,
  ): Promise<Ingrediente[]> {
    return this.ingredienteRepository.find(filter);
  }

  @patch('/ingredientes', {
    responses: {
      '200': {
        description: 'Ingrediente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingrediente, {partial: true}),
        },
      },
    })
    ingrediente: Ingrediente,
    @param.query.object('where', getWhereSchemaFor(Ingrediente)) where?: Where<Ingrediente>,
  ): Promise<Count> {
    return this.ingredienteRepository.updateAll(ingrediente, where);
  }

  @get('/ingredientes/{id}', {
    responses: {
      '200': {
        description: 'Ingrediente model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ingrediente, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Ingrediente)) filter?: Filter<Ingrediente>
  ): Promise<Ingrediente> {
    return this.ingredienteRepository.findById(id, filter);
  }

  @patch('/ingredientes/{id}', {
    responses: {
      '204': {
        description: 'Ingrediente PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingrediente, {partial: true}),
        },
      },
    })
    ingrediente: Ingrediente,
  ): Promise<void> {
    await this.ingredienteRepository.updateById(id, ingrediente);
  }

  @put('/ingredientes/{id}', {
    responses: {
      '204': {
        description: 'Ingrediente PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ingrediente: Ingrediente,
  ): Promise<void> {
    await this.ingredienteRepository.replaceById(id, ingrediente);
  }

  @del('/ingredientes/{id}', {
    responses: {
      '204': {
        description: 'Ingrediente DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ingredienteRepository.deleteById(id);
  }
}
