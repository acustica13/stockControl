package es.iesrafaelalberti.stockcontrol.controllers;

import es.iesrafaelalberti.stockcontrol.models.Shop;
import es.iesrafaelalberti.stockcontrol.repositories.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@RestController
public class ShopController {
    @Autowired
    private ShopRepository shopRepository;

    @PostMapping("/tienda/nuevo")
    public ResponseEntity<?> shopNew(@RequestBody Shop newShop) {
        shopRepository.save(newShop);
        return new ResponseEntity<>(newShop, HttpStatus.OK);
    }

    @PutMapping("/tienda/{id}")
    public ResponseEntity<?> shopUpdate(@PathVariable("id") long id,
                                        @RequestBody Shop newShop) {
        shopRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        newShop.setId(id);
        shopRepository.save(newShop);
        return new ResponseEntity<>(newShop, HttpStatus.OK);
    }

    @DeleteMapping("/tienda/{id}")
    public ResponseEntity<?> shopDelete(@PathVariable("id")long id) {
        Optional<Shop> oldShop = shopRepository.findById(id);
        if (oldShop.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        shopRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/tiendas")
    public ResponseEntity<Object> shopList(@RequestParam("page") int page) {
        return new ResponseEntity<>(shopRepository.getShopsInRange(PageRequest.of(page,8))
                , HttpStatus.OK);
    }

    @GetMapping(value = "/tienda/{id}")
    public ResponseEntity<Object> shopDetail(@PathVariable("id")long id) {
        return new ResponseEntity<>(shopRepository.findById(id).orElseThrow(EntityNotFoundException::new),
                HttpStatus.OK);
    }

    @GetMapping("/tiendas/producto/{id}")
    public ResponseEntity<Object> shopListByItemId(@RequestParam("page") int page, @PathVariable("id") Long id) {
        return new ResponseEntity<>(shopRepository.getShopsForItemInRange(PageRequest.of(page,6), id)
                , HttpStatus.OK);
    }
}
