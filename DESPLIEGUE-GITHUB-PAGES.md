# 🚀 Despliegue en GitHub Pages

## Guía Completa de Publicación

### Paso 1: Preparar el Repositorio en GitHub

1. **Crear cuenta en GitHub** (si no tienes una)
   - Ve a https://github.com
   - Haz clic en "Sign up"
   - Completa el registro

2. **Crear nuevo repositorio**
   - Haz clic en el botón "+" → "New repository"
   - **Nombre del repositorio**: `autopartes-moto` (o el que prefieras)
   - **Descripción**: "Tienda online de autopartes con sistema anti-robo QR"
   - Marca como **Público** (necesario para GitHub Pages gratis)
   - ✅ Marca "Add a README file"
   - Haz clic en "Create repository"

### Paso 2: Subir los Archivos

#### Opción A: Usando Git (Terminal/PowerShell)

1. **Instalar Git** (si no lo tienes)
   - Descarga desde: https://git-scm.com/downloads
   - Instala con las opciones por defecto

2. **Configurar Git** (solo primera vez)
   ```powershell
   git config --global user.name "Tu Nombre"
   git config --global user.email "tu@email.com"
   ```

3. **Navegar a tu carpeta del proyecto**
   ```powershell
   cd "c:\Users\Usuario\OneDrive\Escritorio\trabajo final   50"
   ```

4. **Inicializar repositorio local**
   ```powershell
   git init
   ```

5. **Agregar todos los archivos**
   ```powershell
   git add .
   ```

6. **Crear primer commit**
   ```powershell
   git commit -m "Initial commit - Sistema de autopartes con anti-robo QR"
   ```

7. **Conectar con GitHub**
   ```powershell
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/autopartes-moto.git
   ```
   > ⚠️ Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub

8. **Subir archivos**
   ```powershell
   git push -u origin main
   ```
   > Te pedirá usuario y contraseña/token de GitHub

#### Opción B: Usando la Interfaz Web de GitHub

1. Ve a tu repositorio en GitHub
2. Haz clic en "Add file" → "Upload files"
3. Arrastra todos los archivos del proyecto
4. Escribe un mensaje de commit: "Subir archivos del proyecto"
5. Haz clic en "Commit changes"

### Paso 3: Activar GitHub Pages

1. **Ve a tu repositorio en GitHub**

2. **Accede a Settings (Configuración)**
   - Haz clic en la pestaña "Settings"

3. **Configurar Pages**
   - En el menú izquierdo, busca "Pages"
   - En "Source", selecciona:
     - **Branch**: `main`
     - **Folder**: `/ (root)`
   - Haz clic en "Save"

4. **Esperar el despliegue**
   - GitHub tardará 1-5 minutos en publicar
   - Verás un mensaje: "Your site is ready to be published at..."

5. **Acceder a tu sitio**
   - URL será: `https://TU-USUARIO.github.io/autopartes-moto/`
   - Ejemplo: `https://juanperez.github.io/autopartes-moto/`

### Paso 4: Verificar el Funcionamiento

✅ **Checklist de pruebas:**

- [ ] La página principal carga correctamente
- [ ] El menú de navegación funciona
- [ ] Los productos se cargan desde data.json
- [ ] El carrito funciona
- [ ] El sistema de reporte funciona
- [ ] Se pueden generar códigos QR
- [ ] Se pueden verificar códigos QR
- [ ] El diseño responsive funciona en móvil

### Paso 5: Actualizar el Sitio

Cada vez que hagas cambios:

```powershell
# 1. Agregar cambios
git add .

# 2. Crear commit con descripción
git commit -m "Descripción de los cambios"

# 3. Subir a GitHub
git push
```

GitHub Pages actualizará automáticamente en 1-2 minutos.

## 🔧 Configuración Avanzada

### Dominio Personalizado

1. **Comprar un dominio** (opcional)
   - Proveedores: Namecheap, GoDaddy, Google Domains

2. **Configurar DNS**
   - Agrega estos registros en tu proveedor:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: TU-USUARIO.github.io
   ```

3. **En GitHub Pages**
   - Ve a Settings → Pages
   - En "Custom domain", escribe: `tudominio.com`
   - Espera verificación DNS (puede tardar 24-48 horas)

### HTTPS (SSL)

- GitHub Pages incluye HTTPS automático
- Una vez configurado el dominio, marca:
  - ✅ "Enforce HTTPS"

## 🐛 Solución de Problemas

### Error 404 - Página no encontrada
**Causa**: Los archivos no están en la rama correcta o la carpeta root
**Solución**:
1. Verifica que los archivos estén en la rama `main`
2. Confirma que `index.html` esté en la raíz (no en subcarpeta)

### Los estilos no se cargan
**Causa**: Rutas incorrectas en los enlaces
**Solución**:
1. Asegúrate que los archivos CSS/JS usen rutas relativas
2. Ejemplo correcto: `<link rel="stylesheet" href="styles.css">`
3. Evitar: `<link rel="stylesheet" href="/styles.css">`

### El sistema de QR no funciona
**Causa**: Librerías externas bloqueadas o permisos de cámara
**Solución**:
1. Verifica que las URLs de las CDN sean HTTPS
2. Permite permisos de cámara en el navegador
3. Prueba en modo incógnito

### LocalStorage no persiste
**Causa**: Navegador en modo privado o configuración de privacidad
**Solución**:
1. No usar modo incógnito/privado
2. Verificar configuración de cookies del navegador
3. Usar navegador compatible (Chrome, Firefox, Safari)

## 📊 Analytics (Opcional)

### Google Analytics

1. **Crear cuenta** en https://analytics.google.com

2. **Obtener código de seguimiento**

3. **Agregar antes de `</head>` en todas las páginas**:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

## 🔐 Seguridad

### Consideraciones Importantes

⚠️ **Limitaciones del sistema actual:**
- Los datos están solo en localStorage (no sincronizados)
- No hay autenticación de usuarios
- No hay verificación de reportes
- Cualquiera puede reportar sin validación

✅ **Recomendaciones:**
1. Este es un prototipo educativo
2. Para producción, implementar backend
3. Añadir sistema de autenticación
4. Validar reportes con autoridades
5. Base de datos en servidor

## 📱 Optimización

### Mejorar Rendimiento

1. **Comprimir imágenes**
   - Usa TinyPNG.com
   - Formato WebP para mejor compresión

2. **Minificar CSS/JS**
   - Usa herramientas online
   - Ejemplo: https://www.minifier.org/

3. **Cache del navegador**
   - Ya incluido automáticamente en GitHub Pages

## 🎯 Promoción del Sitio

1. **Compartir en redes sociales**
2. **Agregar a Google Search Console**
3. **Crear página de Facebook/Instagram**
4. **Compartir códigos QR de ejemplo**
5. **Hacer tutoriales en video**

## 📞 Soporte

Si tienes problemas:

1. **Documentación oficial de GitHub Pages**
   - https://docs.github.com/es/pages

2. **Comunidad GitHub**
   - https://github.community/

3. **Stack Overflow**
   - https://stackoverflow.com/

## ✅ Checklist Final

Antes de publicar, verifica:

- [ ] Todos los archivos están subidos
- [ ] data.json está correctamente formateado
- [ ] No hay rutas absolutas en el código
- [ ] Las CDN de librerías externas funcionan
- [ ] El README.md está completo
- [ ] Los enlaces internos funcionan
- [ ] El sitio es responsive
- [ ] Se probó en diferentes navegadores
- [ ] Los formularios funcionan
- [ ] El sistema QR genera y verifica correctamente

---

## 🎉 ¡Listo!

Tu sitio estará disponible en:
**https://TU-USUARIO.github.io/autopartes-moto/**

¡Comparte el link y el sistema anti-robo con la comunidad motociclista!

---

**Última actualización**: Noviembre 2025
