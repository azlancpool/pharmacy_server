import { Entity, model, property, hasMany } from '@loopback/repository';
import { Ingrediente } from './ingrediente.model';

@model()
export class Medicamento extends Entity {

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

  @property({
    type: 'string',
    required: true,
  })
  posologia: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaExpiracion: string;

  @hasMany(() => Ingrediente, { keyTo: 'medicamentoId' })
  ingredientes: Ingrediente[];

  constructor(data?: Partial<Medicamento>) {
    super(data);
  }
}

export interface MedicamentoRelations {
  // describe navigational properties here
}

export type MedicamentoWithRelations = Medicamento & MedicamentoRelations;
