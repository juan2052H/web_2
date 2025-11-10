# 🛡️ Guía del Sistema Anti-Robo con QR

## Descripción General

El sistema anti-robo permite registrar autopartes robadas y generar códigos QR únicos que cualquier persona puede escanear para verificar si una parte está reportada como robada antes de comprarla.

## 📋 Para Víctimas de Robo

### Cómo Reportar una Parte Robada

1. **Accede a la página de reporte**
   - Ve a `reporte-robo.html` o haz clic en "Reportar Robo" en el menú

2. **Completa el formulario**
   - **Información de la Parte**:
     - Nombre (Ej: Motor Honda CBR 600RR)
     - Categoría (Motores, Frenos, etc.)
     - Marca y Modelo
     - Año
     - Número de serie (si está disponible)
     - Descripción detallada
   
   - **Tus Datos**:
     - Nombre completo
     - Teléfono de contacto
     - Email
   
   - **Información del Robo**:
     - Fecha del robo
     - Ubicación
     - Número de denuncia policial (opcional)
     - Información adicional

3. **Confirma y envía**
   - Marca la casilla de verificación
   - Haz clic en "Registrar Parte Robada"

4. **Obtén tu código QR**
   - Se generará automáticamente un código QR único
   - Descarga la imagen del QR
   - Compártela en redes sociales
   - Imprímela y distribúyela

5. **Guarda tu información**
   - Anota el código único (formato: STOLEN-xxxxxxxxxx)
   - Guarda una copia del QR

## 🔍 Para Compradores

### Cómo Verificar una Parte Antes de Comprar

#### Opción 1: Escanear con Cámara

1. Ve a `verificar-qr.html`
2. Haz clic en "Escanear con Cámara"
3. Permite el acceso a la cámara
4. Apunta la cámara al código QR
5. Espera el resultado automático

#### Opción 2: Subir Imagen del QR

1. Ve a `verificar-qr.html`
2. Haz clic en "Subir Imagen QR"
3. Selecciona o arrastra una foto del QR
4. Haz clic en "Analizar QR"
5. Revisa el resultado

#### Opción 3: Ingresar Código Manual

1. Ve a `verificar-qr.html`
2. Haz clic en "Ingresar Código Manual"
3. Escribe el código (formato: STOLEN-xxxxxxxxxx)
4. Haz clic en "Verificar Código"
5. Revisa el resultado

### Interpretación de Resultados

#### ✅ Parte Verificada (Verde)
- La parte NO está en la base de datos de robos
- Puedes proceder con la compra con mayor confianza
- **Nota**: Esto no garantiza 100% la legalidad

#### ⚠️ PARTE ROBADA (Rojo)
- La parte está reportada como robada
- **NO compres esta parte**
- Verás información detallada:
  - Datos de la parte
  - Fecha y lugar del robo
  - Información del propietario
- Puedes reportar al vendedor

## 🔧 Características Técnicas

### Generación de QR
- Se usa la librería **QRCode.js**
- Cada código es único basado en timestamp
- Formato: `STOLEN-[timestamp]`
- El QR contiene:
  - ID del reporte
  - Nombre de la parte
  - Marca
  - Fecha del robo
  - Link de verificación

### Escaneo de QR
- Se usa la librería **Html5-QRCode**
- Compatible con:
  - Cámara frontal y trasera
  - Imágenes JPG, PNG, WebP
  - Entrada manual de código
- Funciona en:
  - Móviles (Android/iOS)
  - Tablets
  - Computadoras con webcam

### Almacenamiento
- Los reportes se guardan en **localStorage** del navegador
- Cada reporte incluye:
  ```json
  {
    "id": "STOLEN-1699632000000",
    "reportDate": "2025-11-10T12:00:00.000Z",
    "part": {
      "name": "Motor Honda CBR 600RR",
      "category": "1",
      "brand": "Honda",
      "model": "CBR 600RR",
      "year": "2018-2020",
      "serialNumber": "ABC123456",
      "description": "Motor en buen estado..."
    },
    "owner": {
      "name": "Juan Pérez",
      "phone": "+123456789",
      "email": "juan@email.com"
    },
    "theft": {
      "date": "2025-11-01",
      "location": "Ciudad, Zona",
      "policeReport": "DEN-2025-001",
      "additionalInfo": "..."
    },
    "status": "active"
  }
  ```

## 📱 Compatibilidad

### Navegadores
- ✅ Chrome/Edge (Recomendado)
- ✅ Firefox
- ✅ Safari (iOS 11+)
- ✅ Opera
- ⚠️ Internet Explorer (no soportado)

### Dispositivos
- ✅ Smartphones (Android/iOS)
- ✅ Tablets
- ✅ Computadoras de escritorio
- ✅ Laptops

### Cámara
- Requiere dispositivo con cámara para escaneo
- Alternativa: subir imagen o código manual
- Permisos de cámara necesarios

## 🔒 Seguridad y Privacidad

### Datos Personales
- Los datos se almacenan localmente en tu navegador
- No se envían a servidores externos (por ahora)
- El propietario decide qué información compartir

### Limitaciones Actuales
- ⚠️ Base de datos local (localStorage)
- ⚠️ No sincroniza entre dispositivos
- ⚠️ Se puede borrar al limpiar el navegador
- ⚠️ No hay verificación de identidad del reportante

### Mejoras Futuras
- 🔄 Base de datos en la nube
- 🔄 Sincronización entre usuarios
- 🔄 Verificación de identidad
- 🔄 Integración con autoridades
- 🔄 Sistema de reportes falsos

## 💡 Consejos de Uso

### Para Víctimas
1. Reporta lo antes posible
2. Incluye toda la información disponible
3. Sube fotos si es posible
4. Haz denuncia policial
5. Comparte el QR en redes sociales
6. Actualiza el estado si recuperas la parte

### Para Compradores
1. Verifica SIEMPRE antes de comprar
2. Pide al vendedor el código QR
3. Si no tiene QR, sospecha
4. Solicita documentación original
5. Compra en lugares establecidos
6. Desconfía de precios muy bajos

### Para Vendedores Legítimos
1. Genera QR de tus partes originales
2. Muestra el resultado "Verificada"
3. Conserva facturas y documentos
4. Facilita la verificación al comprador

## 🆘 Preguntas Frecuentes

**P: ¿El QR expira?**
R: No, el código QR es permanente mientras esté en la base de datos.

**P: ¿Puedo eliminar un reporte?**
R: Actualmente no, pero está planeado para futuras versiones.

**P: ¿Qué hago si encuentro mi parte robada?**
R: Contacta a las autoridades y no intentes recuperarla por tu cuenta.

**P: ¿El sistema funciona sin internet?**
R: Sí, una vez cargada la página. Los datos están en tu navegador.

**P: ¿Puedo reportar partes de autos también?**
R: Actualmente está enfocado en motocicletas, pero es adaptable.

**P: ¿Es obligatorio tener QR para vender?**
R: No es obligatorio, pero genera confianza en los compradores.

## 📞 Soporte

Si tienes problemas o sugerencias:
- Email: info@autopartesmoto.com
- Teléfono: +123 456 7890
- Página de contacto: `contacto.html`

---

**Nota**: Este es un sistema prototipo. Para uso en producción, se recomienda implementar un backend con base de datos segura y sincronización en tiempo real.
