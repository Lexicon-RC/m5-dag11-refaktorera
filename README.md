# Dag 11 · Refaktorera med skyddsnät

*Modul 5, UI/UX & Frontendutveckling (JavaScript), Lexicon IT-Proffs*

## Vad du ska göra idag

Du lär dig **refaktorera**: bygga om kod så att den blir lättare att läsa, ändra och testa, utan att ändra vad den gör. Du får en fungerande men rörig kassa (`kassa.js`) och 34 tester som skyddsnät. Du hittar kodlukter, planerar moduler och bygger om i små steg där testerna är gröna efter varje steg.

## Bakgrund

Kod skrivs en gång men läses hundra gånger. Att få något att fungera är första halvan av jobbet, att göra det begripligt är andra. Refaktorering är riskfyllt utan tester: du vet inte om du ändrat beteendet. Därför börjar du med att köra testerna (de är gröna), och du kör dem efter *varje* litet steg. Går något rött vet du exakt vad som orsakade det. Du får använda AI för förslag, men ombyggnaden gör du i små steg själv, och du ska kunna förklara varje ändring.

## Så arbetar du (samma som alltid)

1. **Forka** dagens repo på GitHub (*Fork → Create fork*).
2. **Klona din fork:** *Code → HTTPS → kopiera adressen*. I terminalen (Ctrl+ö i VS Code): `git clone <adressen>`. Öppna den nya mappen i VS Code och starta *Live Server*.
3. **Gör uppgiften.** Spara och kontrollera i webbläsaren och Console (F12) efter varje steg. Gör en commit efter varje avslutat steg: `git add .` och `git commit -m "Beskriv vad du gjorde"`.
4. **Skicka upp** när du är klar: `git push`.
5. **Fortsätt i `mitt-projekt`** med dagens projektsteg (längre ned).
6. **Lämna in i Microsoft Forms.**

Fastnar du: skriv ner exakt var och vad du försökt (och vilket felmeddelande du fick), och ta det först i nästa handledda pass.

Filer som använder `import` fungerar bara när sidan öppnas med *Live Server*. Dubbelklickar du på en HTML-fil hamnar du på `file://` och får ett CORS-fel i Console.

## Uppgiften steg för steg

### Steg 1. Klona och kör skyddsnätet

Forka repot, kör `git clone`, öppna i VS Code, starta Live Server på `tests.html`. Alla 34 tester i `tests.js` är gröna. Så ska det vara hela dagen. Du får aldrig ändra `tests.js`. Läs testerna: vad kan du lära dig om vad koden gör?

### Steg 2. Läs koden och leta kodlukter

Öppna `kassa.js`. Läs den två gånger. Fyll i tabellen i `docs/refaktorering.md` (avsnitt 1) med minst åtta kodlukter: var i filen, vilken lukt och varför det är ett problem. Titta efter dåliga namn, `var`, `==`, magiska tal, upprepad kod, djupa `if`-kedjor och global state.

### Steg 3. Planera modulerna

Skriv i avsnitt 2 vilka moduler du vill ha och vad var och en ansvarar för. Tänk i ansvar, inte i filer: vad hör ihop? Exempel på frågor: var finns momsen, var finns rabatten, var finns formateringen? Vill du ha AI:s förslag: be om förslag, inte kod (se AI-spåret).

### Steg 4. Städa först, flytta sedan

Börja med ett litet steg som inte flyttar något: byt `var` mot `const` och `let`, byt `==` mot `===`, ge variablerna begripliga namn. Kör testerna. Commit. Gör ett steg i taget: byt namn på `r`, `k` och `d`, kör, commit.

### Steg 5. Plocka ut magiska tal

Skapa `konstanter.js` med momssatserna, mängdrabatten och rabattkoderna. Importera dem i `kassa.js`. Kör testerna efter varje konstant. Commit.

### Steg 6. Plocka ut moduler en i taget

Gör en modul i taget: till exempel `avrunda.js`, `moms.js`, `rabatt.js`, `kvitto.js` och `sok.js`. Efter varje: kör testerna, commit med ett tydligt meddelande. Låt `kassa.js` till slut bara re-exportera funktionerna (`export { sokRatter } from "./sok.js"`), så att testerna fortfarande fungerar utan ändring.

### Steg 7. Skriv tester för dina moduler

I `tests-moduler.js`: skriv minst ett test per modul du skapat. Skapa också ett test för en situation som skyddsnätet inte täcker. Hittade du något?

### Steg 8. Mät före och efter

Fyll i avsnitt 5: längsta funktionen före och efter, antal magiska tal, och att du inte ändrat `tests.js` (kontrollera med `git diff tests.js`, den ska vara tom). Skriv avsnitt 6, reflektionen.

### Steg 9. Fördjupning (frivillig): kvittonumret

Kvittonumret är global state. Hur skulle du göra `skapaKvitto` ren genom att skicka in numret? Vilka tester måste då ändras, och är det okej? Diskutera i reflektionen.

## AI-spåret (nivå 3: Styr och ansvara)

**Refaktorera med skyddsnät** (cirka 25 minuter, efter att du gjort din egen lösning)

Fri användning, full loggning. Du granskar varje rad AI föreslår och bär ansvaret för allt du lämnar in. AI är bra på att föreslå ombyggnad. Utan tester vet du inte om beteendet ändrades.

Regler: egen lösning först, du ska kunna förklara varje rad, och du loggar i `docs/ai-logg.md` i `mitt-projekt` under rubriken *Modul 5*. Reglerna står i `AI-REGLER-MODUL5.md`.

1. Kör testerna. Alla ska vara gröna innan du börjar.
2. Be AI föreslå hur koden kan delas upp i moduler, utan att skriva koden.
3. Gör ombyggnaden själv, ett steg i taget, och kör testerna efter varje steg.
4. Prova att låta AI skriva en av modulerna. Gå testerna fortfarande gröna?
5. Logga vilka förslag du valde bort och varför.

Prompt att utgå från:

```
Här är min kod:
[klistra in koden]
Föreslå hur den kan delas i moduler (data, api, ui).
Skriv inte koden, bara förslag med skäl.
Vad bör jag undvika att ändra?
```

**Kontrollera med:**

- Testerna före och efter.
- git diff visar vad som egentligen ändrats.
- Console ska vara utan fel.

**I ditt projekt:** Dela upp ditt projekts JavaScript i moduler. Kör dina tester efter varje steg och committa efter varje steg.

## Kontrollista: så vet du att du är klar

- [ ] Alla tester i `tests.js` är gröna, och `tests.js` är oförändrad (`git diff tests.js` är tom).
- [ ] `kassa.js` har kvar samma tre publika funktioner och är nu en kort fasad.
- [ ] Du har minst fyra nya moduler.
- [ ] Inga `var`, inga `==` och inga magiska tal är kvar i logiken.
- [ ] `docs/refaktorering.md` är ifylld: minst åtta kodlukter, plan, steg och mätning.
- [ ] Du har minst ett test per ny modul i `tests-moduler.js`.
- [ ] Du har gjort minst åtta commits, och testerna var gröna vid varje.
- [ ] Du har gjort AI-uppgiften och skrivit en post i `docs/ai-logg.md` i `mitt-projekt`.

## Tips om du fastnar

- Små steg. Hellre tjugo små commits än en enda stor ombyggnad.
- Går testerna röda: ångra senaste ändringen (`git restore filen`) och gör ett mindre steg. Gissa inte dig fram.
- Räkna inte om matematiken "snyggare". Flyttal är känsliga för ordningen: `a * b / c` och `a * (b / c)` kan ge olika ören. Behåll räkneordningen.
- Rör inte beteendet, inte ens om du tror att det är en bugg. Skriv ner det istället som ett fynd. Refaktorering ändrar struktur, inte beteende.
- Om AI skriver en modul åt dig: kör testerna direkt. Gröna är inte samma som rätt: läs koden och förklara den.
- Svårt att välja modulnamn? Fundera på vad som skulle ändras om momsen ändrades. Det som ändras ihop hör ihop.

## Ditt projekt: Refaktorera din egen kod

Efter övningen jobbar du vidare i `mitt-projekt`, samma repo som i modul 4. Övningen här är träningsbanan, projektet är det som växer. Dagens steg står också i `PROJEKTSTEG-MODUL5.md` (som du kopierar till ditt projekt dag 1), under **Dag 11**.

1. Kör alla tester i ditt projekt. De ska vara gröna innan du börjar.
2. Läs `js/main.js` och dina andra filer. Skriv i `docs/refaktorering.md` i projektet minst fem kodlukter du hittar i din egen kod.
3. Dela upp den största eller rörigaste funktionen i mindre delar, eller flytta ut en modul. Kör testerna efter varje steg.
4. Saknar koden tester? Skriv först tester som beskriver beteendet (karakteriseringstester), och bygg sedan om.
5. Gör i en feature-gren och en pull request till din egen main.
6. Commit och push.

**Klart när:** Projektets kod är uppdelad i tydligare moduler, testerna är gröna, och `docs/refaktorering.md` beskriver fem kodlukter och vad du gjort.

## Inlämning

**Deadline: imorgon klockan 09.00.** Allt lämnas in i Microsoft Forms. Du behöver inte redovisa något muntligt.

I formuläret fyller du i:

1. Länk till din fork av det här repot.
2. Länk till ditt `mitt-projekt`.
3. Reflektion: Vad är skillnaden mellan att refaktorera och att skriva om? Vad skulle ha hänt om du ombyggt hela filen utan tester? Vilket fynd i koden (ett beteende du tyckte var konstigt) skulle du ta upp med ett team?

## Vill du mer? (frivilligt)

- Gör `skapaKvitto` ren: ta numret som parameter. Uppdatera testerna medvetet och förklara varför det är okej.
- Lägg till en ny rabattkod med bara en rad i `konstanter.js`. Det är poängen med refaktoreringen: ändringar blir små.
- Skriv en `kontroll.mjs` som kör `node` och räknar rader per funktion i dina moduler.
