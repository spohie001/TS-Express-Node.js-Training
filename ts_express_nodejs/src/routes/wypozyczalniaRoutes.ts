import {Samochod} from '../models/Samochod';
import {WypozczalniaJednodniowa} from '../models/WypozczalniaJednodniowa';
import express from 'express';
import * as FileOperations from '../models/FileOperations';

const wypozyczalniaRouter = express.Router();

wypozyczalniaRouter.get('/podaj-wypozyczone', async (req, res) =>{
    try{
        const wypozyczalnia = await FileOperations.fromJsonToWypozyczalnia();
        const info = wypozyczalnia.podaj_wypozyczone();
        res.send("ok: " + info);
    }
    catch(error){
        console.log(`ERROR: ${error}`)
        res.send(error);
    }
})
wypozyczalniaRouter.get('/podaj-dostepne', async (req, res) =>{
    try{
        const day = new Date().toDateString();
        const wypozyczalnia = await FileOperations.fromJsonToWypozyczalnia();
        const info = wypozyczalnia.podaj_dostepne(day);
        res.send("ok: " + info);
    res.send("ok");
    }
    catch(error){
        console.log(`ERROR: ${error}`)
        res.send(error);
    }
})
wypozyczalniaRouter.get('/podaj-top10-wypozyczanych', async (req, res) =>{
    try{
        const wypozyczalnia = await FileOperations.fromJsonToWypozyczalnia();
        const lista = wypozyczalnia.podaj_top10_wypozyczanych();
        var info: string = "";
        var ctr: number = 1;
        lista.forEach((s)=> {
            info += ctr + ".miejsce zajmuje samochod nr."+ s.getNumer() + "\n";
            ctr++;
        })
    res.send("ok:\n" + info);
    }
    catch(error){
        console.log(`ERROR: ${error}`)
        res.send(error);
    }
})
wypozyczalniaRouter.get('/podaj-top10-uszkadzanych', async (req, res) =>{
    try{
        const wypozyczalnia = await FileOperations.fromJsonToWypozyczalnia();
        const lista = wypozyczalnia.podaj_top10_uszkadzanych();
        var info: string = "";
        var ctr: number = 1;
        lista.forEach((s)=> {
            info += ctr + ".miejsce zajmuje samochod nr."+ s.getNumer() + "\n";
            ctr++;
        })
    res.send("ok:\n" + info);
    }
    catch(error){
        console.log(`ERROR: ${error}`)
        res.send(error);
    }
})

export default wypozyczalniaRouter;