package es.iesrafaelalberti.stockcontrol.controllers;

import es.iesrafaelalberti.stockcontrol.models.Category;
import es.iesrafaelalberti.stockcontrol.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.Date;

@RestController
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

/*    @PostMapping("/categoria")
    public ResponseEntity<?> categoryNew(
            @RequestParam("nombre") String name) {
        Category newCategory = new Category(name);
        categoryRepository.save(newCategory);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }*/

    @PostMapping("/categoria/nuevo")
    public ResponseEntity<?> categoryNew(@RequestBody Category newCategory) {
        categoryRepository.save(newCategory);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/categoria/{id}")
    public ResponseEntity<?> categoryUpdate(@PathVariable("id")long id,
                                         @RequestBody Category newCategory) {
        categoryRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        newCategory.setId(id);
        categoryRepository.save(newCategory);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @DeleteMapping("/categoria/{id}")
    public ResponseEntity<?> categoryDelete(@PathVariable("id")long id) {
        Category oldCategory = categoryRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);
        categoryRepository.delete(oldCategory);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/categorias")
    public ResponseEntity<Object> categoryList() {
        return new ResponseEntity<>(categoryRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/categoria/{id}")
    public ResponseEntity<Object> categoryDetail(@PathVariable("id")long id) {
        return new ResponseEntity<>(categoryRepository.findById(id).orElseThrow(EntityNotFoundException::new),
                HttpStatus.OK);
    }
}
