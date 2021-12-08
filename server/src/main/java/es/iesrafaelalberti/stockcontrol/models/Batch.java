package es.iesrafaelalberti.stockcontrol.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Setter
@Getter
@Entity
public class Batch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate expirationDate;

    @JsonBackReference(value = "batch_item")
    @ManyToOne
//    @JoinColumn()
    private Item item;

    public Batch() {
        // no-op
    }

    public Batch(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

//    Seeder
    public Batch(LocalDate expirationDate, Item item) {
        this.expirationDate = expirationDate;
        this.item = item;
    }
}
