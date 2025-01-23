package config_microservice.config_microservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@EnableConfigServer
@SpringBootApplication
public class ConfigMicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConfigMicroserviceApplication.class, args);
	}

}
