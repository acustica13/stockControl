package es.iesrafaelalberti.stockcontrol.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    private String location;
    private Integer phone;
    private String email;
    private Integer postcode;

    //Relation between supplier - item. 1:M
    @OneToMany(mappedBy = "supplier", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JsonManagedReference(value = "item_supplier")
    Set<Item> items = new HashSet<>();

    public Supplier() {
        // no-op
    }

    public Supplier(String name, String location, Integer phone, String email, Integer postcode) {
        this.name = name;
        this.location = location;
        this.phone = phone;
        this.email = email;
        this.postcode = postcode;
    }
}
