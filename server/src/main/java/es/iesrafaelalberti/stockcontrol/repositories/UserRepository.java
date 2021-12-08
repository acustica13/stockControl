package es.iesrafaelalberti.stockcontrol.repositories;

import es.iesrafaelalberti.stockcontrol.models.Item;
import es.iesrafaelalberti.stockcontrol.models.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    @Query("select u from User u where u.email = ?1") //?1 es el primer argumento
    Optional<User> getUserByEmail(String email);

    @Query("select u from User u")
    List<User> getUsersInRange(Pageable pageable);
}
