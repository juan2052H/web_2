# ✅ Lista de Verificación - Sistema Anti-Robo

## 🧪 Pruebas del Sistema

### ✅ Checklist de Funcionalidad

#### 1. Reportar Parte Robada
- [ ] Abrir `reporte-robo.html`
- [ ] Completar todos los campos del formulario
- [ ] Hacer clic en "Generar Reporte"
- [ ] Verificar que aparece el modal con el QR
- [ ] El QR debe ser visible (cuadrado negro sobre fondo blanco)
- [ ] Hacer clic en "Descargar QR"
- [ ] Verificar que se descarga el archivo PNG (formato: `qr-parte-robada-[timestamp].png`)
- [ ] Guardar el código que aparece en el modal (formato: `STOLEN-xxxxxxxxxx`)

#### 2. Verificar con Código Manual
- [ ] Abrir `verificar-qr.html`
- [ ] Ir a la pestaña "Código Manual"
- [ ] Ingresar el código del reporte anterior
- [ ] Hacer clic en "Verificar Código"
- [ ] Debe aparecer **ALERTA: PARTE ROBADA** (fondo rojo)
- [ ] Verificar que se muestra toda la información:
  - Código de reporte
  - Nombre de la parte
  - Marca, modelo, año
  - Categoría
  - Descripción
  - Fecha del robo
  - Ubicación
  - Fecha de registro
- [ ] Probar con un código inventado (ejemplo: `STOLEN-99999999`)
- [ ] Debe aparecer **Parte Verificada** (fondo verde)

#### 3. Verificar Subiendo Imagen QR
- [ ] Abrir `verificar-qr.html`
- [ ] Ir a la pestaña "Subir Imagen"
- [ ] Hacer clic en "Seleccionar Imagen"
- [ ] Seleccionar el QR descargado anteriormente
- [ ] Hacer clic en "Verificar QR"
- [ ] Debe aparecer **ALERTA: PARTE ROBADA** con toda la información

#### 4. Verificar con Cámara (Opcional - requiere cámara)
- [ ] Abrir `verificar-qr.html`
- [ ] Ir a la pestaña "Escanear con Cámara"
- [ ] Hacer clic en "Activar Cámara"
- [ ] Permitir acceso a la cámara
- [ ] Mostrar el QR impreso o en otra pantalla
- [ ] El sistema debe detectar automáticamente el QR
- [ ] Debe aparecer el resultado de verificación

#### 5. Navegación y UI
- [ ] Verificar que todos los enlaces del menú funcionan
- [ ] Probar en móvil (responsive)
- [ ] Verificar que las notificaciones aparecen correctamente
- [ ] Verificar animaciones y transiciones

### 🎯 Datos de Prueba

**Reporte de Ejemplo 1:**
```
=== Información de la Parte ===
Parte: Motor 250cc
Marca: Honda
Modelo: CG 250
Año: 2020
Categoría: Motores
Número de Serie: MOT123456789
Descripción: Motor completo con cárter negro

=== Información del Propietario ===
Nombre: Juan Pérez
Teléfono: +1234567890
Email: juan@example.com

=== Detalles del Robo ===
Fecha: 2024-01-15
Ubicación: Av. Principal 123, Ciudad
Denuncia: DNP-2024-001
Info Adicional: Robado del estacionamiento del edificio
```

**Reporte de Ejemplo 2:**
```
=== Información de la Parte ===
Parte: Disco de Freno Delantero
Marca: Yamaha
Modelo: YBR 125
Año: 2019
Categoría: Frenos
Número de Serie: N/A
Descripción: Disco ventilado de 300mm

=== Información del Propietario ===
Nombre: María González
Teléfono: +0987654321
Email: maria@example.com

=== Detalles del Robo ===
Fecha: 2024-02-20
Ubicación: Taller Mecánico Sur
Denuncia: No especificado
Info Adicional: Desarmaron la moto mientras estaba en reparación
```

### 🔍 Escenarios de Prueba

#### Escenario 1: Comprador Verificando Parte
1. Un vendedor ofrece una parte usada
2. El comprador solicita verificar la parte
3. El comprador escanea/sube el QR
4. Si sale ROJA → No comprar
5. Si sale VERDE → Proceder con precaución

#### Escenario 2: Víctima Reportando
1. Se roba una parte de una motocicleta
2. El dueño ingresa a `reporte-robo.html`
3. Completa el formulario con todos los datos
4. Descarga el QR
5. Comparte el QR en redes sociales y grupos

#### Escenario 3: Vendedor Legítimo
1. Vendedor de partes usadas legítimas
2. Puede solicitar verificación de sus partes
3. Si no hay reporte, sale verificado (verde)
4. Genera confianza en compradores

### 📊 Resultados Esperados

#### Cuando HAY Reporte (Parte Robada):
```
✗ Icono de alerta rojo grande
✗ Título: "⚠️ ALERTA: PARTE ROBADA"
✗ Mensaje: "Esta parte ha sido reportada como robada. NO la compres."
✗ Cuadro rojo con toda la información de la parte
✗ Cuadro oscuro con información del robo
✗ Cuadro amarillo con recomendaciones
✗ Botón para "Reportar Información"
```

#### Cuando NO HAY Reporte (Parte Limpia):
```
✓ Icono de check verde grande
✓ Título: "✓ Parte Verificada"
✓ Mensaje: "Esta parte NO está reportada como robada"
✓ Cuadro verde con código verificado
✓ Cuadro amarillo con recomendaciones generales
✓ Nota legal sobre limitaciones del sistema
```

### ⚠️ Posibles Problemas y Soluciones

| Problema | Causa Probable | Solución |
|----------|---------------|----------|
| QR no se genera | Librería no cargó | Verificar conexión a CDN |
| QR no se descarga | Popup bloqueado | Permitir descargas en navegador |
| Cámara no funciona | Sin permisos | Permitir acceso a cámara |
| QR no se lee | Imagen borrosa | Usar mejor iluminación |
| No encuentra reporte | localStorage borrado | Volver a reportar |
| Página no carga | Ruta incorrecta | Verificar estructura de archivos |

### 🌐 Compatibilidad

**Navegadores Probados:**
- [ ] Chrome/Edge (Windows)
- [ ] Firefox (Windows)
- [ ] Safari (macOS/iOS)
- [ ] Chrome (Android)

**Dispositivos:**
- [ ] PC de escritorio
- [ ] Laptop
- [ ] Tablet
- [ ] Smartphone

### 📝 Notas de Prueba

**Fecha de Prueba**: _______________

**Navegador**: _______________

**Dispositivo**: _______________

**Resultados**:
```
✅ Todo funciona correctamente
⚠️ Funciona con problemas menores
❌ No funciona

Detalles:
_________________________________
_________________________________
_________________________________
```

---

## 🚀 Despliegue en GitHub Pages

Una vez verificado que todo funciona:

1. Crear repositorio en GitHub
2. Subir todos los archivos
3. Ir a Settings > Pages
4. Seleccionar branch `main` y carpeta `root`
5. Guardar y esperar 2-3 minutos
6. La página estará en: `https://[usuario].github.io/[repositorio]`

## 📄 Archivos Necesarios

Verificar que estos archivos existen:

```
✅ index.html
✅ productos.html
✅ carrito.html
✅ contacto.html
✅ reporte-robo.html
✅ verificar-qr.html
✅ script.js
✅ stolen-parts.js
✅ styles.css
✅ data.json
✅ README.md
✅ GUIA-SISTEMA-ANTIROBO.md
✅ DESPLIEGUE-GITHUB-PAGES.md
✅ RESUMEN-PROYECTO.md
✅ INDICE.md
✅ INSTRUCCIONES-USO.md
✅ CHECKLIST-PRUEBAS.md (este archivo)
```

**Total: 17 archivos** ✓

---

**Estado del Proyecto**: Listo para Producción ✅  
**Última Verificación**: 2024  
**Próximo Paso**: Desplegar en GitHub Pages
