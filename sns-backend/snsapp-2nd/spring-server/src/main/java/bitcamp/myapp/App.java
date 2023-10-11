package bitcamp.myapp;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpMethod;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.util.UrlPathHelper;

@EnableTransactionManagement
@SpringBootApplication
@PropertySource("server.url.properties")
@ConfigurationProperties("url")
@Getter
@Setter
public class App implements WebMvcConfigurer {

  private String reactServerUrl;
  private String nodeServerUrl;

//  @Bean
//  public MultipartResolver multipartResolver() {
//    return new StandardServletMultipartResolver();
//  }

//  @Bean
//  public ViewResolver viewResolver() {
//    InternalResourceViewResolver vr = new InternalResourceViewResolver();
//    vr.setViewClass(JstlView.class);
//    vr.setPrefix("/WEB-INF/jsp/");
//    vr.setSuffix(".jsp");
//    return vr;
//  }

  public static void main(String[] args) throws Exception {
    SpringApplication.run(App.class, args);
  }

  @Override
  public void configurePathMatch(PathMatchConfigurer configurer) {
    System.out.println("AppConfig.configurePathMatch() 호출됨");
    UrlPathHelper pathHelper = new UrlPathHelper();

    // @MatrixVariable 기능 활성화
    pathHelper.setRemoveSemicolonContent(false);

    // DispatcherServlet의 MVC Path 관련 설정을 변경한다.
    configurer.setUrlPathHelper(pathHelper);
  }

//  @Override
//  public void addInterceptors(InterceptorRegistry registry) {
//    System.out.println("AppConfig.addInterceptors() 호출됨");
//    registry
//        .addInterceptor(notReadNotiCountIntercepter())
//        .addPathPatterns("/**")
//        .excludePathPatterns("/auth/**")
//        .excludePathPatterns("/");
//
//  }
//
//  @Bean
//  NotReadNotiCountIntercepter notReadNotiCountIntercepter() {
//    return new NotReadNotiCountIntercepter();
//  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins(reactServerUrl, nodeServerUrl)
        .allowCredentials(true)
        .allowedMethods(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.PATCH.name(),
            HttpMethod.DELETE.name(), HttpMethod.HEAD.name(), HttpMethod.TRACE.name(),
            HttpMethod.PUT.name(), HttpMethod.OPTIONS.name());
  }
}
