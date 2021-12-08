package es.iesrafaelalberti.stockcontrol;

import es.iesrafaelalberti.stockcontrol.security.AuthFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@SpringBootApplication
public class StockControlApplication {

    public static void main(String[] args) {
        SpringApplication.run(StockControlApplication.class, args);
    }

    @EnableWebSecurity
    @Configuration
    class WebSecurityConfig extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.cors().and().csrf().disable()
                    .addFilterAfter(new AuthFilter(getApplicationContext()), UsernamePasswordAuthenticationFilter.class)
                    .authorizeRequests()
                    .antMatchers("/login/**").permitAll()
                    .antMatchers("/logout").authenticated()
                    .antMatchers("/register/**").permitAll()
                    .anyRequest().authenticated();
//                    .anyRequest().permitAll();
        }

        @Bean
        public PasswordEncoder getPasswordEncoder() {
            return new BCryptPasswordEncoder();
        }

        @Bean
        CorsConfigurationSource corsConfigurationSource() {
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.addAllowedOriginPattern("*");
            corsConfiguration.setAllowedMethods(Arrays.asList(
                    HttpMethod.GET.name(),
                    HttpMethod.HEAD.name(),
                    HttpMethod.POST.name(),
                    HttpMethod.PUT.name(),
                    HttpMethod.DELETE.name(),
                    HttpMethod.OPTIONS.name(),
                    HttpMethod.PATCH.name()));
            corsConfiguration.setAllowedHeaders(
                    Arrays.asList(HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE,
                            HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN)
            );
            corsConfiguration.setAllowCredentials(true);
            corsConfiguration.setMaxAge(1800L);
            corsConfiguration.addAllowedHeader("*");
            source.registerCorsConfiguration("/**", corsConfiguration);
            return source;
        }
    }
}
