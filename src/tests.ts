// Skyddsnätet för dag 11. Ändra inte den här filen.
// Testerna anropar bara beraknaOrder, skapaKvitto, sokRatter och nollstallKvittonummer.
// Så länge de är gröna har du inte ändrat vad koden gör.
import type { KassaRad } from "./typer";
import { test, assertEqual, assertThrows, visaResultat } from "./testlib";
import { beraknaOrder, skapaKvitto, sokRatter, nollstallKvittonummer } from "./kassa";

const bulle: KassaRad = { namn: "Kardemummabulle", pris: 35, antal: 2, kategori: "bakverk" };
const kaffe: KassaRad = { namn: "Bryggkaffe", pris: 32, antal: 1, kategori: "dryck" };
const macka: KassaRad = { namn: "Ostmacka", pris: 59, antal: 1, kategori: "lunch" };
const kort: KassaRad = { namn: "Presentkort", pris: 100, antal: 1, kategori: "present" };

// ---- beraknaOrder: summor ----
test("beraknaOrder: tom order ger nollor", () => {
  assertEqual(beraknaOrder([], ""), { delsumma: 0, rabatt: 0, moms: 0, total: 0, rader: [] });
});
test("beraknaOrder: en rad", () => {
  const o = beraknaOrder([bulle], "");
  assertEqual(o.delsumma, 70);
  assertEqual(o.total, 70);
  assertEqual(o.rader, [{ namn: "Kardemummabulle", summa: 70 }]);
});
test("beraknaOrder: flera rader summeras", () => {
  assertEqual(beraknaOrder([bulle, kaffe, macka], "").delsumma, 161);
});
test("beraknaOrder: mängdrabatt 5 % vid 10 eller fler av samma rad", () => {
  const o = beraknaOrder([{ namn: "Kanelbulle", pris: 33, antal: 10, kategori: "bakverk" }], "");
  assertEqual(o.delsumma, 313.5);
  assertEqual(o.rader[0].summa, 313.5);
});
test("beraknaOrder: 9 st ger ingen mängdrabatt", () => {
  assertEqual(beraknaOrder([{ namn: "Kanelbulle", pris: 33, antal: 9, kategori: "bakverk" }], "").delsumma, 297);
});
// ---- beraknaOrder: moms ----
test("beraknaOrder: moms 12 % på bakverk (ingår i priset)", () => {
  assertEqual(beraknaOrder([bulle], "").moms, 7.5);
});
test("beraknaOrder: moms 12 % på dryck", () => {
  assertEqual(beraknaOrder([kaffe], "").moms, 3.43);
});
test("beraknaOrder: moms 12 % på lunch", () => {
  assertEqual(beraknaOrder([macka], "").moms, 6.32);
});
test("beraknaOrder: moms 25 % på present", () => {
  assertEqual(beraknaOrder([kort], "").moms, 20);
});
test("beraknaOrder: okänd kategori får 25 % moms", () => {
  assertEqual(beraknaOrder([{ namn: "Kaffekopp", pris: 125, antal: 1, kategori: "souvenir" }], "").moms, 25);
});
test("beraknaOrder: blandad moms", () => {
  assertEqual(beraknaOrder([bulle, kort], "").moms, 27.5);
});
// ---- beraknaOrder: rabattkoder ----
test("beraknaOrder: STUDENT ger 10 % rabatt", () => {
  const o = beraknaOrder([bulle, kaffe, macka], "STUDENT");
  assertEqual(o.rabatt, 16.1);
  assertEqual(o.total, 144.9);
});
test("beraknaOrder: VÄNNER ger 15 % rabatt från 100 kr", () => {
  const o = beraknaOrder([bulle, kaffe, macka], "VÄNNER");
  assertEqual(o.rabatt, 24.15);
  assertEqual(o.total, 136.85);
});
test("beraknaOrder: VÄNNER ger ingen rabatt under 100 kr", () => {
  const o = beraknaOrder([bulle], "VÄNNER");
  assertEqual(o.rabatt, 0);
  assertEqual(o.total, 70);
});
test("beraknaOrder: VÄNNER vid exakt 100 kr ger rabatt", () => {
  const o = beraknaOrder([kort], "VÄNNER");
  assertEqual(o.rabatt, 15);
});
test("beraknaOrder: okänd kod ger ingen rabatt", () => {
  assertEqual(beraknaOrder([bulle], "HEJ").rabatt, 0);
});
test("beraknaOrder: koden är skiftlägeskänslig", () => {
  assertEqual(beraknaOrder([bulle], "student").rabatt, 0);
});
test("beraknaOrder: moms minskar proportionellt med rabatten", () => {
  assertEqual(beraknaOrder([bulle], "STUDENT").moms, 6.75);
});
test("beraknaOrder: ändrar inte indata", () => {
  const rader = [{ ...bulle }];
  const kopia = JSON.stringify(rader);
  beraknaOrder(rader, "STUDENT");
  assertEqual(JSON.stringify(rader), kopia);
});

// ---- skapaKvitto ----
test("skapaKvitto: ett enkelt kvitto", () => {
  nollstallKvittonummer();
  assertEqual(
    skapaKvitto([bulle], ""),
    "KAFÉ KARDEMUMMA\nKvitto nr 001\n----------------\nKardemummabulle: 70,00 kr\n----------------\nDelsumma: 70,00 kr\nVarav moms: 7,50 kr\nAtt betala: 70,00 kr"
  );
});
test("skapaKvitto: rabattraden visas bara när det finns rabatt", () => {
  nollstallKvittonummer();
  const med = skapaKvitto([bulle, kaffe, macka], "STUDENT");
  assertEqual(med.includes("Rabatt: -16,10 kr"), true);
  const utan = skapaKvitto([bulle], "");
  assertEqual(utan.includes("Rabatt"), false);
});
test("skapaKvitto: kvittonumret räknas upp", () => {
  nollstallKvittonummer();
  skapaKvitto([bulle], "");
  assertEqual(skapaKvitto([bulle], "").includes("Kvitto nr 002"), true);
});
test("skapaKvitto: kvittonumret fylls ut med nollor till tre siffror", () => {
  nollstallKvittonummer();
  for (let i = 0; i < 9; i++) skapaKvitto([bulle], "");
  assertEqual(skapaKvitto([bulle], "").includes("Kvitto nr 010"), true);
  for (let i = 0; i < 89; i++) skapaKvitto([bulle], "");
  assertEqual(skapaKvitto([bulle], "").includes("Kvitto nr 100"), true);
});
test("skapaKvitto: decimaltecken är komma", () => {
  nollstallKvittonummer();
  assertEqual(skapaKvitto([kaffe], "").includes("Bryggkaffe: 32,00 kr"), true);
});
test("skapaKvitto: nollställning startar om på 001", () => {
  skapaKvitto([bulle], "");
  nollstallKvittonummer();
  assertEqual(skapaKvitto([bulle], "").includes("Kvitto nr 001"), true);
});

// ---- sokRatter ----
const meny = [
  { id: 1, namn: "Kardemummabulle", kategori: "bakverk" },
  { id: 2, namn: "Bryggkaffe", kategori: "dryck" },
  { id: 3, namn: "Äppelpaj", kategori: "bakverk" },
  { id: 4, namn: "Ostmacka", kategori: "lunch" },
  { id: 5, namn: "Latte", kategori: "dryck" },
  { id: 6, namn: "Åland-kaka", kategori: "bakverk" },
];
const namnen = (lista: { namn: string }[]): string[] => lista.map((r) => r.namn);
test("sokRatter: tom sökning och inget filter ger allt, sorterat på svenska", () => {
  assertEqual(namnen(sokRatter(meny, "", "alla")), ["Bryggkaffe", "Kardemummabulle", "Latte", "Ostmacka", "Åland-kaka", "Äppelpaj"]);
});
test("sokRatter: söker i namnet, oavsett versaler", () => {
  assertEqual(namnen(sokRatter(meny, "KAFFE", "alla")), ["Bryggkaffe"]);
});
test("sokRatter: söker på del av ord", () => {
  assertEqual(namnen(sokRatter(meny, "mack", "alla")), ["Ostmacka"]);
});
test("sokRatter: trimmar söktexten", () => {
  assertEqual(namnen(sokRatter(meny, "  latte ", "alla")), ["Latte"]);
});
test("sokRatter: filter på kategori", () => {
  assertEqual(namnen(sokRatter(meny, "", "dryck")), ["Bryggkaffe", "Latte"]);
});
test("sokRatter: filter och sökning tillsammans", () => {
  assertEqual(namnen(sokRatter(meny, "ka", "bakverk")), ["Kardemummabulle", "Åland-kaka"]);
});
test("sokRatter: filter undefined betyder alla", () => {
  assertEqual(sokRatter(meny, "").length, 6);
});
test("sokRatter: inga träffar ger tom lista", () => {
  assertEqual(sokRatter(meny, "pizza", "alla"), []);
});
test("sokRatter: ändrar inte originalmenyn", () => {
  const kopia = JSON.stringify(meny);
  sokRatter(meny, "", "alla");
  assertEqual(JSON.stringify(meny), kopia);
});

visaResultat();
