// Kafé Kardemummas kassa. Det fungerar, men koden är en röra.
// Ditt jobb idag: göra den ren UTAN att ändra vad den gör. Testerna i tests.ts är ditt skyddsnät.
// De anropar bara de tre exporterade funktionerna nedan, så allt inuti får du bygga om.
// OBS: momssatserna och koderna är påhittade för övningen.

import type { KassaRad, Order, Sokbar } from "./typer";

var nr = 0;

export function nollstallKvittonummer(): void {
  nr = 0;
}

export function beraknaOrder(r: KassaRad[], k: string): Order {
  var d = 0;
  var m = 0;
  var rab = 0;
  var rader2: { namn: string; summa: number }[] = [];
  for (var i = 0; i < r.length; i++) {
    var x = r[i];
    var s = x.pris * x.antal;
    if (x.antal >= 10) {
      s = s - s * 0.05;
    }
    d = d + s;
    if (x.kategori == "present") {
      m = m + s * 0.25 / 1.25;
    } else {
      if (x.kategori == "bakverk") {
        m = m + s * 0.12 / 1.12;
      } else {
        if (x.kategori == "lunch") {
          m = m + s * 0.12 / 1.12;
        } else {
          if (x.kategori == "dryck") {
            m = m + s * 0.12 / 1.12;
          } else {
            m = m + s * 0.25 / 1.25;
          }
        }
      }
    }
    rader2.push({ namn: x.namn, summa: Math.round(s * 100) / 100 });
  }
  if (k == "STUDENT") {
    rab = d * 0.1;
  } else if (k == "VÄNNER") {
    if (d >= 100) {
      rab = d * 0.15;
    } else {
      rab = 0;
    }
  } else {
    rab = 0;
  }
  var ratt = m - m * (rab / d);
  if (d == 0) {
    ratt = 0;
  }
  var t = d - rab;
  return {
    delsumma: Math.round(d * 100) / 100,
    rabatt: Math.round(rab * 100) / 100,
    moms: Math.round(ratt * 100) / 100,
    total: Math.round(t * 100) / 100,
    rader: rader2,
  };
}

export function skapaKvitto(r: KassaRad[], k: string): string {
  nr = nr + 1;
  var o = beraknaOrder(r, k);
  var s = "KAFÉ KARDEMUMMA\n";
  s = s + "Kvitto nr " + (nr < 10 ? "00" + nr : nr < 100 ? "0" + nr : nr) + "\n";
  s = s + "----------------\n";
  for (var i = 0; i < o.rader.length; i++) {
    var a = o.rader[i].summa.toFixed(2).replace(".", ",");
    s = s + o.rader[i].namn + ": " + a + " kr\n";
  }
  s = s + "----------------\n";
  s = s + "Delsumma: " + o.delsumma.toFixed(2).replace(".", ",") + " kr\n";
  if (o.rabatt > 0) {
    s = s + "Rabatt: -" + o.rabatt.toFixed(2).replace(".", ",") + " kr\n";
  }
  s = s + "Varav moms: " + o.moms.toFixed(2).replace(".", ",") + " kr\n";
  s = s + "Att betala: " + o.total.toFixed(2).replace(".", ",") + " kr";
  return s;
}

export function sokRatter<T extends Sokbar>(m: T[], q: string, f?: string | null): T[] {
  var res: T[] = [];
  var qq = q.trim().toLowerCase();
  for (var i = 0; i < m.length; i++) {
    var ok = true;
    if (qq != "") {
      if (m[i].namn.toLowerCase().indexOf(qq) == -1) {
        ok = false;
      }
    }
    if (f != undefined && f != "alla") {
      if (m[i].kategori != f) {
        ok = false;
      }
    }
    if (ok) {
      res.push(m[i]);
    }
  }
  for (var a = 0; a < res.length; a++) {
    for (var b = a + 1; b < res.length; b++) {
      if (res[a].namn.localeCompare(res[b].namn, "sv") > 0) {
        var tmp = res[a];
        res[a] = res[b];
        res[b] = tmp;
      }
    }
  }
  return res;
}
