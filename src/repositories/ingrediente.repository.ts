import {DefaultCrudRepository} from '@loopback/repository';
import {Ingrediente, IngredienteRelations} from '../models';
import {FarmaciaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class IngredienteRepository extends DefaultCrudRepository<
  Ingrediente,
  typeof Ingrediente.prototype.id,
  IngredienteRelations
> {
  constructor(
    @inject('datasources.farmacia') dataSource: FarmaciaDataSource,
  ) {
    super(Ingrediente, dataSource);
  }
}
