FROM node:18

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto de Vite
EXPOSE 5173

# Comando para iniciar Vite en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]
