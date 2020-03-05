import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Medicamento } from './Medicamento.model';

@model()
export class Ingrediente extends Entity {

  @property({
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @belongsTo(() => Medicamento)
  medicamentoId: number;

  constructor(data?: Partial<Ingrediente>) {
    super(data);
  }
}

export interface IngredienteRelations {
  // describe navigational properties here
}

export type IngredienteWithRelations = Ingrediente & IngredienteRelations;

