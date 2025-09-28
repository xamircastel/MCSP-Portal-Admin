# Newry Global Media - Portal Admin
## Instrucciones de Deployment con Nginx

### 📋 Requisitos
- Servidor con Nginx instalado
- Acceso root/sudo al servidor

### 🚀 Pasos de instalación

#### 1. Descomprimir el archivo
```bash
# Crear directorio
sudo mkdir -p /var/www/newry-portal

# Descomprimir el contenido de 'dist' en el directorio
sudo unzip newry-portal-dist.zip -d /var/www/newry-portal/

# Asignar permisos
sudo chown -R www-data:www-data /var/www/newry-portal
sudo chmod -R 755 /var/www/newry-portal
```

#### 2. Configurar Nginx
```bash
# Copiar configuración
sudo cp nginx.conf /etc/nginx/sites-available/newry-portal

# Editar el archivo y cambiar 'tu-dominio.com' por tu dominio real
sudo nano /etc/nginx/sites-available/newry-portal

# Habilitar el sitio
sudo ln -s /etc/nginx/sites-available/newry-portal /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl reload nginx
```

#### 3. Configurar firewall (opcional)
```bash
sudo ufw allow 'Nginx Full'
```

### 🌐 Estructura del archivo ZIP
```
newry-portal-dist.zip
├── dist/                 # Contenido web compilado
│   ├── index.html       # Página principal
│   ├── assets/          # JS, CSS optimizados
│   └── *.png, *.svg     # Logos e imágenes
├── nginx.conf           # Configuración Nginx
└── DEPLOYMENT.md        # Este archivo
```

### ✅ Verificación
- Accede a `http://tu-dominio.com`
- Deberías ver el portal de Newry Global Media
- El logo debe aparecer correctamente
- La navegación SPA debe funcionar

### 🔧 Troubleshooting
- Si el sitio no carga: verificar permisos y path en nginx.conf
- Si las rutas no funcionan: verificar configuración `try_files`
- Si los assets no cargan: verificar que todos los archivos estén en /var/www/newry-portal

### 📞 Soporte
Portal desarrollado para Newry Global Media
- Versión: 1.0.0
- Framework: React + Vite
- Deployment: Nginx compatible