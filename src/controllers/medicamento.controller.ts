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
import {Medicamento} from '../models';
import {MedicamentoRepository} from '../repositories';

export class MedicamentoController {
  constructor(
    @repository(MedicamentoRepository)
    public medicamentoRepository : MedicamentoRepository,
  ) {}

  @post('/medicamentos', {
    responses: {
      '200': {
        description: 'Medicamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Medicamento)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medicamento, {
            title: 'NewMedicamento',
            exclude: ['id'],
          }),
        },
      },
    })
    medicamento: Omit<Medicamento, 'id'>,
  ): Promise<Medicamento> {
    return this.medicamentoRepository.create(medicamento);
  }

  @get('/medicamentos/count', {
    responses: {
      '200': {
        description: 'Medicamento model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Medicamento)) where?: Where<Medicamento>,
  ): Promise<Count> {
    return this.medicamentoRepository.count(where);
  }

  @get('/medicamentos', {
    responses: {
      '200': {
        description: 'Array of Medicamento model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Medicamento, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Medicamento)) filter?: Filter<Medicamento>,
  ): Promise<Medicamento[]> {
    return this.medicamentoRepository.find(filter);
  }

  @patch('/medicamentos', {
    responses: {
      '200': {
        description: 'Medicamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medicamento, {partial: true}),
        },
      },
    })
    medicamento: Medicamento,
    @param.query.object('where', getWhereSchemaFor(Medicamento)) where?: Where<Medicamento>,
  ): Promise<Count> {
    return this.medicamentoRepository.updateAll(medicamento, where);
  }

  @get('/medicamentos/{id}', {
    responses: {
      '200': {
        description: 'Medicamento model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Medicamento, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Medicamento)) filter?: Filter<Medicamento>
  ): Promise<Medicamento> {
    return this.medicamentoRepository.findById(id, filter);
  }

  @patch('/medicamentos/{id}', {
    responses: {
      '204': {
        description: 'Medicamento PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medicamento, {partial: true}),
        },
      },
    })
    medicamento: Medicamento,
  ): Promise<void> {
    await this.medicamentoRepository.updateById(id, medicamento);
  }

  @put('/medicamentos/{id}', {
    responses: {
      '204': {
        description: 'Medicamento PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() medicamento: Medicamento,
  ): Promise<void> {
    await this.medicamentoRepository.replaceById(id, medicamento);
  }

  @del('/medicamentos/{id}', {
    responses: {
      '204': {
        description: 'Medicamento DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.medicamentoRepository.deleteById(id);
  }
}
