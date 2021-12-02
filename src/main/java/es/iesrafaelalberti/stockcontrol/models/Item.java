package es.iesrafaelalberti.stockcontrol.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.action.internal.OrphanRemovalAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String brand;
    @Column(nullable = false)
    private String name;
    private String color;
    private Integer stock;
    private LocalDate datePurchase;
    private Double pricePurchase;
    private Double priceSale;
    private Double discount;
    private Boolean discontinued;

    //N:M con category
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "items_categories",
            joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    Set<Category> categories = new HashSet<>();

    // N:M con shop
    @JsonBackReference(value = "item_shops")
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "items")
    Set<Shop> shops = new HashSet<>();

    //Relation between item - supplier. M:1
    @JsonBackReference(value="item_supplier")
    @ManyToOne
//    @JoinColumn()
    private Supplier supplier;

    //Relation between item - batch. 1:M
    @OneToMany(mappedBy = "item", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference(value = "batch_item")
    Set<Batch> batches = new HashSet<>();

    public Item() {
        // no-op
    }

    public Item(String brand, String name, String color, Integer stock, LocalDate datePurchase, Double pricePurchase, Double priceSale, Double discount, Boolean discontinued) {
        this.brand = brand;
        this.name = name;
        this.color = color;
        this.stock = stock;
        this.datePurchase = datePurchase;
        this.pricePurchase = pricePurchase;
        this.priceSale = priceSale;
        this.discount = discount;
        this.discontinued = discontinued;
    }

    public Item(String brand, String name, String color, Integer stock, LocalDate datePurchase, Double pricePurchase, Double priceSale, Double discount, Boolean discontinued, Set<Category> categories) {
        this.brand = brand;
        this.name = name;
        this.color = color;
        this.stock = stock;
        this.datePurchase = datePurchase;
        this.pricePurchase = pricePurchase;
        this.priceSale = priceSale;
        this.discount = discount;
        this.discontinued = discontinued;
        this.categories = categories;
    }

    public Item(Long id, String brand, String name, String color, Integer stock, LocalDate datePurchase, Double pricePurchase, Double priceSale, Double discount, Boolean discontinued, Set<Category> categories, Set<Shop> shops, Supplier supplier, Set<Batch> batches) {
        this.id = id;
        this.brand = brand;
        this.name = name;
        this.color = color;
        this.stock = stock;
        this.datePurchase = datePurchase;
        this.pricePurchase = pricePurchase;
        this.priceSale = priceSale;
        this.discount = discount;
        this.discontinued = discontinued;
        this.categories = categories;
        this.shops = shops;
        this.supplier = supplier;
        this.batches = batches;
    }
}