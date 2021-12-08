package es.iesrafaelalberti.stockcontrol.repositories;

import es.iesrafaelalberti.stockcontrol.models.Item;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends CrudRepository<Item, Long> {
    @Query("select i from Item i")
    List<Item> getItemsInRange(Pageable pageable);

    @Query("select i from Item i where i.name like %:name% and i.brand like %:brand%")
    List<Item> getItemsInRangeBy(Pageable pageable, @Param("name") String name, @Param("brand") String brand);

    @Query("select distinct i.brand from Item i")
    List<String> getBrands();

    @Query(value="delete from shops_items where item_id = ?1", nativeQuery = true)
    Integer deleteItemRelationShopById(long id);
}
