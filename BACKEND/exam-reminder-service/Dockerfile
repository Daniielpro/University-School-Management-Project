FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto del servidor
EXPOSE 8081

# Comando para iniciar la aplicación
CMD ["node", "src/index.js"]
