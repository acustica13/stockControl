package es.iesrafaelalberti.stockcontrol.controllers;

import es.iesrafaelalberti.stockcontrol.models.Batch;
import es.iesrafaelalberti.stockcontrol.repositories.BatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

@RestController
public class BatchController {
    @Autowired
    private BatchRepository batchRepository;

    @PostMapping("/lote/nuevo")
    public ResponseEntity<?> batchNew(@RequestBody Batch newBatch) {
        batchRepository.save(newBatch);
        return new ResponseEntity<>(newBatch, HttpStatus.OK);
    }

    @PutMapping("/lote/{id}")
    public ResponseEntity<?> batchUpdate(@PathVariable("id") long id,
                                        @RequestBody Batch newBatch) {
        batchRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        newBatch.setId(id);
        batchRepository.save(newBatch);
        return new ResponseEntity<>(newBatch, HttpStatus.OK);
    }

    @DeleteMapping("/lote/{id}")
    public ResponseEntity<?> batchDelete(@PathVariable("id") long id) {
        Batch oldBatch = batchRepository.findById(id)
                                        .orElseThrow(EntityNotFoundException::new);
        batchRepository.delete(oldBatch);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/lotes")
    public ResponseEntity<Object> batchList() {
        return new ResponseEntity<>(batchRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/lote/{id}")
    public ResponseEntity<Object> batchDetail(@PathVariable("id")long id) {
        return new ResponseEntity<>(batchRepository.findById(id).orElseThrow(EntityNotFoundException::new),
                HttpStatus.OK);
    }
}
