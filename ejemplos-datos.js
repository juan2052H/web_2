// Datos de ejemplo para probar el sistema anti-robo
// Copia este código en la consola del navegador para agregar reportes de prueba

const ejemplosReportes = [
    {
        id: 'STOLEN-1699000000001',
        reportDate: '2025-10-15T10:30:00.000Z',
        part: {
            name: 'Motor Yamaha YZF-R1',
            category: '1',
            brand: 'Yamaha',
            model: 'YZF-R1',
            year: '2015-2017',
            serialNumber: 'YAM-R1-2016-12345',
            description: 'Motor de 4 cilindros en línea, 998cc, en excelente estado. Tiene una pequeña marca en la carcasa del lado izquierdo cerca del filtro de aceite.'
        },
        owner: {
            name: 'Carlos Martínez',
            phone: '+34 612 345 678',
            email: 'carlos.martinez@email.com'
        },
        theft: {
            date: '2025-10-14',
            location: 'Madrid, Zona Centro',
            policeReport: 'DEN-2025-MAD-001234',
            additionalInfo: 'Robado de garaje comunitario durante la noche. Había cámaras de seguridad.'
        },
        status: 'active',
        verified: true
    },
    {
        id: 'STOLEN-1699000000002',
        reportDate: '2025-10-20T15:45:00.000Z',
        part: {
            name: 'Sistema de Frenos Brembo M50',
            category: '3',
            brand: 'Brembo',
            model: 'M50',
            year: 'Universal',
            serialNumber: 'BREMBO-M50-7890',
            description: 'Sistema completo de frenos delanteros Brembo M50 con pinzas monoblock, discos de 320mm y latiguillos de acero. Color negro mate.'
        },
        owner: {
            name: 'Ana López',
            phone: '+34 655 789 012',
            email: 'ana.lopez@email.com'
        },
        theft: {
            date: '2025-10-19',
            location: 'Barcelona, Sant Martí',
            policeReport: 'DEN-2025-BCN-005678',
            additionalInfo: 'Robado del garaje de casa. Entrada forzada. Total estimado: 1500€'
        },
        status: 'active',
        verified: true
    },
    {
        id: 'STOLEN-1699000000003',
        reportDate: '2025-11-01T09:15:00.000Z',
        part: {
            name: 'Escape Akrapovic Evolution Kawasaki Ninja ZX-6R',
            category: '4',
            brand: 'Akrapovic',
            model: 'Evolution',
            year: '2013-2018',
            serialNumber: 'AKR-EVO-ZX6-4567',
            description: 'Escape completo Akrapovic Evolution en titanio y fibra de carbono. Sistema completo con colector, silenciador y DB killer. Peso aproximado 4.5kg.'
        },
        owner: {
            name: 'Miguel Ruiz',
            phone: '+34 678 234 567',
            email: 'miguel.ruiz@email.com'
        },
        theft: {
            date: '2025-10-30',
            location: 'Valencia, Benimaclet',
            policeReport: 'DEN-2025-VLC-003456',
            additionalInfo: 'Robado de moto estacionada en calle. La moto quedó con el escape de serie. Testigos vieron furgoneta sospechosa.'
        },
        status: 'active',
        verified: true
    },
    {
        id: 'STOLEN-1699000000004',
        reportDate: '2025-11-05T14:20:00.000Z',
        part: {
            name: 'Horquilla Showa SFF-BP Suzuki GSX-R 1000',
            category: '2',
            brand: 'Showa',
            model: 'SFF-BP',
            year: '2017-2020',
            serialNumber: 'N/A',
            description: 'Horquilla invertida Showa SFF-BP (Separate Function Fork - Big Piston). Color dorado, 43mm de diámetro. Incluye triples originales.'
        },
        owner: {
            name: 'Laura Fernández',
            phone: '+34 689 345 678',
            email: 'laura.fernandez@email.com'
        },
        theft: {
            date: '2025-11-03',
            location: 'Sevilla, Nervión',
            policeReport: 'DEN-2025-SEV-007890',
            additionalInfo: 'Robada de taller mecánico. La moto estaba en reparación. Entrada forzada al local.'
        },
        status: 'active',
        verified: true
    },
    {
        id: 'STOLEN-1699000000005',
        reportDate: '2025-11-08T11:00:00.000Z',
        part: {
            name: 'Carenados Completos Honda CBR 1000RR Fireblade',
            category: '5',
            brand: 'Honda',
            model: 'CBR 1000RR',
            year: '2017-2019',
            serialNumber: 'N/A',
            description: 'Kit completo de carenados originales Honda Racing: frontal, laterales, colín, tapa de depósito. Colores Repsol (naranja, rojo, blanco). Estado impecable.'
        },
        owner: {
            name: 'David García',
            phone: '+34 612 987 654',
            email: 'david.garcia@email.com'
        },
        theft: {
            date: '2025-11-06',
            location: 'Málaga, Centro',
            policeReport: 'No especificado',
            additionalInfo: 'Robados durante evento motero. Moto estacionada en parking público. Sin testigos.'
        },
        status: 'active',
        verified: false
    }
];

// Función para cargar los ejemplos
function cargarEjemplosReportes() {
    // Obtener reportes existentes
    let stolenParts = JSON.parse(localStorage.getItem('stolenParts')) || [];
    
    // Agregar ejemplos si no existen
    ejemplosReportes.forEach(ejemplo => {
        if (!stolenParts.find(p => p.id === ejemplo.id)) {
            stolenParts.push(ejemplo);
        }
    });
    
    // Guardar en localStorage
    localStorage.setItem('stolenParts', JSON.stringify(stolenParts));
    
    console.log('✅ Ejemplos de reportes cargados exitosamente');
    console.log(`📊 Total de reportes: ${stolenParts.length}`);
    console.log('🔄 Recarga la página para ver los cambios');
    
    return stolenParts;
}

// Función para limpiar todos los reportes
function limpiarReportes() {
    if (confirm('¿Estás seguro de eliminar todos los reportes?')) {
        localStorage.removeItem('stolenParts');
        console.log('🗑️ Todos los reportes han sido eliminados');
        console.log('🔄 Recarga la página para ver los cambios');
    }
}

// Función para ver todos los reportes
function verReportes() {
    const stolenParts = JSON.parse(localStorage.getItem('stolenParts')) || [];
    console.log(`📊 Reportes en la base de datos: ${stolenParts.length}`);
    console.table(stolenParts.map(p => ({
        ID: p.id,
        Parte: p.part.name,
        Marca: p.part.brand,
        Fecha: p.theft.date,
        Ubicación: p.theft.location
    })));
    return stolenParts;
}

// Códigos QR de ejemplo para pruebas
const codigosEjemplo = {
    motor_yamaha: 'STOLEN-1699000000001',
    frenos_brembo: 'STOLEN-1699000000002',
    escape_akrapovic: 'STOLEN-1699000000003',
    horquilla_showa: 'STOLEN-1699000000004',
    carenados_honda: 'STOLEN-1699000000005'
};

console.log(`
═══════════════════════════════════════════════════════
  🛡️  SISTEMA ANTI-ROBO - DATOS DE PRUEBA
═══════════════════════════════════════════════════════

Para cargar datos de ejemplo, ejecuta en la consola:

  📦 cargarEjemplosReportes()      - Cargar 5 reportes de ejemplo
  👀 verReportes()                 - Ver todos los reportes
  🗑️  limpiarReportes()            - Eliminar todos los reportes

Códigos de ejemplo para verificación:
  • Motor Yamaha:      ${codigosEjemplo.motor_yamaha}
  • Frenos Brembo:     ${codigosEjemplo.frenos_brembo}
  • Escape Akrapovic:  ${codigosEjemplo.escape_akrapovic}
  • Horquilla Showa:   ${codigosEjemplo.horquilla_showa}
  • Carenados Honda:   ${codigosEjemplo.carenados_honda}

═══════════════════════════════════════════════════════
`);
