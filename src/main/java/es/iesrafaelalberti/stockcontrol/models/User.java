package es.iesrafaelalberti.stockcontrol.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    private String name;
    private String surname;
    private String token;

    @JsonBackReference(value="user_shop")
    @ManyToOne
    private Shop shop;

    @ToString.Exclude
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "usuarios_roles",
            joinColumns = @JoinColumn(name = "id_usuario", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "id_rol", referencedColumnName = "id"))
    private Set<Role> roles = new HashSet<>();

    public User() {
        // no-op
    }

    public User(String email, String password, String name, String surname) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }

    public User(String email, String password, String name, String surname, Role role, Shop shop) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.token = null;
        this.roles = Collections.singleton(role);
        this.shop = shop;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
}