// ===== Sistema de Partes Robadas =====
let stolenParts = JSON.parse(localStorage.getItem('stolenParts')) || [];

// ===== Inicialización para páginas de robo =====
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'reporte-robo.html') {
        initReportPage();
    } else if (currentPage === 'verificar-qr.html') {
        initVerifyPage();
    }
});

// ===== Página de Reporte =====
function initReportPage() {
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', handleReportSubmit);
    }
}

function handleReportSubmit(e) {
    e.preventDefault();
    
    // Recopilar datos del formulario
    const reportData = {
        id: 'STOLEN-' + Date.now(),
        reportDate: new Date().toISOString(),
        part: {
            name: document.getElementById('partName').value,
            category: document.getElementById('partCategory').value,
            brand: document.getElementById('partBrand').value,
            model: document.getElementById('partModel').value || 'N/A',
            year: document.getElementById('partYear').value || 'N/A',
            serialNumber: document.getElementById('serialNumber').value || 'N/A',
            description: document.getElementById('partDescription').value
        },
        owner: {
            name: document.getElementById('ownerName').value,
            phone: document.getElementById('ownerPhone').value,
            email: document.getElementById('ownerEmail').value
        },
        theft: {
            date: document.getElementById('theftDate').value,
            location: document.getElementById('theftLocation').value,
            policeReport: document.getElementById('policeReport').value || 'No especificado',
            additionalInfo: document.getElementById('additionalInfo').value || 'N/A'
        },
        status: 'active',
        verified: false
    };
    
    // Guardar en localStorage
    stolenParts.push(reportData);
    localStorage.setItem('stolenParts', JSON.stringify(stolenParts));
    
    // Generar y mostrar QR
    generateQRCode(reportData);
    
    // Limpiar formulario
    e.target.reset();
    
    // Mostrar notificación
    showNotification('¡Parte registrada exitosamente! Se ha generado el código QR.', 'success');
}

function generateQRCode(reportData) {
    const modal = document.getElementById('qrModal');
    const qrContainer = document.getElementById('qrCodeContainer');
    const reportInfo = document.getElementById('reportInfo');
    
    // Limpiar contenedor
    qrContainer.innerHTML = '';
    
    // Crear datos para el QR - Solo el ID para simplificar
    const qrData = reportData.id;
    
    // Generar QR con configuración mejorada
    const qrCode = new QRCode(qrContainer, {
        text: qrData,
        width: 300,
        height: 300,
        colorDark: "#1a1a2e",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Guardar referencia del QR para descarga
    window.currentQRCode = qrContainer;
    
    // Mostrar información del reporte
    const categoryName = getCategoryName(reportData.part.category);
    reportInfo.innerHTML = `
        <h3 style="color: var(--primary-color); margin-bottom: 1rem;">
            <i class="fas fa-info-circle"></i> Información del Reporte
        </h3>
        <div style="display: grid; gap: 0.5rem; font-size: 0.95rem;">
            <div><strong>Código:</strong> <span style="color: var(--primary-color); font-family: monospace;">${reportData.id}</span></div>
            <div><strong>Parte:</strong> ${reportData.part.name}</div>
            <div><strong>Marca:</strong> ${reportData.part.brand}</div>
            <div><strong>Categoría:</strong> ${categoryName}</div>
            <div><strong>Fecha del robo:</strong> ${formatDate(reportData.theft.date)}</div>
            <div><strong>Ubicación:</strong> ${reportData.theft.location}</div>
            <div><strong>Fecha de registro:</strong> ${formatDate(reportData.reportDate)}</div>
        </div>
    `;
    
    // Mostrar modal
    modal.style.display = 'flex';
}

function closeQRModal() {
    const modal = document.getElementById('qrModal');
    modal.style.display = 'none';
}

function downloadQR() {
    const qrCanvas = document.querySelector('#qrCodeContainer canvas');
    if (qrCanvas) {
        try {
            // Crear un canvas temporal con fondo blanco
            const tempCanvas = document.createElement('canvas');
            const ctx = tempCanvas.getContext('2d');
            tempCanvas.width = qrCanvas.width;
            tempCanvas.height = qrCanvas.height;
            
            // Fondo blanco
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            
            // Dibujar el QR encima
            ctx.drawImage(qrCanvas, 0, 0);
            
            // Descargar
            const link = document.createElement('a');
            const timestamp = new Date().getTime();
            link.download = `qr-parte-robada-${timestamp}.png`;
            link.href = tempCanvas.toDataURL('image/png');
            link.click();
            
            showNotification('✓ QR descargado exitosamente', 'success');
        } catch (error) {
            console.error('Error al descargar QR:', error);
            showNotification('Error al descargar el QR', 'warning');
        }
    } else {
        showNotification('No se encontró el código QR', 'warning');
    }
}

// ===== Página de Verificación =====
function initVerifyPage() {
    loadRecentReports();
    
    // Verificar si hay un código en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        verifyCode(code);
    }
}

function showScanSection() {
    hideAllSections();
    document.getElementById('scanSection').style.display = 'block';
}

function showUploadSection() {
    hideAllSections();
    document.getElementById('uploadSection').style.display = 'block';
}

function showManualSection() {
    hideAllSections();
    document.getElementById('manualSection').style.display = 'block';
}

function hideAllSections() {
    document.getElementById('scanSection').style.display = 'none';
    document.getElementById('uploadSection').style.display = 'none';
    document.getElementById('manualSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
}

// ===== Escanear con Cámara =====
let html5QrCode = null;

function startCamera() {
    const video = document.getElementById('qrVideo');
    const placeholder = document.getElementById('cameraPlaceholder');
    
    placeholder.style.display = 'none';
    video.style.display = 'block';
    
    html5QrCode = new Html5Qrcode("qrVideo");
    
    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        (decodedText, decodedResult) => {
            // QR detectado
            stopCamera();
            processQRData(decodedText);
        },
        (errorMessage) => {
            // Error de escaneo (normal mientras busca QR)
        }
    ).catch((err) => {
        showNotification('Error al acceder a la cámara: ' + err, 'warning');
        placeholder.style.display = 'block';
        video.style.display = 'none';
    });
}

function stopCamera() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            document.getElementById('qrVideo').style.display = 'none';
            document.getElementById('cameraPlaceholder').style.display = 'block';
        });
    }
}

// ===== Subir Imagen QR =====
let uploadedFile = null;

function handleQRUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    uploadedFile = file; // Guardar archivo para procesar
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.getElementById('uploadedImage');
        img.src = e.target.result;
        document.getElementById('uploadPlaceholder').style.display = 'none';
        document.getElementById('uploadPreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function processUploadedQR() {
    if (!uploadedFile) {
        showNotification('Por favor selecciona una imagen primero', 'warning');
        return;
    }
    
    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("qrCanvas");
    }
    
    html5QrCode.scanFile(uploadedFile, true)
        .then(decodedText => {
            processQRData(decodedText);
            showNotification('✓ QR procesado correctamente', 'success');
        })
        .catch(err => {
            console.error('Error escaneando QR:', err);
            showNotification('No se pudo leer el código QR. Verifica que la imagen sea clara y contenga un QR válido.', 'warning');
        });
}

// ===== Verificación Manual =====
function verifyManualCode(e) {
    e.preventDefault();
    const code = document.getElementById('manualCode').value.trim();
    verifyCode(code);
}

// ===== Procesar Datos del QR =====
function processQRData(qrText) {
    try {
        const data = JSON.parse(qrText);
        if (data.id) {
            verifyCode(data.id);
        } else {
            showNotification('Código QR no válido', 'warning');
        }
    } catch (e) {
        // Si no es JSON, intentar como código directo
        verifyCode(qrText);
    }
}

// ===== Verificar Código =====
function verifyCode(code) {
    hideAllSections();
    
    const stolenPart = stolenParts.find(part => part.id === code);
    const resultContent = document.getElementById('resultContent');
    
    if (stolenPart) {
        // Parte encontrada - ESTÁ ROBADA
        const categoryName = getCategoryName(stolenPart.part.category);
        resultContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 6rem; color: #ff4444;"></i>
                <h2 style="color: #ff4444; margin-top: 1rem;">⚠️ ALERTA: PARTE ROBADA</h2>
                <p style="color: var(--text-secondary); font-size: 1.1rem; margin-top: 1rem;">
                    Esta parte ha sido reportada como robada. NO la compres.
                </p>
            </div>
            
            <div style="background: rgba(255, 68, 68, 0.2); border-left: 4px solid #ff4444; padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
                <h3 style="color: #ff4444; margin-bottom: 1rem;">
                    <i class="fas fa-info-circle"></i> Información de la Parte
                </h3>
                <div style="display: grid; gap: 0.8rem;">
                    <div><strong>Código de Reporte:</strong> <span style="font-family: monospace; color: var(--primary-color);">${stolenPart.id}</span></div>
                    <div><strong>Parte:</strong> ${stolenPart.part.name}</div>
                    <div><strong>Marca:</strong> ${stolenPart.part.brand}</div>
                    <div><strong>Modelo:</strong> ${stolenPart.part.model}</div>
                    <div><strong>Año:</strong> ${stolenPart.part.year}</div>
                    <div><strong>Categoría:</strong> ${categoryName}</div>
                    ${stolenPart.part.serialNumber !== 'N/A' ? `<div><strong>Número de Serie:</strong> ${stolenPart.part.serialNumber}</div>` : ''}
                    <div><strong>Descripción:</strong> ${stolenPart.part.description}</div>
                </div>
            </div>
            
            <div style="background: var(--bg-dark); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
                <h3 style="color: var(--primary-color); margin-bottom: 1rem;">
                    <i class="fas fa-map-marker-alt"></i> Información del Robo
                </h3>
                <div style="display: grid; gap: 0.8rem;">
                    <div><strong>Fecha del robo:</strong> ${formatDate(stolenPart.theft.date)}</div>
                    <div><strong>Ubicación:</strong> ${stolenPart.theft.location}</div>
                    ${stolenPart.theft.policeReport !== 'No especificado' ? `<div><strong>Denuncia policial:</strong> ${stolenPart.theft.policeReport}</div>` : ''}
                    <div><strong>Fecha de registro:</strong> ${formatDate(stolenPart.reportDate)}</div>
                </div>
            </div>
            
            <div style="background: rgba(255, 170, 0, 0.2); border-left: 4px solid #ffaa00; padding: 1.5rem; border-radius: 10px;">
                <h3 style="color: #ffaa00; margin-bottom: 1rem;">
                    <i class="fas fa-lightbulb"></i> ¿Qué hacer?
                </h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: #00ff88; margin-right: 10px;"></i> NO compres esta parte</li>
                    <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: #00ff88; margin-right: 10px;"></i> Contacta a las autoridades si tienes información</li>
                    <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: #00ff88; margin-right: 10px;"></i> Comparte esta información</li>
                    <li><i class="fas fa-check" style="color: #00ff88; margin-right: 10px;"></i> Reporta al vendedor si intentó vendértela</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <a href="contacto.html" class="btn-primary">
                    <i class="fas fa-envelope"></i> Reportar Información
                </a>
            </div>
        `;
    } else {
        // Parte NO encontrada - ESTÁ LIMPIA
        resultContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <i class="fas fa-check-circle" style="font-size: 6rem; color: #00ff88;"></i>
                <h2 style="color: #00ff88; margin-top: 1rem;">✓ Parte Verificada</h2>
                <p style="color: var(--text-secondary); font-size: 1.1rem; margin-top: 1rem;">
                    Esta parte NO está reportada como robada en nuestra base de datos.
                </p>
            </div>
            
            <div style="background: rgba(0, 255, 136, 0.2); border-left: 4px solid #00ff88; padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
                <h3 style="color: #00ff88; margin-bottom: 1rem;">
                    <i class="fas fa-info-circle"></i> Código Verificado
                </h3>
                <p style="margin-bottom: 1rem;">Código consultado: <span style="font-family: monospace; color: var(--primary-color);">${code}</span></p>
                <p style="color: var(--text-secondary);">
                    Este código no coincide con ninguna parte reportada como robada en nuestro sistema.
                </p>
            </div>
            
            <div style="background: rgba(255, 170, 0, 0.2); border-left: 4px solid #ffaa00; padding: 1.5rem; border-radius: 10px;">
                <h3 style="color: #ffaa00; margin-bottom: 1rem;">
                    <i class="fas fa-exclamation-triangle"></i> Recomendaciones
                </h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: #00ff88; margin-right: 10px;"></i> Verifica siempre la procedencia de las partes</li>
                    <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: #00ff88; margin-right: 10px;"></i> Solicita documentación al vendedor</li>
                    <li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: #00ff88; margin-right: 10px;"></i> Compra en lugares confiables</li>
                    <li><i class="fas fa-check" style="color: #00ff88; margin-right: 10px;"></i> Si tienes dudas, consulta con expertos</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
                    Nota: Este resultado se basa en nuestra base de datos actual. No garantizamos la procedencia legal de la parte.
                </p>
                <a href="productos.html" class="btn-primary">
                    <i class="fas fa-shopping-cart"></i> Ver Productos Certificados
                </a>
            </div>
        `;
    }
    
    document.getElementById('resultsSection').style.display = 'block';
}

function resetVerification() {
    hideAllSections();
    document.getElementById('manualCode').value = '';
    document.getElementById('uploadPlaceholder').style.display = 'block';
    document.getElementById('uploadPreview').style.display = 'none';
    document.getElementById('qrFileInput').value = '';
}

// ===== Reportes Recientes =====
function loadRecentReports() {
    const recentReportsContainer = document.getElementById('recentReports');
    if (!recentReportsContainer) return;
    
    if (stolenParts.length === 0) {
        recentReportsContainer.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-shield-alt"></i>
                <h3>No hay reportes registrados</h3>
                <p>Cuando se reporten partes robadas, aparecerán aquí</p>
                <a href="reporte-robo.html" class="btn-primary">
                    <i class="fas fa-exclamation-triangle"></i> Reportar Parte Robada
                </a>
            </div>
        `;
        return;
    }
    
    recentReportsContainer.innerHTML = '';
    
    // Mostrar los últimos 6 reportes
    const recentParts = stolenParts.slice(-6).reverse();
    
    recentParts.forEach(stolenPart => {
        const categoryName = getCategoryName(stolenPart.part.category);
        
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        card.style.border = '2px solid #ff4444';
        card.innerHTML = `
            <div style="position: relative; background: var(--accent-color); padding: 3rem 1rem; text-align: center;">
                <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #ff4444;"></i>
                <div style="position: absolute; top: 10px; right: 10px; background: #ff4444; color: white; padding: 0.3rem 0.6rem; border-radius: 5px; font-size: 0.8rem; font-weight: bold;">
                    ROBADA
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${stolenPart.part.name}</h3>
                <p class="product-description">${stolenPart.part.brand} - ${stolenPart.part.model}</p>
                <div class="product-meta">
                    <span class="product-badge" style="background: rgba(255, 68, 68, 0.3); color: #ff4444;">${categoryName}</span>
                    <span class="product-badge">${stolenPart.part.year}</span>
                </div>
                <div style="margin: 1rem 0; padding: 0.5rem; background: rgba(255, 68, 68, 0.2); border-radius: 5px; font-size: 0.85rem;">
                    <strong>Robada:</strong> ${formatDate(stolenPart.theft.date)}<br>
                    <strong>Lugar:</strong> ${stolenPart.theft.location}
                </div>
                <button class="btn-add-cart" style="background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);" onclick="verifyCode('${stolenPart.id}'); window.location.href='verificar-qr.html?code=${stolenPart.id}'">
                    <i class="fas fa-search"></i> Ver Detalles
                </button>
            </div>
        `;
        recentReportsContainer.appendChild(card);
    });
}

// ===== Funciones Auxiliares =====
function getCategoryName(categoryId) {
    const categories = {
        '1': 'Motores',
        '2': 'Suspensión',
        '3': 'Frenos',
        '4': 'Escape',
        '5': 'Carrocería',
        '6': 'Eléctrico',
        '7': 'Transmisión',
        '8': 'Accesorios'
    };
    return categories[categoryId] || 'Otra categoría';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// ===== Verificar productos antes de vender =====
function checkIfStolen(productName, productBrand) {
    return stolenParts.some(stolen => 
        stolen.part.name.toLowerCase().includes(productName.toLowerCase()) &&
        stolen.part.brand.toLowerCase().includes(productBrand.toLowerCase())
    );
}

// Exportar funciones para uso en otros archivos
window.stolenPartsSystem = {
    checkIfStolen,
    verifyCode,
    getStolenParts: () => stolenParts
};
