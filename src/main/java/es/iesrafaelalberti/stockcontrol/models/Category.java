package es.iesrafaelalberti.stockcontrol.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    // N:M con item
    @JsonBackReference(value="category_item")
    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "categories")
    Set<Item> items = new HashSet<>();

    public Category() {
        // no-op
    }

    public Category(String name) {
        this.name = name;
    }
}
