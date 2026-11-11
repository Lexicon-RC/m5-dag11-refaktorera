# Dag 11 · Refaktorera med skyddsnät

*Modul 5, UI/UX & Frontendutveckling (TypeScript), Lexicon IT-Proffs*

## Vad du ska göra idag

Du lär dig **refaktorera**: bygga om kod så att den blir lättare att läsa, ändra och testa, utan att ändra vad den gör. Du får en fungerande men rörig kassa (`src/kassa.ts`) och 34 tester som skyddsnät. Du hittar kodlukter, planerar moduler och bygger om i små steg där testerna är gröna efter varje steg.

## Bakgrund

Kod skrivs en gång men läses hundra gånger. Att få något att fungera är första halvan av jobbet, att göra det begripligt är andra. Refaktorering är riskfyllt utan tester: du vet inte om du ändrat beteendet. Därför börjar du med att köra testerna (de är gröna), och du kör dem efter *varje* litet steg. Går något rött vet du exakt vad som orsakade det. Ombyggnaden gör du i små steg, och du ska kunna förklara varje ändring.

## Så arbetar du (samma som alltid)

1. **Forka** dagens repo på GitHub (*Fork → Create fork*).
2. **Klona din fork:** *Code → HTTPS → kopiera adressen*. I terminalen (Ctrl+ö i VS Code): `git clone <adressen>`. Öppna den nya mappen i VS Code.
3. **Installera verktygen, en gång per repo:** `npm install` i terminalen.
4. **Starta servern:** `npm run dev`. Öppna adressen den skriver ut (oftast `http://localhost:5173/`). Tryck F12 och välj fliken *Console*. Stoppa med Ctrl+C. Testsidan öppnar du på samma server: `http://localhost:5173/tests.html` (lägg till `/tests.html` efter adressen).
5. **Gör uppgiften.** Spara och kontrollera i webbläsaren och Console efter varje steg. Gör en commit efter varje avslutat steg: `git add .` och `git commit -m "Beskriv vad du gjorde"`.
6. **Kontrollera typerna:** `npm run typecheck`. Tyst betyder att alla typer stämmer. Röda understrykningar i VS Code är TypeScript som varnar.
7. **Skicka upp** när du är klar: `git push`.
8. **Lämna in i Microsoft Forms.**

Fastnar du: skriv ner exakt var och vad du försökt (och vilket felmeddelande du fick), och ta det först i nästa handledda pass. Problem med `npm` eller Node? Läs *Elevguide: Node, Vite och TypeScript*.

> Vite tar bara bort typerna och kör koden. Den kontrollerar dem inte. Sidan kan alltså köras trots röda understrykningar.

## Uppgiften steg för steg

### Steg 1. Klona och kör skyddsnätet

Forka repot, kör `git clone`, öppna i VS Code, starta Vite-servern på `tests.html`. Alla 34 tester i `src/tests.ts` är gröna. Så ska det vara hela dagen. Du får aldrig ändra `src/tests.ts`. Läs testerna: vad kan du lära dig om vad koden gör?

### Steg 2. Läs koden och leta kodlukter

Öppna `src/kassa.ts`. Läs den två gånger. Fyll i tabellen i `docs/refaktorering.md` (avsnitt 1) med minst åtta kodlukter: var i filen, vilken lukt och varför det är ett problem. Titta efter dåliga namn, `var`, `==`, magiska tal, upprepad kod, djupa `if`-kedjor och global state.

### Steg 3. Planera modulerna

Skriv i avsnitt 2 vilka moduler du vill ha och vad var och en ansvarar för. Tänk i ansvar, inte i filer: vad hör ihop? Exempel på frågor: var finns momsen, var finns rabatten, var finns formateringen?

### Steg 4. Städa först, flytta sedan

Börja med ett litet steg som inte flyttar något: byt `var` mot `const` och `let`, byt `==` mot `===`, ge variablerna begripliga namn. Kör testerna. Commit. Gör ett steg i taget: byt namn på `r`, `k` och `d`, kör, commit.

### Steg 5. Plocka ut magiska tal

Skapa `src/konstanter.ts` med momssatserna, mängdrabatten och rabattkoderna. Importera dem i `src/kassa.ts`. Kör testerna efter varje konstant. Commit.

### Steg 6. Plocka ut moduler en i taget

Gör en modul i taget: till exempel `src/avrunda.ts`, `src/moms.ts`, `src/rabatt.ts`, `src/kvitto.ts` och `src/sok.ts`. Efter varje: kör testerna, commit med ett tydligt meddelande. Låt `src/kassa.ts` till slut bara re-exportera funktionerna (`export { sokRatter } from "./sok"`), så att testerna fortfarande fungerar utan ändring.

### Steg 7. Skriv tester för dina moduler

I `src/tests-moduler.ts`: skriv minst ett test per modul du skapat. Skapa också ett test för en situation som skyddsnätet inte täcker. Hittade du något?

### Steg 8. Mät före och efter

Fyll i avsnitt 5: längsta funktionen före och efter, antal magiska tal, och att du inte ändrat `src/tests.ts` (kontrollera med `git diff src/tests.ts`, den ska vara tom). Skriv avsnitt 6, reflektionen.

### Steg 9. Fördjupning (frivillig): kvittonumret

Kvittonumret är global state. Hur skulle du göra `skapaKvitto` ren genom att skicka in numret? Vilka tester måste då ändras, och är det okej? Diskutera i reflektionen.

## Kontrollista: så vet du att du är klar

- [ ] Alla tester i `src/tests.ts` är gröna, och `src/tests.ts` är oförändrad (`git diff src/tests.ts` är tom).
- [ ] `src/kassa.ts` har kvar samma tre publika funktioner och är nu en kort fasad.
- [ ] Du har minst fyra nya moduler.
- [ ] Inga `var`, inga `==` och inga magiska tal är kvar i logiken.
- [ ] `docs/refaktorering.md` är ifylld: minst åtta kodlukter, plan, steg och mätning.
- [ ] Du har minst ett test per ny modul i `src/tests-moduler.ts`.
- [ ] Du har gjort minst åtta commits, och testerna var gröna vid varje.

## Tips om du fastnar

- Små steg. Hellre tjugo små commits än en enda stor ombyggnad.
- Går testerna röda: ångra senaste ändringen (`git restore filen`) och gör ett mindre steg. Gissa inte dig fram.
- Räkna inte om matematiken "snyggare". Flyttal är känsliga för ordningen: `a * b / c` och `a * (b / c)` kan ge olika ören. Behåll räkneordningen.
- Rör inte beteendet, inte ens om du tror att det är en bugg. Skriv ner det istället som ett fynd. Refaktorering ändrar struktur, inte beteende.
- Gröna tester är inte samma som rätt kod: läs den nya modulen och förklara den högt.
- Svårt att välja modulnamn? Fundera på vad som skulle ändras om momsen ändrades. Det som ändras ihop hör ihop.

## Inlämning

**Deadline: imorgon klockan 09.00.** Allt lämnas in i Microsoft Forms. Du behöver inte redovisa något muntligt.

I formuläret fyller du i:

1. Länk till din fork av det här repot.
2. Reflektion: Vad är skillnaden mellan att refaktorera och att skriva om? Vad skulle ha hänt om du ombyggt hela filen utan tester? Vilket fynd i koden (ett beteende du tyckte var konstigt) skulle du ta upp med ett team? Hjälpte typerna dig när du flyttade kod mellan moduler, och hur?

## Vill du mer? (frivilligt)

- Gör `skapaKvitto` ren: ta numret som parameter. Uppdatera testerna medvetet och förklara varför det är okej.
- Lägg till en ny rabattkod med bara en rad i `src/konstanter.ts`. Det är poängen med refaktoreringen: ändringar blir små.
- Skriv en `kontroll.mjs` som kör `node` och räknar rader per funktion i dina moduler.
