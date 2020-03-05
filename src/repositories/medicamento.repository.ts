import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Medicamento, MedicamentoRelations, Ingrediente} from '../models';
import {FarmaciaDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {IngredienteRepository} from './ingrediente.repository';

export class MedicamentoRepository extends DefaultCrudRepository<
  Medicamento,
  typeof Medicamento.prototype.id,
  MedicamentoRelations
> {

  public readonly medicamento: HasManyRepositoryFactory<Ingrediente, typeof Medicamento.prototype.id>;

  constructor(
    @inject('datasources.farmacia') dataSource: FarmaciaDataSource, @repository.getter('IngredienteRepository') protected ingredienteRepositoryGetter: Getter<IngredienteRepository>,
  ) {
    super(Medicamento, dataSource);
    this.medicamento = this.createHasManyRepositoryFactoryFor('medicamento', ingredienteRepositoryGetter,);
    this.registerInclusionResolver('medicamento', this.medicamento.inclusionResolver);
  }
}
