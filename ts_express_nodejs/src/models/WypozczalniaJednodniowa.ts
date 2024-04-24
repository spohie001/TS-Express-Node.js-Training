import {Samochod} from './Samochod';

export class WypozczalniaJednodniowa{ //klasy (definiowane przez slowo kluczowe class)
    private tab: Samochod[]
    constructor(samochody: Samochod[]){
        this.tab = [];
        samochody.forEach((s)=>{
            this.tab.push(s);
        })
    }
    podaj_wypozyczone = () =>{
        var dzisiaj = new Date();
        var jutro = new Date();
        var pojutrze = new Date();
        jutro.setDate(dzisiaj.getDate() + 1);
        pojutrze.setDate(jutro.getDate() + 1);
        var jutroStr = jutro.toDateString();
        var pojutrzeStr = pojutrze.toDateString();

        let licznik = 0; //zmienne o zasiegu bloku
        this.tab.forEach(function(s: Samochod){
            //zachowanie this w funkcji zagniezdzonej i =>, tutaj this.tab zwróciłoby undefined
            if(s.kiedy_dostepny() === pojutrzeStr){
                licznik = licznik+1;
            }
            else if(s.kiedy_dostepny() === jutroStr){
                licznik = licznik+1;
            }
        })

        let msg = "Liczba wypożyczonych traktorów to: ";
        msg = msg.replaceAll("traktorów","aut"); //replaceAll dla stringow
        return msg + licznik;
    }
    podaj_dostepne = (dzien: string) =>{
        var lista_dostepnych: string[];
        lista_dostepnych = [];
        this.tab.forEach(function(s){
            var dostepny = s.kiedy_dostepny();
            if(dzien === dostepny){
                lista_dostepnych.push(s.getNumer()+"\n");
            }
        })
        return lista_dostepnych;
    }
    podaj_top10_wypozyczanych = (): Samochod[] =>{
        var top10: Samochod[] = []
        this.tab.forEach(function(s){
            if(top10.length<10){
                top10.push(s);
                top10.sort(function(x,y){
                    return y.ile_razy_wypozyczony() - x.ile_razy_wypozyczony();
                });
            }
            else{
                if(top10[top10.length-1].ile_razy_wypozyczony() < s.ile_razy_wypozyczony()){
                    top10.pop();
                    top10.push(s);
                    top10.sort(function(x,y){
                        return y.ile_razy_wypozyczony() - x.ile_razy_wypozyczony();
                    });
                }
            }
        })
        return top10;
    }
    podaj_top10_uszkadzanych = (): Samochod[] =>{ //uproszczona skladnie "strzalkowa" dla funkcji anonimowych
        var top10: Samochod[] = []
        this.tab.forEach((s)=>{
            if(top10.length<10){
                top10.push(s);
                top10.sort(function(x,y){
                    return y.ile_razy_uszkodzony() - x.ile_razy_uszkodzony();
                });
            }
            else{
                if(top10[top10.length-1].ile_razy_uszkodzony() < s.ile_razy_uszkodzony()){
                    top10.pop();
                    top10.push(s);
                    top10.sort((x,y)=>{
                        return y.ile_razy_uszkodzony() - x.ile_razy_uszkodzony();
                    });
                }
            }
        })
        //przypisania dekomponujace struktury i listy
        var [usterkowy] = top10;
        var usterkowy_klasycznie = top10[0];
        var msg = "najbardziej usterkowe auto dostepne: " + usterkowy.kiedy_dostepny();
        var msg_k = "najbardziej usterkowe auto dostepne: " + usterkowy_klasycznie.kiedy_dostepny();
        console.log(msg);
        console.log(msg_k);
        return top10;
    }
}

// ////*DATY*/
// var d1d = new Date();
// var d2d = new Date();
// d2d.setDate(d1d.getDate() - 2);
// var d3d = new Date();
// d2d.setDate(d1d.getDate() - 2);
// var d4d = new Date();
// d3d.setDate(d1d.getDate() - 2);

// var d1 = d1d.toDateString();
// var d2 = d2d.toDateString();
// var d3 = d3d.toDateString();
// var d4 = d4d.toDateString();

// /*SAMOCHODY*/
// var s1 = new Samochod(1,1_000_000,2,50,[d1],[d1], true );
// var s2 = new Samochod(2,2_000_000,2,50,[d2,d1],[d2,d1], true );
// var s3 = new Samochod(3,3_000_000,2,50,[d3,d2,d1],[d3,d2,d1], true );
// var s4 = new Samochod(4,4_000_000,2,50,[d4,d3,d2,d1],[d4,d3,d2,d1], true );
// var s5 = new Samochod(5,5_000_000,2,50,[d4],[d4,d3,d2], false );
// var s6 = new Samochod(6,6_000_000,2,50,[d4,d2],[d4,d3,d1], false );
// var s7 = new Samochod(7,2_000_000,5,100,[d2,d1],[d2,d1], true ); 
// var s8 = new Samochod(8,3_000_000,5,100,[d3,d2,d1],[d3,d2,d1], true ); 
// var s9 = new Samochod(9,4_000_000,5,100,[d4,d3,d2],[d4,d3,d2,d1], true );
// var s10 = new Samochod(10,5_000_000,5,100,[d4],[d4,d3,d2], false );
// var s11 = new Samochod(11,6_000_000,5,100,[d4,d2],[d4,d3,d1], false ); 
// var s12 = new Samochod(12,1_000_000,5,100,[d1],[d1], true );
// var s13 = new Samochod(13,1_000_000,2,50,[d1],[d1], true );

// var wypozyczalnia = new WypozczalniaJednodniowa(s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13);
// wypozyczalnia.podaj_top10_uszkadzanych();