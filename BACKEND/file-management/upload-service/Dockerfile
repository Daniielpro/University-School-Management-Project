FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Crear el directorio uploads dentro del contenedor
RUN mkdir -p /uploads

# Dar permisos a la carpeta de uploads
RUN chmod -R 777 /uploads

EXPOSE 8088

CMD ["node", "src/server.js"]
