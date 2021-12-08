package es.iesrafaelalberti.stockcontrol.seeder;

import es.iesrafaelalberti.stockcontrol.models.*;
import es.iesrafaelalberti.stockcontrol.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Set;

@Component
public class Seeder implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private RoleRepository roleRepository;
    private final LocalDate today = LocalDate.now();
    private final LocalDate expirationDate = today.plusDays(10);

    @Override
    public void run(String... args) {
        if (false) {
            //Create a new Category
            Category category1 = categoryRepository.save(new Category("categoria1"));
            Category category2 = categoryRepository.save(new Category("categoria2"));
            Category category3 = categoryRepository.save(new Category("categoria3"));

            //Create a new Item
            Item item1 = itemRepository.save(new Item("Adidas", "item1", "rojo", 10, today, 15.0, 25.0, 10.0, false, Set.of(category1, category2)));
            Item item2 = itemRepository.save(new Item("Nike", "item2", "azul", 5, today, 10.0, 20.0, 0.0, false, Set.of(category1, category3)));
            Item item3 = itemRepository.save(new Item("Reebok", "item2", "azul", 5, today, 5.0, 30.0, 0.0, true, Set.of(category1, category3)));
            Item item4 = itemRepository.save(new Item("Nike", "item3", "azul", 3, today, 10.0, 20.0, 25.0, false, Set.of(category1, category3)));
            Item item5 = itemRepository.save(new Item("Reebok", "item3", "rojo", 7, today, 20.0, 40.0, 8.0, false, Set.of(category1, category3)));
            Item item6 = itemRepository.save(new Item("Nike", "item3", "verde", 5, today, 15.0, 50.0, 0.0, true, Set.of(category1, category3)));
            Item item7 = itemRepository.save(new Item("Nike", "item3", "verde", 8, today, 10.0, 20.0, 0.0, false, Set.of(category1, category3)));
            Item item8 = itemRepository.save(new Item("Nike", "item4", "azul", 10, today, 10.0, 20.0, 0.0, false, Set.of(category1, category3)));
            Item item9 = itemRepository.save(new Item("Nike", "item2", "azul", 5, today, 10.0, 20.0, 0.0, false, Set.of(category1, category3)));

            //Create a new Batch
            batchRepository.save(new Batch(expirationDate, item1));
            batchRepository.save(new Batch(expirationDate, item2));
            batchRepository.save(new Batch(expirationDate, item3));
            batchRepository.save(new Batch(expirationDate, item1));
            batchRepository.save(new Batch(expirationDate, item4));
            batchRepository.save(new Batch(expirationDate, item5));
            batchRepository.save(new Batch(expirationDate, item3));
            batchRepository.save(new Batch(expirationDate, item6));
            batchRepository.save(new Batch(expirationDate, item7));
            batchRepository.save(new Batch(expirationDate, item5));
            batchRepository.save(new Batch(expirationDate, item8));
            batchRepository.save(new Batch(expirationDate, item9));
            batchRepository.save(new Batch(expirationDate, item8));

            //Create a new Shop
            Shop shop1 = shopRepository.save(new Shop("tienda1", "Chiclana", 622003355, "tienda1@email.com", 11130, Set.of(item1, item2, item3, item5, item7, item9)));
            Shop shop2 = shopRepository.save(new Shop("tienda2", "Cádiz", 622003322, "tienda2@email.com", 11111, Set.of(item2, item4, item6, item8)));

            //Create a new role
            Role role1 = roleRepository.save(new Role("ADMIN"));
            Role role2 = roleRepository.save(new Role("USER"));

            //Create a new User
            userRepository.save(new User("usuario1@email.com", new BCryptPasswordEncoder().encode("asd123"), "Paula", "Pavon", role1, shop1));
            userRepository.save(new User("usuario2@email.com", new BCryptPasswordEncoder().encode("asd123"), "Jaime", "Pavon", role2, shop1));

            //Create a new Supplier
            supplierRepository.save(new Supplier("Proveedor1", "Jerez", 666001122, "proveedor1@email.com", 11130));
            supplierRepository.save(new Supplier("Proveedor2", "Cádiz", 666001123, "proveedor2@email.com", 11150));
        }
    }
}
