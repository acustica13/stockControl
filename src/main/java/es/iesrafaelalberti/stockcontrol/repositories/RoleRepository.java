package es.iesrafaelalberti.stockcontrol.repositories;

import es.iesrafaelalberti.stockcontrol.models.Role;
import es.iesrafaelalberti.stockcontrol.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role, Long> {
    @Query("select r from Role r where r.roleName = ?1") //?1 es el primer argumento
    Optional<Role> getRoleByName(String roleName);
}
