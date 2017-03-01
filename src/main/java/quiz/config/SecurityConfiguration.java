//package quiz.config;
//
//import org.springframework.beans.factory.BeanInitializationException;
//import org.springframework.context.annotation.Bean;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.data.repository.query.SecurityEvaluationContextExtension;
//import quiz.config.security.AuthoritiesConstants;
//import quiz.security.Http401UnauthorizedEntryPoint;
//import quiz.security.jwt.JWTConfigurer;
//import quiz.security.jwt.TokenProvider;
//
//import javax.inject.Inject;
//
//@Configuration
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(
//    prePostEnabled = true,
//    securedEnabled = true
//)
//public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
//    @Inject
//    private Http401UnauthorizedEntryPoint authenticationEntryPoint;
//    @Inject
//    private UserDetailsService userDetailsService;
//    @Inject
//    private TokenProvider tokenProvider;
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Inject
//    public void configureGlobal(AuthenticationManagerBuilder auth) {
//        try {
//            auth.userDetailsService(this.userDetailsService).passwordEncoder(this.passwordEncoder());
//        } catch (Exception var3) {
//            throw new BeanInitializationException("Security configuration failed", var3);
//        }
//    }
//
//
//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        web.ignoring()
//            .antMatchers(HttpMethod.OPTIONS, "/**")
//            .antMatchers("/app/**/*.{js,html}")
//            .antMatchers("/bower_components/**")
//            .antMatchers("/i18n/**")
//            .antMatchers("/content/**")
//            .antMatchers("/swagger-ui/index.html")
//            .antMatchers("/api/register")
//            .antMatchers("/api/activate")
//            .antMatchers("/api/account/reset_password/init")
//            .antMatchers("/api/account/reset_password/finish")
//            .antMatchers("/test/**")
//            .antMatchers("/h2-console/**");
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//            .csrf()
//            .disable()
//            .headers()
//            .frameOptions()
//            .disable()
//            .and()
//            .sessionManagement()
//            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//            .and()
//            .authorizeRequests()
//            .antMatchers("/api/register").permitAll()
//            .antMatchers("/api/activate").permitAll()
//            .antMatchers("/api/authenticate").permitAll()
//            .antMatchers("/api/account/reset_password/init").permitAll()
//            .antMatchers("/api/account/**").permitAll()
//            .antMatchers("/api/account/reset_password/finish").permitAll()
//            .antMatchers("/api/profile-info").permitAll()
//            .antMatchers("/api/**").authenticated()
//            .antMatchers("/websocket/tracker").hasAuthority(AuthoritiesConstants.ADMIN)
//            .antMatchers("/websocket/**").permitAll()
//            .antMatchers("/management/health").permitAll()
//            .antMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN)
//            .antMatchers("/v2/api-docs/**").permitAll()
//            .antMatchers("/swagger-resources/configuration/ui").permitAll()
//            .antMatchers("/swagger-ui/index.html").hasAuthority(AuthoritiesConstants.ADMIN);
////            .and()
////            .apply(securityConfigurerAdapter());
//    }
//
//
//    private JWTConfigurer securityConfigurerAdapter() {
//        return new JWTConfigurer(this.tokenProvider);
//    }
//
//    @Bean
//    public SecurityEvaluationContextExtension securityEvaluationContextExtension() {
//        return new SecurityEvaluationContextExtension();
//    }
//}
