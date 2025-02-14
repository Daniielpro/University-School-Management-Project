# Usa una imagen de OpenJDK para Java 17
FROM openjdk:17-jdk-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app 

# Copia el archivo JAR generado en target/
COPY target/maestro-service-*.jar maestro-service.jar
 
# Expone el puerto 8083 en el contenedor
EXPOSE 8083  

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "maestro-service.jar"]
