package es.iesrafaelalberti.stockcontrol.repositories;

import es.iesrafaelalberti.stockcontrol.models.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Long> {
}
