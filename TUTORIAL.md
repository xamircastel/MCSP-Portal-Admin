# Tutorial de Despliegue con Nginx - Newry Global Media Portal

## Requisitos previos

- Servidor con Nginx instalado
- Acceso root o sudo
- Archivo ZIP del proyecto (`newry-portal-deployment.zip`)

## Pasos de instalación

### 1. Conectar al servidor

```bash
ssh usuario@tu-servidor.com
```

### 2. Crear directorio para el sitio

```bash
sudo mkdir -p /var/www/newry-portal
```

### 3. Subir y descomprimir el archivo ZIP

```bash
# Subir el archivo newry-portal-deployment.zip al servidor
# Luego descomprimir:
sudo unzip newry-portal-deployment.zip -d /tmp/
sudo cp -r /tmp/dist/* /var/www/newry-portal/
sudo cp /tmp/nginx.conf /etc/nginx/sites-available/newry-portal
```

### 4. Configurar permisos

```bash
sudo chown -R www-data:www-data /var/www/newry-portal
sudo chmod -R 755 /var/www/newry-portal
```

### 5. Editar configuración de Nginx

```bash
sudo nano /etc/nginx/sites-available/newry-portal
```

Cambiar `tu-dominio.com` por tu dominio real o IP del servidor.

### 6. Habilitar el sitio

```bash
sudo ln -s /etc/nginx/sites-available/newry-portal /etc/nginx/sites-enabled/
```

### 7. Verificar configuración

```bash
sudo nginx -t
```

### 8. Reiniciar Nginx

```bash
sudo systemctl reload nginx
```

## Verificación

- Acceder a `http://tu-dominio.com`
- Verificar que no hay errores 404 en la consola del navegador
- Confirmar que el logo se muestra correctamente

## Solución de problemas

### Si persisten errores 404

Verificar que todos los archivos de la carpeta `dist/assets/` estén en `/var/www/newry-portal/assets/` con los nombres exactos generados por Vite.

### Estructura de archivos requerida

```
/var/www/newry-portal/
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
├── newry-logo.png
└── otros archivos de assets
```

### Verificar logs de error

```bash
sudo tail -f /var/log/nginx/error.log
```

## Notas importantes

- La estructura de archivos en el servidor debe coincidir exactamente con la estructura generada en la carpeta `dist/`
- Los nombres de archivos con hash son generados automáticamente por Vite para cache-busting
- Asegurarse de que todos los archivos se copien correctamente, incluyendo subdirectorios

## Configuración adicional

### Para habilitar HTTPS (opcional)

```bash
sudo certbot --nginx -d tu-dominio.com
```

### Para verificar el estado del servicio

```bash
sudo systemctl status nginx
```