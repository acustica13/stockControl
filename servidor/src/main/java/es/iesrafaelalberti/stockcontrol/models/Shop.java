package es.iesrafaelalberti.stockcontrol.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    private String location;
    private Integer phone;
    private String email;
    private Integer postcode;

    //Relation between shops - users. 1:M
    @OneToMany(mappedBy = "shop", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user_shop")
    Set<User> users = new HashSet<>();

    //N:M con items
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "shops_items",
            joinColumns = @JoinColumn(name = "shop_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "item_id", referencedColumnName = "id"))
    Set<Item> items = new HashSet<>();

    public Shop() {
        // no-op
    }

    public Shop(String name, String location, int phone, String email, int postcode) {
        this.name = name;
        this.location = location;
        this.phone = phone;
        this.email = email;
        this.postcode = postcode;
    }

    public Shop(String name, String location, Integer phone, String email, Integer postcode, Set<Item> items) {
        this.name = name;
        this.location = location;
        this.phone = phone;
        this.email = email;
        this.postcode = postcode;
        this.items = items;
    }
}
