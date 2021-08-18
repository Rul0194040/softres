import { CreateInsumoDTO } from './DTO/create-insumo.dto';
import { MedidasTypes } from './enums/medidasTypes.enum';
import { UnidadesTypes } from './enums/unidadesTypes.enum';

export const insumosToCreate: CreateInsumoDTO[] = [
  {
    nombre: 'Aceite de soya comestible',
    unidad: UnidadesTypes.BIDON,
    medida: MedidasTypes.LITROS,
    marca: "Member's mark",
    precioUnitario: 0,
    categoriaId: 1,
  },
  {
    nombre: 'Aceite de oliva',
    unidad: UnidadesTypes.GARRAFA,
    medida: MedidasTypes.LITROS,
    marca: '-',
    precioUnitario: 722.8957,
    categoriaId: 1,
  },
  {
    nombre: 'Miel de agave',
    unidad: UnidadesTypes.GARRAFA,
    medida: MedidasTypes.LITROS,
    marca: '-',
    precioUnitario: 219.2,
    categoriaId: 19,
  },
  {
    nombre: 'Bactericida',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.LITROS,
    marca: "Member's Mark",
    precioUnitario: 101.27,
    categoriaId: 6,
  },
  {
    nombre: 'Vinagre balsámico',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.LITROS,
    marca: 'Pianello',
    precioUnitario: 120.67,
    categoriaId: 24,
  },
  {
    nombre: 'Vino tipo jerez',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.LITROS,
    marca: 'Tres Coronas',
    precioUnitario: 78.44,
    categoriaId: 24,
  },
  {
    nombre: 'Vinagre de manzana',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.LITROS,
    marca: 'Mother Earth',
    precioUnitario: 62.21,
    categoriaId: 24,
  },
  {
    nombre: 'Salsa inglesa',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.LITROS,
    marca: "French's",
    precioUnitario: 135.77,
    categoriaId: 7,
  },
  {
    nombre: 'Salsa de soya',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.LITROS,
    marca: 'Kikkoman',
    precioUnitario: 255.97,
    categoriaId: 7,
  },
  {
    nombre: 'Extracto de vainilla ',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.LITROS,
    marca: 'Gallardo',
    precioUnitario: 200.575,
    categoriaId: 8,
  },
  {
    nombre: 'Jugo de tomate',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.LITROS,
    marca: 'Clamato ',
    precioUnitario: 12.28,
    categoriaId: 22,
  },
  {
    nombre: 'Vinagre de manzana',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.LITROS,
    marca: 'Heinz',
    precioUnitario: 0,
    categoriaId: 24,
  },
  {
    nombre: 'Crema de coco',
    unidad: UnidadesTypes.CAJA,
    medida: MedidasTypes.LITROS,
    marca: 'Calahua',
    precioUnitario: 77.5,
    categoriaId: 7,
  },
  {
    nombre: 'Leche entera',
    unidad: UnidadesTypes.CAJA,
    medida: MedidasTypes.LITROS,
    marca: 'Leche y pan',
    precioUnitario: 15.5983,
    categoriaId: 16,
  },
  {
    nombre: 'Leche deslactosada',
    unidad: UnidadesTypes.CAJA,
    medida: MedidasTypes.LITROS,
    marca: 'Lala',
    precioUnitario: 0,
    categoriaId: 16,
  },
  {
    nombre: 'Saborizante de vainilla',
    unidad: UnidadesTypes.FRASCO,
    medida: MedidasTypes.LITROS,
    marca: 'Zanilli',
    precioUnitario: 0,
    categoriaId: 8,
  },
  {
    nombre: 'Pepinillos agridulces en conserva',
    unidad: UnidadesTypes.FRASCO,
    medida: MedidasTypes.KILOS,
    marca: 'Gherkias',
    precioUnitario: 78.77,
    categoriaId: 4,
  },
  {
    nombre: 'Pimienta negra',
    unidad: UnidadesTypes.FRASCO,
    medida: MedidasTypes.KILOS,
    marca: "Member's mark",
    precioUnitario: 0,
    categoriaId: 7,
  },
  {
    nombre: 'Canela en polvo',
    unidad: UnidadesTypes.FRASCO,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 0,
    categoriaId: 7,
  },
  {
    nombre: 'Garbanzo ',
    unidad: UnidadesTypes.FRASCO,
    medida: MedidasTypes.KILOS,
    marca: 'Cidacos',
    precioUnitario: 19.7766,
    categoriaId: 10,
  },
  {
    nombre: 'Garbanzo',
    unidad: UnidadesTypes.FRASCO,
    medida: MedidasTypes.KILOS,
    marca: "Cidaco's",
    precioUnitario: 19.7766,
    categoriaId: 15,
  },
  {
    nombre: 'Pan rallado',
    unidad: UnidadesTypes.CAJA,
    medida: MedidasTypes.KILOS,
    marca: 'Panko',
    precioUnitario: 164,
    categoriaId: 21,
  },
  {
    nombre: 'Miel de abeja',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.KILOS,
    marca: "Member's Mark",
    precioUnitario: 197.44,
    categoriaId: 19,
  },
  {
    nombre: 'Miel de maple',
    unidad: UnidadesTypes.BOTELLA,
    medida: MedidasTypes.KILOS,
    marca: "Member's Mark",
    precioUnitario: 180.4,
    categoriaId: 19,
  },
  {
    nombre: 'Eneldo',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 836,
    categoriaId: 7,
  },
  {
    nombre: 'Orégano',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 101.25,
    categoriaId: 7,
  },
  {
    nombre: 'Canela en rollo de 21"',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 420,
    categoriaId: 7,
  },
  {
    nombre: 'Clavo entero',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 330.75,
    categoriaId: 7,
  },
  {
    nombre: 'Azahár',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 0,
    categoriaId: 7,
  },
  {
    nombre: 'Laurel',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 534,
    categoriaId: 7,
  },
  {
    nombre: 'Panela',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 0,
    categoriaId: 7,
  },
  {
    nombre: 'Flor de jamaica',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 154.7544,
    categoriaId: 7,
  },
  {
    nombre: 'Nuez sin cáscara',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: "Member's Mark",
    precioUnitario: 0,
    categoriaId: 11,
  },
  {
    nombre: 'Almendras',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: "Member's Mark",
    precioUnitario: 259.9292,
    categoriaId: 11,
  },
  {
    nombre: 'Dátiles deshuesados ',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: 'Del desierto',
    precioUnitario: 0,
    categoriaId: 11,
  },
  {
    nombre: 'Cacahuate crudo',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 0,
    categoriaId: 15,
  },
  {
    nombre: 'Lentejas',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: 'Schettino',
    precioUnitario: 37.4475,
    categoriaId: 15,
  },
  {
    nombre: 'Pasta tipo spaghetti',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: 'La moderna',
    precioUnitario: 33.83,
    categoriaId: 20,
  },
  {
    nombre: 'Pasta de fideo grueso',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: 'Italpasta',
    precioUnitario: 0,
    categoriaId: 20,
  },
  {
    nombre: 'Carbón activado',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: 'El hierberito',
    precioUnitario: 0,
    categoriaId: 25,
  },
  {
    nombre: 'Manteca vegetal',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: 'Inca',
    precioUnitario: 61.6371,
    categoriaId: 18,
  },
  {
    nombre: 'Harina de maíz azul',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: 'Maseca',
    precioUnitario: 16,
    categoriaId: 13,
  },
  {
    nombre: 'Azúcar mascabado',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: 'Metco',
    precioUnitario: 34.5067,
    categoriaId: 7,
  },
  {
    nombre: 'Cocoa en polvo ',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 0,
    categoriaId: 7,
  },
  {
    nombre: 'Arroz',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: 'Bueno',
    precioUnitario: 37.2643,
    categoriaId: 2,
  },
  {
    nombre: 'Chile onza',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 400,
    categoriaId: 3,
  },
  {
    nombre: 'Chile pasilla oaxaqueño',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 63.4586,
    categoriaId: 3,
  },
  {
    nombre: 'Chile ancho',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 997.1789,
    categoriaId: 3,
  },
  {
    nombre: 'Chile árbol',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 70.8297,
    categoriaId: 3,
  },
  {
    nombre: 'Chile huajillo',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 69.8559,
    categoriaId: 3,
  },
  {
    nombre: 'Chile chilhuacle',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 700,
    categoriaId: 3,
  },
  {
    nombre: 'Chile piquín',
    unidad: UnidadesTypes.BOLSA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 240,
    categoriaId: 3,
  },
  {
    nombre: 'Harina de trigo',
    unidad: UnidadesTypes.COSTAL,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 0,
    categoriaId: 13,
  },
  {
    nombre: 'Harina de trigo vitaminada',
    unidad: UnidadesTypes.COSTAL,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 0,
    categoriaId: 13,
  },
  {
    nombre: 'Harina',
    unidad: UnidadesTypes.CUBETA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 0,
    categoriaId: 13,
  },
  {
    nombre: 'Sal',
    unidad: UnidadesTypes.CUBETA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 5.8,
    categoriaId: 7,
  },
  {
    nombre: 'Azúcar',
    unidad: UnidadesTypes.CUBETA,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 23.95,
    categoriaId: 7,
  },
  {
    nombre: 'Orégano molido',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 0,
    categoriaId: 7,
  },
  {
    nombre: 'Pimentón/paprika',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 0,
    categoriaId: 7,
  },
  {
    nombre: 'Nuez mosacada',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 739.23,
    categoriaId: 7,
  },
  {
    nombre: 'Gengibre molido',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 0,
    categoriaId: 7,
  },
  {
    nombre: 'Clavo molido',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 375.3,
    categoriaId: 7,
  },
  {
    nombre: 'Levadura seca ',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.KILOS,
    marca: 'Magidely',
    precioUnitario: 0,
    categoriaId: 25,
  },
  {
    nombre: 'Pan molido',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.KILOS,
    marca: '-',
    precioUnitario: 0,
    categoriaId: 21,
  },
  {
    nombre: 'Galletas saladas',
    unidad: UnidadesTypes.PAQUETE,
    medida: MedidasTypes.KILOS,
    marca: 'Ritz',
    precioUnitario: 0,
    categoriaId: 12,
  },
  {
    nombre: 'Chipotles adobados',
    unidad: UnidadesTypes.LATA,
    medida: MedidasTypes.KILOS,
    marca: 'La morena ',
    precioUnitario: 40,
    categoriaId: 7,
  },
  {
    nombre: 'Atún',
    unidad: UnidadesTypes.LATA,
    medida: MedidasTypes.KILOS,
    marca: 'Tuny',
    precioUnitario: 108.8571,
    categoriaId: 9,
  },
  {
    nombre: 'Leche condensada',
    unidad: UnidadesTypes.LATA,
    medida: MedidasTypes.KILOS,
    marca: 'Nestlé',
    precioUnitario: 29.7878,
    categoriaId: 16,
  },
  {
    nombre: 'Polvo para hornear',
    unidad: UnidadesTypes.LATA,
    medida: MedidasTypes.KILOS,
    marca: 'Royal',
    precioUnitario: 20.6667,
    categoriaId: 25,
  },
  {
    nombre: 'Crema de avellanas',
    unidad: UnidadesTypes.FRASCO,
    medida: MedidasTypes.KILOS,
    marca: 'Nutella',
    precioUnitario: 104.9,
    categoriaId: 25,
  },
  {
    nombre: 'Palillos',
    unidad: UnidadesTypes.CAJA,
    medida: MedidasTypes.PIEZA,
    marca: 'Pingüino',
    precioUnitario: 27.6143,
    categoriaId: 25,
  },
  {
    nombre: 'Cerillos',
    unidad: UnidadesTypes.CAJA,
    medida: MedidasTypes.PIEZA,
    marca: 'Flama',
    precioUnitario: 26.5,
    categoriaId: 25,
  },
  {
    nombre: 'Huevos',
    unidad: UnidadesTypes.CAJA,
    medida: MedidasTypes.PIEZA,
    marca: 'El calvario',
    precioUnitario: 61.8573,
    categoriaId: 14,
  },
];
