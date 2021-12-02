package es.iesrafaelalberti.stockcontrol.controllers;

import es.iesrafaelalberti.stockcontrol.models.Item;
import es.iesrafaelalberti.stockcontrol.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.Optional;

@RestController
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @PostMapping("/producto/nuevo")
    public ResponseEntity<?> itemNew(@RequestBody Item newItem) {
        itemRepository.save(newItem);
        return new ResponseEntity<>(newItem, HttpStatus.OK);
    }

    @PutMapping("/producto/{id}")
    public ResponseEntity<?> itemUpdate(@PathVariable("id") long id,
                                        @RequestBody Item newItem) {
        itemRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        newItem.setId(id);
        itemRepository.save(newItem);
        return new ResponseEntity<>(newItem, HttpStatus.OK);
    }

    @DeleteMapping("/producto/{id}")
    public ResponseEntity<?> itemDelete(@PathVariable("id") long id) {
        Optional<Item> oldItem = itemRepository.findById(id);
        if (oldItem.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        itemRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/productos")
    public ResponseEntity<Object> itemList(@RequestParam("page") int page, @Nullable @RequestParam("name") String name, @Nullable @RequestParam("brand") String brand) {
        name = name == null ? "" : name;
        brand = brand == null ? "" : brand;
        return new ResponseEntity<>(itemRepository.getItemsInRangeBy(PageRequest.of(page,6), name, brand),
            HttpStatus.OK);
    }

    @GetMapping(value = "/producto/{id}")
    public ResponseEntity<Object> itemDetail(@PathVariable("id") long id) {
        return new ResponseEntity<>(itemRepository.findById(id).orElseThrow(EntityNotFoundException::new),
            HttpStatus.OK);
    }

    @GetMapping(value = "/productos/brand")
    public ResponseEntity<Object> itemsBrand() {
        return new ResponseEntity<>(itemRepository.getBrands(), HttpStatus.OK);
    }
}
