package es.iesrafaelalberti.stockcontrol.controllers;

import es.iesrafaelalberti.stockcontrol.models.Role;
import es.iesrafaelalberti.stockcontrol.models.User;
import es.iesrafaelalberti.stockcontrol.repositories.RoleRepository;
import es.iesrafaelalberti.stockcontrol.repositories.UserRepository;
import es.iesrafaelalberti.stockcontrol.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import io.jsonwebtoken.Jwts;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AuthService authService;

    @PutMapping("/usuario/{id}")
    public ResponseEntity<?> userUpdate(@PathVariable("id")long id,
                                        @RequestBody User newUser) {
        userRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        newUser.setId(id);
        userRepository.save(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @Secured({"ADMIN"}) //Solo puede borrar el admin
    @DeleteMapping("/usuario/{id}")
    public ResponseEntity<?> userDelete(@PathVariable("id")long id) {
        User oldUser = userRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);
        userRepository.delete(oldUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/usuarios")
    public ResponseEntity<Object> userList(@RequestParam("page") int page) {
        return new ResponseEntity<>(userRepository.getUsersInRange(PageRequest.of(page,6))
                , HttpStatus.OK);
    }

    @GetMapping(value = "/usuario/{id}")
    public ResponseEntity<Object> userDetail(@PathVariable("id")long id) {
        return new ResponseEntity<>(userRepository.findById(id).orElseThrow(EntityNotFoundException::new),
                HttpStatus.OK);
    }

//    LOGIN & REGISTER

    @GetMapping(value = "/logout")
    public ResponseEntity<Object> logout() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();

        return new ResponseEntity<>("Cerrada sesión de " + currentPrincipalName, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody User user) {
        Optional<User> optionalUser = userRepository.getUserByEmail(user.getEmail());

        if (optionalUser.isEmpty()) return new ResponseEntity<>("Usuario no encontrado: " + user.getEmail(), HttpStatus.NOT_FOUND);

        User userLogin = optionalUser.get();

        if (!new BCryptPasswordEncoder().matches(user.getPassword(), userLogin.getPassword())) return new ResponseEntity<>(userLogin.getEmail(), HttpStatus.FORBIDDEN);

        if (userLogin.getToken() != null) {
            try {
                Jwts.parser().parse(userLogin.getToken()).getBody();
                return new ResponseEntity<>("", HttpStatus.CONFLICT);
            } catch (Exception e) {
                userLogin.setToken(null);
            }
        }

        String token = authService.login(userLogin);

        if (token == null) return new ResponseEntity<>("Usuario ya logueado " + userLogin.getEmail(), HttpStatus.CONFLICT);

        return new ResponseEntity<>(token, HttpStatus.OK);
    }


    @PostMapping("/register")
    public ResponseEntity<?> userNew(@RequestBody User newUser) {
        Optional<User> userOptional = userRepository.getUserByEmail(newUser.getEmail());

        if (userOptional.isPresent()) return new ResponseEntity<>("El usuario ya existe", HttpStatus.CONFLICT);
        if (newUser.getRoles().isEmpty()) {
            Optional<Role> optionalRole = roleRepository.getRoleByName("USER");
            if (optionalRole.isPresent()) {
                newUser.getRoles().add(optionalRole.get());
            }
        }
        userRepository.save(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

}
