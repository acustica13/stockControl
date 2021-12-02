package es.iesrafaelalberti.stockcontrol.repositories;

import es.iesrafaelalberti.stockcontrol.models.Batch;
import org.springframework.data.repository.CrudRepository;

public interface BatchRepository extends CrudRepository<Batch, Long> {
}
