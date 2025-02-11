# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias e instálalas
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto del microservicio
EXPOSE 8094

# Comando para iniciar el microservicio
CMD ["node", "src/server.js"]
