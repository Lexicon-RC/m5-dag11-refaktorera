// Typerna för kassan. Ändra INTE den här filen.

// En rad i ordern: vad, vad den kostar (inklusive moms), hur många och vilken kategori.
export interface KassaRad {
  namn: string;
  pris: number;
  antal: number;
  kategori: string;
}

// Resultatet av beraknaOrder.
export interface Order {
  delsumma: number;
  rabatt: number;
  moms: number;
  total: number;
  rader: { namn: string; summa: number }[];
}

// Det sokRatter behöver veta om en rätt. Funktionen fungerar för alla objekt som har de här två fälten.
export interface Sokbar {
  namn: string;
  kategori: string;
}
