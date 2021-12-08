package es.iesrafaelalberti.stockcontrol.repositories;

import es.iesrafaelalberti.stockcontrol.models.Shop;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ShopRepository  extends CrudRepository<Shop, Long> {
    @Query("select s from Shop s")
    List<Shop> getShopsInRange(Pageable pageable);

    @Query("select new es.iesrafaelalberti.stockcontrol.models.Shop(s.name, s.location, s.phone, s.email, s.postcode) from Shop s inner join s.items i where i.id = :id")
    List<Shop> getShopsForItemInRange(Pageable pageable, @Param("id") long id);
}
