package es.iesrafaelalberti.stockcontrol.repositories;

import es.iesrafaelalberti.stockcontrol.models.Supplier;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SupplierRepository extends CrudRepository<Supplier, Long> {
    @Query("select s from Supplier s")
    List<Supplier> getSuppliersInRange(Pageable pageable);
}
