package es.iesrafaelalberti.stockcontrol.services;

import es.iesrafaelalberti.stockcontrol.models.User;
import es.iesrafaelalberti.stockcontrol.repositories.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Environment env;

    @Transactional
    public String login(User user) {
        String token;
        final String secretKey = env.getProperty("secret.key"); // clave totalmente aleatoria para usar como secretkey en nuestra encriptación
        if (secretKey == null) throw new NullPointerException("secret key is null");
        token = Jwts.builder().setId("stockcontrol").setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 2628000000L)) // dura la cookie un mes.
                .signWith(SignatureAlgorithm.HS512, secretKey.getBytes()).compact();

        user.setToken(token);
        userRepository.save(user);

        return token;
    }

    @Transactional
    public String register(String email, String pass) {
        String encriptedPass = new BCryptPasswordEncoder().encode(pass);
        User user = userRepository.save(new User(email, encriptedPass));

        return this.login(user);
    }

}