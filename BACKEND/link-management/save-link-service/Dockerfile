# Usa Node.js como base
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos
COPY . .

# Exponer el puerto
EXPOSE 8085

# Comando para ejecutar la app
CMD ["node", "src/server.js"]
