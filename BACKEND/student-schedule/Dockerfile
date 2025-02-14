# ✅ 1️⃣ Usa la imagen oficial de Go como base
FROM golang:1.23 AS builder

# ✅ 2️⃣ Configurar el directorio de trabajo
WORKDIR /app

# ✅ 3️⃣ Copiar los archivos del proyecto
COPY go.mod go.sum ./
RUN go mod tidy

# ✅ 4️⃣ Copiar el código fuente
COPY . .

# ✅ 5️⃣ Compilar el binario
RUN go build -o student-schedule main.go

# ✅ 6️⃣ Crear una imagen final más liviana
FROM ubuntu:latest

# ✅ 7️⃣ Instalar dependencias necesarias
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# ✅ 8️⃣ Configurar el directorio de trabajo
WORKDIR /root/

# ✅ 9️⃣ Copiar el binario desde la etapa anterior
COPY --from=builder /app/student-schedule .

# ✅ 🔥 Exponer el puerto del servicio
EXPOSE 8080

# ✅ 1️⃣0️⃣ Ejecutar la aplicación
CMD ["./student-schedule"]
