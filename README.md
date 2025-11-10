# Comercio de Autopartes - Motocicletas

Prototipo de tienda online para comercio de autopartes de motocicletas, completamente funcional con GitHub Pages.

## 🚀 Características

- ✅ **100% Frontend**: Funciona completamente con HTML, CSS y JavaScript
- ✅ **Base de datos JSON**: Todos los datos se almacenan en `data.json`
- ✅ **Responsive**: Diseño adaptable a todos los dispositivos
- ✅ **Carrito de compras**: Funcional con localStorage
- ✅ **Filtros y búsqueda**: Encuentra productos fácilmente
- ✅ **Categorías**: Organización por tipos de autopartes
- ✅ **Formulario de contacto**: Comunicación con clientes
- ✅ **Sistema Anti-Robo con QR**: Reporta y verifica partes robadas
- ✅ **Generación de QR**: Códigos QR únicos para cada reporte
- ✅ **Verificación múltiple**: Escaneo con cámara, subida de imagen o código manual

## 📁 Estructura del Proyecto

```
trabajo final 50/
│
├── index.html          # Página principal
├── productos.html      # Catálogo de productos
├── carrito.html        # Carrito de compras
├── contacto.html       # Formulario de contacto
├── reporte-robo.html   # Sistema de reporte de partes robadas
├── verificar-qr.html   # Verificación de códigos QR
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript principal
├── stolen-parts.js     # Sistema de partes robadas y QR
├── data.json           # Base de datos (productos, categorías, etc.)
└── README.md           # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS y animaciones
- **JavaScript (Vanilla)**: Funcionalidad interactiva sin frameworks
- **Font Awesome**: Iconos
- **LocalStorage**: Persistencia del carrito

## 🎨 Características de Diseño

- Tema oscuro con acentos en cian/azul
- Animaciones suaves y transiciones
- Efectos hover interactivos
- Diseño inspirado en tecnología futurista
- Decoraciones geométricas

## 📦 Base de Datos JSON

El archivo `data.json` contiene:
- **Productos**: 16 productos con información detallada
- **Categorías**: 8 categorías de autopartes
- **Información de contacto**: Datos de la tienda
- **Testimonios**: Opiniones de clientes (opcional)

## 🚀 Despliegue en GitHub Pages

### Pasos para publicar:

1. **Crear repositorio en GitHub**
   - Ve a GitHub y crea un nuevo repositorio
   - Nombre sugerido: `autopartes-moto`

2. **Subir archivos**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Tienda de autopartes"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/autopartes-moto.git
   git push -u origin main
   ```

3. **Activar GitHub Pages**
   - Ve a Settings > Pages
   - En "Source", selecciona la rama `main`
   - Carpeta: `/ (root)`
   - Guarda y espera unos minutos

4. **Acceder al sitio**
   - Tu sitio estará disponible en: `https://TU-USUARIO.github.io/autopartes-moto/`

## 🔧 Configuración

### Personalizar datos:

Edita el archivo `data.json` para:
- Agregar/modificar productos
- Cambiar categorías
- Actualizar información de contacto
- Modificar precios

### Personalizar diseño:

Edita `styles.css` para cambiar:
- Colores (variables en `:root`)
- Fuentes
- Espaciados
- Animaciones

## 📱 Funcionalidades

### Página Principal (index.html)
- Hero con diseño atractivo
- Alerta del sistema anti-robo
- Categorías destacadas
- Productos destacados
- Características de la tienda

### Catálogo (productos.html)
- Todos los productos
- Filtros por categoría
- Búsqueda por nombre/descripción
- Botón "Agregar al carrito"
- Verificación automática de partes robadas

### Carrito (carrito.html)
- Productos agregados
- Control de cantidad
- Eliminación de productos
- Resumen de compra (subtotal, IVA, envío)
- Persistencia con localStorage

### Contacto (contacto.html)
- Formulario de contacto
- Información de la tienda
- Horarios de atención
- Enlaces a redes sociales

### 🚨 Sistema Anti-Robo (reporte-robo.html)
- Formulario completo para reportar partes robadas
- Información de la parte (nombre, marca, modelo, serie)
- Datos del propietario
- Detalles del robo (fecha, ubicación, denuncia policial)
- Generación automática de código QR único
- Descarga del QR en formato imagen
- Almacenamiento en localStorage

### 🔍 Verificación de QR (verificar-qr.html)
- **Escaneo con cámara**: Usa la cámara del dispositivo para escanear QR en tiempo real
- **Subir imagen**: Sube una foto del código QR desde el dispositivo
- **Código manual**: Ingresa el código de reporte manualmente
- Muestra información completa de la parte robada
- Lista de reportes recientes
- Resultados instantáneos (ROBADA o VERIFICADA)
- Recomendaciones de seguridad

## 🎯 Características Técnicas

### JavaScript
- Carga asíncrona de datos JSON
- Manejo de eventos
- Manipulación del DOM
- LocalStorage para carrito y partes robadas
- Notificaciones interactivas
- Generación de códigos QR con QRCode.js
- Escaneo de QR con Html5-QRCode
- Procesamiento de imágenes para lectura de QR

### CSS
- Flexbox y Grid
- Variables CSS
- Animaciones y transiciones
- Media queries para responsive
- Efectos de hover

### Librerías Externas
- **QRCode.js**: Generación de códigos QR
- **Html5-QRCode**: Escaneo de códigos QR con cámara
- **Font Awesome**: Iconos

## 📝 Notas

- **Sin backend**: Todo funciona en el cliente
- **Sin base de datos real**: Usa JSON estático
- **Carrito persistente**: Usa localStorage del navegador
- **Compatible con GitHub Pages**: 100% estático

## �️ Sistema Anti-Robo

### Cómo Funciona

1. **Reportar Parte Robada**:
   - El propietario llena un formulario con información detallada
   - El sistema genera un código único (STOLEN-timestamp)
   - Se crea un código QR con toda la información
   - Los datos se guardan en localStorage
   - El QR se puede descargar e imprimir

2. **Verificar Parte**:
   - Escanea el QR con la cámara del dispositivo
   - Sube una foto del QR
   - Ingresa el código manualmente
   - El sistema busca en la base de datos local
   - Muestra si la parte está reportada como robada

3. **Prevención**:
   - Las partes robadas tienen un identificador único
   - Cualquiera puede verificar antes de comprar
   - Sistema de alertas visuales
   - Base de datos actualizable

### Datos Almacenados

Para cada reporte se guarda:
- Código único de identificación
- Información completa de la parte
- Datos del propietario
- Detalles del robo
- Fecha de registro
- Estado de verificación

## �🔄 Actualizaciones Futuras

Posibles mejoras:
- [ ] Sistema de usuarios con autenticación
- [ ] Pasarela de pago real
- [ ] Backend con API para sincronizar reportes
- [ ] Base de datos en la nube
- [ ] Sistema de reviews y calificaciones
- [ ] Panel de administración
- [ ] Integración con autoridades policiales
- [ ] Notificaciones automáticas
- [ ] Blockchain para inmutabilidad de reportes

## 📄 Licencia

Este es un proyecto prototipo para fines educativos.

## 👨‍💻 Autor

Desarrollado como prototipo de tienda online.

---

**¡Listo para usar con GitHub Pages!** 🚀
