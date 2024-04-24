"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Samochod = void 0;
class Samochod {
    constructor(numer, przebieg, liczba_pasazerów, cena_za_dzien, lista_uszkodzen, lista_wypozyczen, wypozyczony) {
        this.numer = numer;
        this.przebieg = przebieg;
        this.liczba_pasazerów = liczba_pasazerów;
        this.cena_za_dzien = cena_za_dzien;
        this.lista_uszkodzen = lista_uszkodzen;
        this.lista_wypozyczen = lista_wypozyczen;
        this.wypozyczony = wypozyczony;
    }
    getNumer() {
        return this.numer;
    }
    wypozycz() {
        if (this.wypozyczony === false) {
            this.wypozyczony = true;
            this.lista_wypozyczen.push(new Date().toDateString());
            return true;
        }
        else {
            return false;
        }
    }
    zwroc() {
        if (this.wypozyczony === true) {
            this.wypozyczony = false;
            return true;
        }
        else {
            return false;
        }
    }
    kiedy_dostepny() {
        var dzisiaj = new Date();
        var jutro = new Date();
        jutro.setDate(dzisiaj.getDate() + 1);
        var pojutrze = new Date();
        pojutrze.setDate(jutro.getDate() + 1);
        var dzisiajStr = dzisiaj.toDateString();
        var jutroStr = jutro.toDateString();
        var pojutrzeStr = pojutrze.toDateString();
        if (this.wypozyczony === true) {
            if (this.lista_wypozyczen[this.lista_wypozyczen.length - 1] === dzisiajStr) {
                return pojutrzeStr;
            }
            else {
                return jutroStr;
            }
        }
        else {
            return dzisiajStr;
        }
    }
    dodaj_uszkodzenie() {
        this.lista_uszkodzen.push(new Date().toDateString());
    }
    ile_razy_wypozyczony() {
        return this.lista_wypozyczen.length;
    }
    ile_razy_uszkodzony() {
        return this.lista_uszkodzen.length;
    }
}
exports.Samochod = Samochod;
