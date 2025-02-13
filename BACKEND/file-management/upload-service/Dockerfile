
FROM node:18


WORKDIR /app

COPY package*.json ./
RUN npm install


COPY . .

# Crear la carpeta `uploads/` dentro de `src/` si no existe
RUN mkdir -p /app/src/uploads

# Ajustar permisos para la carpeta `uploads/` para que todos los servicios puedan acceder
RUN chmod -R 777 /app/src/uploads


EXPOSE 8088


CMD ["node", "src/server.js"]

