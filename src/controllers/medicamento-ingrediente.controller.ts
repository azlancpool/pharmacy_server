import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Medicamento,
  Ingrediente,
} from '../models';
import { MedicamentoRepository } from '../repositories';

export class MedicamentoIngredienteController {
  constructor(
    @repository(MedicamentoRepository) protected medicamentoRepository: MedicamentoRepository,
  ) { }

  @get('/medicamentos/{id}/ingredientes', {
    responses: {
      '200': {
        description: 'Array of Medicamento has many Ingrediente',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Ingrediente) },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Ingrediente>,
  ): Promise<Ingrediente[]> {
    return this.medicamentoRepository.medicamento(id).find(filter);
  }

  @post('/medicamentos/{id}/ingredientes', {
    responses: {
      '200': {
        description: 'Medicamento model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Ingrediente) } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Medicamento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingrediente, {
            title: 'NewIngredienteInMedicamento',
            exclude: ['id'],
            optional: ['id']
          }),
        },
      },
    }) ingrediente: Omit<Ingrediente, 'id'>,
  ): Promise<Ingrediente> {
    return this.medicamentoRepository.medicamento(id).create(ingrediente);
  }

  @patch('/medicamentos/{id}/ingredientes', {
    responses: {
      '200': {
        description: 'Medicamento.Ingrediente PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ingrediente, { partial: true }),
        },
      },
    })
    ingrediente: Partial<Ingrediente>,
    @param.query.object('where', getWhereSchemaFor(Ingrediente)) where?: Where<Ingrediente>,
  ): Promise<Count> {
    return this.medicamentoRepository.medicamento(id).patch(ingrediente, where);
  }

  @del('/medicamentos/{id}/ingredientes', {
    responses: {
      '200': {
        description: 'Medicamento.Ingrediente DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Ingrediente)) where?: Where<Ingrediente>,
  ): Promise<Count> {
    return this.medicamentoRepository.medicamento(id).delete(where);
  }
}
