# 📋 Instrucciones de Uso - Sistema Anti-Robo

## 🎯 Flujo Completo del Sistema

### 1. Reportar una Parte Robada

1. Ve a la página **"Reportar Robo"** desde el menú principal
2. Completa el formulario con toda la información:
   - **Información de la Parte**: Nombre, marca, modelo, año, categoría, número de serie (opcional), descripción
   - **Información del Propietario**: Nombre, teléfono, email
   - **Detalles del Robo**: Fecha, ubicación, número de denuncia policial (opcional), información adicional
3. Haz clic en **"Generar Reporte"**
4. Se abrirá una ventana modal con el código QR generado
5. Haz clic en **"Descargar QR"** para guardar la imagen
   - El archivo se guardará como: `qr-parte-robada-[timestamp].png`
   - Este QR contiene el código único de tu reporte (formato: `STOLEN-[timestamp]`)

### 2. Verificar una Parte (Método 1: Escanear con Cámara)

1. Ve a la página **"Verificar QR"**
2. Selecciona la pestaña **"Escanear con Cámara"**
3. Haz clic en **"Activar Cámara"**
4. Permite el acceso a la cámara cuando el navegador lo solicite
5. Enfoca el código QR con la cámara
6. El sistema automáticamente detectará y procesará el QR
7. Verás uno de estos resultados:
   - **🚨 ALERTA: PARTE ROBADA** (fondo rojo) - La parte está registrada como robada
   - **✅ Parte Verificada** (fondo verde) - La parte NO está reportada como robada

### 3. Verificar una Parte (Método 2: Subir Imagen)

1. Ve a la página **"Verificar QR"**
2. Selecciona la pestaña **"Subir Imagen"**
3. Haz clic en **"Seleccionar Imagen"** o arrastra un archivo
4. Selecciona la imagen del QR (puede ser el archivo descargado)
5. Haz clic en **"Verificar QR"**
6. El sistema procesará la imagen y mostrará el resultado

### 4. Verificar una Parte (Método 3: Código Manual)

1. Ve a la página **"Verificar QR"**
2. Selecciona la pestaña **"Código Manual"**
3. Ingresa el código manualmente (ejemplo: `STOLEN-1699000000001`)
4. Haz clic en **"Verificar Código"**
5. El sistema buscará el código y mostrará el resultado

## ✅ Resultados de Verificación

### Si la Parte ESTÁ ROBADA 🚨

Verás una pantalla con:
- ⚠️ Icono de alerta grande (rojo)
- **Información de la Parte**: Nombre, marca, modelo, año, categoría, número de serie, descripción
- **Información del Robo**: Fecha del robo, ubicación, denuncia policial, fecha de registro
- **Recomendaciones**:
  - ❌ NO compres esta parte
  - 📞 Contacta a las autoridades si tienes información
  - 📢 Comparte esta información
  - 🚨 Reporta al vendedor

### Si la Parte NO ESTÁ ROBADA ✅

Verás una pantalla con:
- ✓ Icono de verificación (verde)
- Confirmación de que el código no coincide con partes robadas
- **Recomendaciones generales**:
  - ✓ Verifica siempre la procedencia
  - 📄 Solicita documentación al vendedor
  - 🏪 Compra en lugares confiables
  - 🤔 Si tienes dudas, consulta con expertos

## 🔧 Características Técnicas

### Almacenamiento
- Los reportes se guardan en **localStorage** del navegador
- Los datos persisten entre sesiones
- No se requiere conexión a internet después de la carga inicial

### Código QR
- Formato: PNG con fondo blanco
- Tamaño: 300x300 píxeles
- Contenido: Código único del reporte (ejemplo: `STOLEN-1699000000001`)
- Nivel de corrección de errores: Alto (H)

### Compatibilidad
- Funciona en navegadores modernos (Chrome, Firefox, Safari, Edge)
- Responsive: Se adapta a móviles, tablets y escritorio
- Cámara: Requiere navegador con soporte para MediaDevices API
- Subir imágenes: Compatible con JPG, PNG, GIF

## 🎨 Interfaz de Usuario

### Colores del Sistema
- 🔴 **Rojo (#ff4444)**: Parte robada - PELIGRO
- 🟢 **Verde (#00ff88)**: Parte verificada - SEGURO
- 🟡 **Amarillo (#ffaa00)**: Advertencias y recomendaciones
- 🔵 **Azul (#00d4ff)**: Elementos primarios e información

### Notificaciones
- Aparecen en la esquina superior derecha
- Tipos:
  - ✓ **Success** (verde): Operación exitosa
  - ⚠️ **Warning** (amarillo): Advertencia o error menor
  - ❌ **Error** (rojo): Error crítico

## 📱 Uso en Móvil

1. **Reportar Robo**: Completa el formulario, genera QR y descárgalo en tu galería
2. **Verificar con Cámara**: Escanea QRs físicos o en pantallas
3. **Verificar Subiendo**: Selecciona la imagen del QR desde tu galería
4. **Compartir**: Comparte el QR descargado por WhatsApp, email, etc.

## 🔍 Casos de Uso

### Como Víctima de Robo
1. Reporta tu parte robada inmediatamente
2. Descarga el QR y guárdalo
3. Comparte el QR en redes sociales y grupos de motociclistas
4. Proporciona el QR a talleres y vendedores de confianza

### Como Comprador
1. Antes de comprar, pide al vendedor que muestre el QR (si tiene)
2. Escanea o verifica el código
3. Si sale ALERTA ROJA, no compres y reporta
4. Si sale VERDE, verifica igualmente la documentación

### Como Vendedor Legítimo
1. Si no tienes QR, puedes obtener uno al registrar la parte
2. Muestra el QR a compradores potenciales
3. Demuestra que tu mercancía es legítima

## ⚠️ Limitaciones y Avisos

- ⚡ El sistema funciona con la base de datos local del navegador
- 🌐 En una implementación real, se requeriría un servidor centralizado
- 📊 Los datos solo se comparten si usas el mismo navegador/dispositivo
- 🔒 Este sistema es una herramienta de ayuda, NO sustituye denuncias policiales
- ⚖️ No garantizamos la procedencia legal, solo verificamos contra reportes

## 🆘 Solución de Problemas

### La cámara no funciona
- Verifica los permisos del navegador
- Prueba con otro navegador
- Usa el método de "Subir Imagen" como alternativa

### No puedo descargar el QR
- Verifica que tu navegador permita descargas
- Haz clic derecho en el QR > "Guardar imagen como..."

### El QR no se lee
- Asegúrate de que la imagen sea clara
- Verifica que haya buena iluminación
- Prueba con el método de "Código Manual"

### No encuentro mi reporte
- Verifica que estás usando el mismo navegador/dispositivo
- Los datos están en localStorage, no se sincronizan entre dispositivos

## 📞 Soporte

Para reportar problemas o sugerencias, usa la página de **Contacto** en el menú principal.

---

**Versión**: 1.0  
**Última actualización**: 2024  
**Desarrollado para**: Comunidad de motociclistas y prevención de venta de partes robadas
