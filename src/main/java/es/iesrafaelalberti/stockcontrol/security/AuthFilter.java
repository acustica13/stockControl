package es.iesrafaelalberti.stockcontrol.security;

import es.iesrafaelalberti.stockcontrol.models.User;
import es.iesrafaelalberti.stockcontrol.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.hibernate.Hibernate;
import org.springframework.context.ApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.persistence.EntityNotFoundException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthFilter extends OncePerRequestFilter {
    private final Environment environment;

    private final UserRepository userRepository;

    public AuthFilter(ApplicationContext applicationContext) {
        this.environment = applicationContext.getBean(Environment.class);
        this.userRepository = applicationContext.getBean(UserRepository.class);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        final String secretKey = environment.getProperty("secret.key");

        if(httpServletRequest.getHeader("Authorization") != null) {
            if (!httpServletRequest.getHeader("Authorization").startsWith("Bearer ")) {
                SecurityContextHolder.clearContext();
            } else {
                String jwtToken = httpServletRequest.getHeader("Authorization").replace("Bearer ", "");
                try {
                    Claims claims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(jwtToken).getBody();
                    String email = claims.getSubject();
                    User user = userRepository.getUserByEmail(email)
                            .orElseThrow(EntityNotFoundException::new);
                    if(!user.getToken().equals(jwtToken))
                        throw new Exception();

                    Hibernate.initialize(user.getShop());
                    Hibernate.initialize(user.getRoles());

                    setUpSpringAuthentication(user);
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                    SecurityContextHolder.clearContext();
                }
            }

        } else {
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private void setUpSpringAuthentication(User user) {
        Hibernate.initialize(user.getShop());
        Hibernate.initialize(user.getRoles());

        UsernamePasswordAuthenticationToken auth =
            new UsernamePasswordAuthenticationToken(user, null, user.getRoles());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }
}