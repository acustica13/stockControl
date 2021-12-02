package es.iesrafaelalberti.stockcontrol.controllers;

import es.iesrafaelalberti.stockcontrol.models.Supplier;
import es.iesrafaelalberti.stockcontrol.models.Supplier;
import es.iesrafaelalberti.stockcontrol.models.Supplier;
import es.iesrafaelalberti.stockcontrol.models.Supplier;
import es.iesrafaelalberti.stockcontrol.repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

@RestController
public class SupplierController {
    @Autowired
    private SupplierRepository supplierRepository;

/*    @PostMapping("/proveedor")
    public ResponseEntity<?> supplierNew(
            @RequestParam("name") String name,
            @RequestParam("location") String location,
            @RequestParam("phone") int phone,
            @RequestParam("email") String email,
            @RequestParam("postcode") int postcode) {
        Supplier newSupplier = new Supplier(name, location, phone, email, postcode);
        supplierRepository.save(newSupplier);
        return new ResponseEntity<>(newSupplier, HttpStatus.OK);
    }*/

    @PostMapping("/proveedor/nuevo")
    public ResponseEntity<?> supplierNew(@RequestBody Supplier newSupplier) {
        supplierRepository.save(newSupplier);
        return new ResponseEntity<>(newSupplier, HttpStatus.OK);
    }
    
    @PutMapping("/proveedor/{id}")
    public ResponseEntity<?> supplierUpdate(@PathVariable("id") long id,
                                        @RequestBody Supplier newSupplier) {
        supplierRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        newSupplier.setId(id);
        supplierRepository.save(newSupplier);
        return new ResponseEntity<>(newSupplier, HttpStatus.OK);
    }

    @DeleteMapping("/proveedor/{id}")
    public ResponseEntity<?> supplierDelete(@PathVariable("id") long id) {
        Supplier oldSupplier = supplierRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);
        supplierRepository.delete(oldSupplier);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/proveedores")
    public ResponseEntity<Object> supplierList(@RequestParam("page") int page) {
        return new ResponseEntity<>(supplierRepository.getSuppliersInRange(PageRequest.of(page,6))
                , HttpStatus.OK);
    }

    @GetMapping(value = "/proveedor/{id}")
    public ResponseEntity<Object> supplierDetail(@PathVariable("id") long id) {
        return new ResponseEntity<>(supplierRepository.findById(id).orElseThrow(EntityNotFoundException::new),
                HttpStatus.OK);
    }
}
