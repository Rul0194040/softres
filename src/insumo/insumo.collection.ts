import { CreateInsumoDTO } from './DTO/create-insumo.dto';
import { MedidasTypes } from './enums/medidasTypes.enum';
import { UnidadesTypes } from './enums/unidadesTypes.enum';

export const insumosToCreate: CreateInsumoDTO[] = [
  {
    nombre: 'Aceite de soya comestible',
    unidad: UnidadesTypes.BIDON,
    medida: MedidasTypes.MILILITROS,
    marca: "Member's mark",
    precioUnitario: 200.0,
    pesoNeto: 5000,
    mermaPorcentaje: 5,
    categoriaId: 2,
    proveedorId: 1,
  },
  {
    nombre: 'Aceite de oliva',
    unidad: UnidadesTypes.GARRAFA,
    medida: MedidasTypes.MILILITROS,
    marca: '',
    precioUnitario: 722.8957,
    pesoNeto: 1000,
    mermaPorcentaje: 5,
    categoriaId: 2,
    proveedorId: 1,
  },
  {
    nombre: 'Miel de agave',
    unidad: UnidadesTypes.GARRAFA,
    medida: MedidasTypes.MILILITROS,
    marca: '',
    precioUnitario: 219.2,
    pesoNeto: 4800,
    mermaPorcentaje: 5,
    categoriaId: 21,
    proveedorId: 1,
  },
  {
    nombre: 'Bactericida',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.MILILITROS,
    marca: "Member's Mark",
    precioUnitario: 101.27,
    pesoNeto: 3000,
    mermaPorcentaje: 5,
    categoriaId: 7,
    proveedorId: 1,
  },
  {
    nombre: 'Vinagre balsámico',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.MILILITROS,
    marca: 'Pianello',
    precioUnitario: 120.67,
    pesoNeto: 5000,
    mermaPorcentaje: 5,
    categoriaId: 29,
    proveedorId: 1,
  },
  {
    nombre: 'Vino tipo jerez',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.MILILITROS,
    marca: 'Tres Coronas',
    precioUnitario: 78.44,
    pesoNeto: 2000,
    mermaPorcentaje: 5,
    categoriaId: 29,
    proveedorId: 2,
  },
  {
    nombre: 'Vinagre de manzana',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.MILILITROS,
    marca: 'Mother Earth',
    precioUnitario: 62.21,
    pesoNeto: 7000,
    mermaPorcentaje: 5,
    categoriaId: 29,
    proveedorId: 2,
  },
  {
    nombre: 'Salsa inglesa',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.MILILITROS,
    marca: "French's",
    precioUnitario: 135.77,
    pesoNeto: 1200,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 2,
  },
  {
    nombre: 'Salsa de soya',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.MILILITROS,
    marca: 'Kikkoman',
    precioUnitario: 255.97,
    pesoNeto: 4000,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 2,
  },
  {
    nombre: 'Extracto de vainilla ',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.MILILITROS,
    marca: 'Gallardo',
    precioUnitario: 200.575,
    pesoNeto: 2000,
    mermaPorcentaje: 5,
    categoriaId: 9,
    proveedorId: 2,
  },
  {
    nombre: 'Jugo de tomate',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.MILILITROS,
    marca: 'Clamato ',
    precioUnitario: 12.28,
    pesoNeto: 5000,
    mermaPorcentaje: 5,
    categoriaId: 24,
    proveedorId: 3,
  },
  {
    nombre: 'Vinagre de manzana',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.MILILITROS,
    marca: 'Heinz',
    precioUnitario: 112.0,
    pesoNeto: 9000,
    mermaPorcentaje: 5,
    categoriaId: 29,
    proveedorId: 3,
  },
  {
    nombre: 'Crema de coco',
    unidad: UnidadesTypes.CAJA,
    medida: MedidasTypes.MILILITROS,
    marca: 'Calahua',
    precioUnitario: 77.5,
    pesoNeto: 5000,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 3,
  },
  {
    nombre: 'Leche entera',
    unidad: UnidadesTypes.CAJA,
    medida: MedidasTypes.MILILITROS,
    marca: 'Leche y pan',
    precioUnitario: 15.5983,
    pesoNeto: 3000,
    mermaPorcentaje: 5,
    categoriaId: 18,
    subCategoriaId: 37,
    proveedorId: 3,
  },
  {
    nombre: 'Leche deslactosada',
    unidad: UnidadesTypes.CAJA,
    medida: MedidasTypes.MILILITROS,
    marca: 'Lala',
    precioUnitario: 100,
    pesoNeto: 7000,
    mermaPorcentaje: 5,
    categoriaId: 18,
    subCategoriaId: 37,
    proveedorId: 3,
  },
  {
    nombre: 'Saborizante de vainilla',
    unidad: UnidadesTypes.FRASCO,
    medida: MedidasTypes.MILILITROS,
    marca: 'Zanilli',
    precioUnitario: 50,
    pesoNeto: 5000,
    mermaPorcentaje: 5,
    categoriaId: 9,
    proveedorId: 3,
  },
  {
    nombre: 'Pepinillos agridulces en conserva',
    unidad: UnidadesTypes.FRASCO,
    medida: MedidasTypes.GRAMOS,
    marca: 'Gherkias',
    precioUnitario: 78.77,
    pesoNeto: 3000,
    mermaPorcentaje: 5,
    categoriaId: 5,
    proveedorId: 3,
  },
  {
    nombre: 'Pimienta negra',
    unidad: UnidadesTypes.FRASCO,
    medida: MedidasTypes.GRAMOS,
    marca: "Member's mark",
    precioUnitario: 100,
    pesoNeto: 2000,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 3,
  },
  {
    nombre: 'Canela en polvo',
    unidad: UnidadesTypes.FRASCO,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 100,
    pesoNeto: 1000,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 4,
  },
  {
    nombre: 'Garbanzo ',
    unidad: UnidadesTypes.FRASCO,
    medida: MedidasTypes.GRAMOS,
    marca: 'Cidacos',
    precioUnitario: 19.7766,
    pesoNeto: 3000,
    mermaPorcentaje: 5,
    categoriaId: 17,
    proveedorId: 4,
  },
  {
    nombre: 'Garbanzo',
    unidad: UnidadesTypes.FRASCO,
    medida: MedidasTypes.GRAMOS,
    marca: "Cidaco's",
    precioUnitario: 19.7766,
    pesoNeto: 2000,
    mermaPorcentaje: 5,
    categoriaId: 15,
    proveedorId: 4,
  },
  {
    nombre: 'Pan rallado',
    unidad: UnidadesTypes.CAJA,
    medida: MedidasTypes.GRAMOS,
    marca: 'Panko',
    precioUnitario: 164,
    pesoNeto: 2600,
    mermaPorcentaje: 5,
    categoriaId: 23,
    proveedorId: 4,
  },
  {
    nombre: 'Miel de abeja',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.GRAMOS,
    marca: "Member's Mark",
    precioUnitario: 197.44,
    pesoNeto: 3000,
    mermaPorcentaje: 5,
    categoriaId: 21,
    proveedorId: 4,
  },
  {
    nombre: 'Miel de maple',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.GRAMOS,
    marca: "Member's Mark",
    precioUnitario: 180.4,
    pesoNeto: 6000,
    mermaPorcentaje: 5,
    categoriaId: 21,
    proveedorId: 4,
  },
  {
    nombre: 'Eneldo',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 836,
    pesoNeto: 7000,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 4,
  },
  {
    nombre: 'Orégano',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 101.25,
    pesoNeto: 2000,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 4,
  },
  {
    nombre: 'Canela en rollo de 21"',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 420,
    pesoNeto: 7225,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 5,
  },
  {
    nombre: 'Clavo entero',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 330.75,
    pesoNeto: 1000,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 5,
  },
  {
    nombre: 'Azahár',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 30,
    pesoNeto: 2000,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 5,
  },
  {
    nombre: 'Laurel',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 534,
    pesoNeto: 7000,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 5,
  },
  {
    nombre: 'Panela',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 120,
    pesoNeto: 4000,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 5,
  },
  {
    nombre: 'Flor de jamaica',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 154.7544,
    pesoNeto: 5000,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 5,
  },
  {
    nombre: 'Nuez sin cáscara',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: "Member's Mark",
    precioUnitario: 75,
    pesoNeto: 6000,
    mermaPorcentaje: 5,
    categoriaId: 13,
    proveedorId: 5,
  },
  {
    nombre: 'Almendras',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: "Member's Mark",
    precioUnitario: 259.9292,
    pesoNeto: 4000,
    mermaPorcentaje: 5,
    categoriaId: 13,
    proveedorId: 5,
  },
  {
    nombre: 'Dátiles deshuesados ',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: 'Del desierto',
    precioUnitario: 500,
    pesoNeto: 9000,
    mermaPorcentaje: 5,
    categoriaId: 13,
    proveedorId: 5,
  },
  {
    nombre: 'Cacahuate crudo',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 100,
    pesoNeto: 4500,
    mermaPorcentaje: 5,
    categoriaId: 17,
    proveedorId: 6,
  },
  {
    nombre: 'Lentejas',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: 'Schettino',
    precioUnitario: 37.4475,
    pesoNeto: 5000,
    mermaPorcentaje: 5,
    categoriaId: 17,
    proveedorId: 6,
  },
  {
    nombre: 'Pasta tipo spaghetti',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: 'La moderna',
    precioUnitario: 33.83,
    pesoNeto: 6100,
    mermaPorcentaje: 5,
    categoriaId: 22,
    proveedorId: 6,
  },
  {
    nombre: 'Pasta de fideo grueso',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: 'Italpasta',
    precioUnitario: 100,
    pesoNeto: 2000,
    mermaPorcentaje: 5,
    categoriaId: 22,
    proveedorId: 6,
  },
  {
    nombre: 'Carbón activado',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: 'El hierberito',
    precioUnitario: 100,
    pesoNeto: 2000,
    mermaPorcentaje: 5,
    categoriaId: 26,
    proveedorId: 6,
  },
  {
    nombre: 'Manteca vegetal',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: 'Inca',
    precioUnitario: 61.6371,
    pesoNeto: 2500,
    mermaPorcentaje: 5,
    categoriaId: 20,
    proveedorId: 6,
  },
  {
    nombre: 'Harina de maíz azul',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: 'Maseca',
    precioUnitario: 16,
    pesoNeto: 3000,
    mermaPorcentaje: 5,
    categoriaId: 15,
    proveedorId: 7,
  },
  {
    nombre: 'Azúcar mascabado',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: 'Metco',
    precioUnitario: 34.5067,
    pesoNeto: 3000,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 7,
  },
  {
    nombre: 'Cocoa en polvo ',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 100,
    pesoNeto: 4500,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 7,
  },
  {
    nombre: 'Arroz',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: 'Bueno',
    precioUnitario: 37.2643,
    pesoNeto: 6000,
    mermaPorcentaje: 5,
    categoriaId: 3,
    proveedorId: 7,
  },
  {
    nombre: 'Chile onza',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 400,
    pesoNeto: 8000,
    mermaPorcentaje: 5,
    categoriaId: 4,
    proveedorId: 7,
  },
  {
    nombre: 'Chile pasilla oaxaqueño',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 63.4586,
    pesoNeto: 9000,
    mermaPorcentaje: 5,
    categoriaId: 4,
    proveedorId: 7,
  },
  {
    nombre: 'Chile ancho',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 997.1789,
    pesoNeto: 5200,
    mermaPorcentaje: 5,
    categoriaId: 4,
    proveedorId: 7,
  },
  {
    nombre: 'Chile árbol',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 70.8297,
    pesoNeto: 7800,
    mermaPorcentaje: 5,
    categoriaId: 4,
    proveedorId: 7,
  },
  {
    nombre: 'Chile huajillo',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 69.8559,
    pesoNeto: 4500,
    mermaPorcentaje: 5,
    categoriaId: 4,
    proveedorId: 8,
  },
  {
    nombre: 'Chile chilhuacle',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 700,
    pesoNeto: 9000,
    mermaPorcentaje: 5,
    categoriaId: 4,
    proveedorId: 8,
  },
  {
    nombre: 'Chile piquín',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 240,
    pesoNeto: 1500,
    mermaPorcentaje: 5,
    categoriaId: 4,
    proveedorId: 8,
  },
  {
    nombre: 'Harina de trigo',
    unidad: UnidadesTypes.COSTAL,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 100,
    pesoNeto: 5000,
    mermaPorcentaje: 5,
    categoriaId: 15,
    proveedorId: 8,
  },
  {
    nombre: 'Harina de trigo vitaminada',
    unidad: UnidadesTypes.COSTAL,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 100,
    pesoNeto: 7800,
    mermaPorcentaje: 5,
    categoriaId: 15,
    proveedorId: 8,
  },
  {
    nombre: 'Harina',
    unidad: UnidadesTypes.CUBETA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 100,
    pesoNeto: 8400,
    mermaPorcentaje: 5,
    categoriaId: 15,
    proveedorId: 8,
  },
  {
    nombre: 'Sal',
    unidad: UnidadesTypes.CUBETA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 5.8,
    pesoNeto: 7800,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 8,
  },
  {
    nombre: 'Azúcar',
    unidad: UnidadesTypes.CUBETA,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 23.95,
    pesoNeto: 6060,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 8,
  },
  {
    nombre: 'Orégano molido',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 100,
    pesoNeto: 8720,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 8,
  },
  {
    nombre: 'Pimentón/paprika',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 100,
    pesoNeto: 3510,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 9,
  },
  {
    nombre: 'Nuez mosacada',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 739.23,
    pesoNeto: 6500,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 9,
  },
  {
    nombre: 'Gengibre molido',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 100,
    pesoNeto: 3250,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 9,
  },
  {
    nombre: 'Clavo molido',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 375.3,
    pesoNeto: 1250,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 9,
  },
  {
    nombre: 'Levadura seca ',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.GRAMOS,
    marca: 'Magidely',
    precioUnitario: 100,
    pesoNeto: 400,
    mermaPorcentaje: 5,
    categoriaId: 26,
    proveedorId: 9,
  },
  {
    nombre: 'Pan molido',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.GRAMOS,
    marca: '',
    precioUnitario: 100,
    pesoNeto: 400,
    mermaPorcentaje: 5,
    categoriaId: 23,
    proveedorId: 9,
  },
  {
    nombre: 'Galletas saladas',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.GRAMOS,
    marca: 'Ritz',
    precioUnitario: 100,
    pesoNeto: 200,
    mermaPorcentaje: 5,
    categoriaId: 14,
    proveedorId: 9,
  },
  {
    nombre: 'Chipotles adobados',
    unidad: UnidadesTypes.LATA,
    medida: MedidasTypes.GRAMOS,
    marca: 'La morena ',
    precioUnitario: 40,
    pesoNeto: 300,
    mermaPorcentaje: 5,
    categoriaId: 8,
    proveedorId: 9,
  },
  {
    nombre: 'Atún',
    unidad: UnidadesTypes.LATA,
    medida: MedidasTypes.GRAMOS,
    marca: 'Tuny',
    precioUnitario: 108.8571,
    pesoNeto: 980,
    mermaPorcentaje: 5,
    categoriaId: 10,
    proveedorId: 9,
  },
  {
    nombre: 'Leche condensada',
    unidad: UnidadesTypes.LATA,
    medida: MedidasTypes.GRAMOS,
    marca: 'Nestlé',
    precioUnitario: 29.7878,
    pesoNeto: 600,
    mermaPorcentaje: 5,
    categoriaId: 18,
    subCategoriaId: 37,
    proveedorId: 9,
  },
  {
    nombre: 'Polvo para hornear',
    unidad: UnidadesTypes.LATA,
    medida: MedidasTypes.GRAMOS,
    marca: 'Royal',
    precioUnitario: 20.6667,
    pesoNeto: 4500,
    mermaPorcentaje: 5,
    categoriaId: 26,
    proveedorId: 10,
  },
  {
    nombre: 'Crema de avellanas',
    unidad: UnidadesTypes.FRASCO,
    medida: MedidasTypes.GRAMOS,
    marca: 'Nutella',
    precioUnitario: 104.9,
    pesoNeto: 4800,
    mermaPorcentaje: 5,
    categoriaId: 26,
    proveedorId: 10,
  },
  {
    nombre: 'Palillos',
    unidad: UnidadesTypes.CAJA,
    medida: MedidasTypes.GRAMOS,
    marca: 'Pingüino',
    precioUnitario: 27.6143,
    pesoNeto: 1200,
    mermaPorcentaje: 5,
    categoriaId: 26,
    proveedorId: 10,
  },
  {
    nombre: 'Cerillos',
    unidad: UnidadesTypes.CAJA,
    medida: MedidasTypes.GRAMOS,
    marca: 'Flama',
    precioUnitario: 26.5,
    pesoNeto: 1400,
    mermaPorcentaje: 5,
    categoriaId: 26,
    proveedorId: 10,
  },
  {
    nombre: 'Huevos',
    unidad: UnidadesTypes.CAJA,
    medida: MedidasTypes.GRAMOS,
    marca: 'El calvario',
    precioUnitario: 61.8573,
    pesoNeto: 6801,
    mermaPorcentaje: 5,
    categoriaId: 16,
    proveedorId: 10,
  },
];
