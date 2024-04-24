import {Samochod} from '../models/Samochod';
import express from 'express';
import * as FileOperations from '../models/FileOperations';

const samochodRouter = express.Router();


//create samochod
samochodRouter.post('/', async (req, res) => {
    try{
        if(req.body.numer !== null &&req.body.przebieg !== null 
            &&req.body.liczba_pasazerów !== null &&req.body.cena_za_dzien !== null )
        {    
                const samochod = new Samochod(req.body.numer, 
                                            req.body.przebieg, 
                                            req.body.liczba_pasazerów,
                                            req.body.cena_za_dzien,
                                            [],[],false)
            const filename = req.body.numer + ".json"
            const result = await FileOperations.createFile(filename, JSON.stringify(samochod));
            if (result){
            res.send("ok");
            }
            else{
                res.send("error: samochod already exists");
            }
        }
        else {
        res.send("not ok");
    }
    }
    catch(error){
        console.log(`ERROR: ${error}`)
        res.send(error);
    }
})

samochodRouter.get('/:id', async (req, res) =>{
    try{
    const id = req.params.id;
    const name: string = id + ".json"
    FileOperations.readFile(name);
    res.send("ok");
    }
    catch(error){
        console.log(`ERROR: ${error}`)
        res.send(error);
    }
})

samochodRouter.put('/wypozycz/:id', async (req, res) =>{
    try{
        const id = req.params.id;
        const name: string = id + ".json"
        
        const samochod: Samochod = await FileOperations.fromJsonToObj(name);
        if(samochod.wypozycz()){
            res.send("ok: samochod wypozyczony na jeden dzien");
            const data: string = JSON.stringify(samochod);
            await FileOperations.writeFile(name, data);
        }
        else{
            res.send("error: samochod nie moze zostac wypozyczony");
        }

        }
        catch(error){
            console.log(`ERROR: ${error}`)
            res.send(error);
        }
})

samochodRouter.put('/zwroc/:id', async (req, res) =>{
    try{
        const id = req.params.id;
        const name: string = id + ".json"
        
        const samochod: Samochod = await FileOperations.fromJsonToObj(name);
        if(samochod.zwroc()){
            res.send("ok: samochod zwrocony");
            const data: string = JSON.stringify(samochod);
            await FileOperations.writeFile(name, data);
        }
        else{
            res.send("error: samochod nie moze zostac zwrocony");
        }

        }
        catch(error){
            console.log(`ERROR: ${error}`)
            res.send(error);
        }
})
samochodRouter.put('/dodaj-uszkodzenie/:id', async (req, res) =>{
    try{
        const id = req.params.id;
        const name: string = id + ".json"
        
        const samochod: Samochod = await FileOperations.fromJsonToObj(name);
        samochod.dodaj_uszkodzenie()
        res.send("ok: dodano uszkodzenie");
        const data: string = JSON.stringify(samochod);
        await FileOperations.writeFile(name, data);

        }
        catch(error){
            console.log(`ERROR: ${error}`)
            res.send(error);
        }
})
samochodRouter.get('/info/:id', async (req, res) =>{
    try{
        const id = req.params.id;
        const name: string = id + ".json"
        
        const samochod: Samochod = await FileOperations.fromJsonToObj(name);
        var info: string = ""; 
        info += "dostepny: " + samochod.kiedy_dostepny() + "\n";
        info += "wypozyczony: " + samochod.ile_razy_wypozyczony() + " razy\n";
        info += "dostepny: " + samochod.ile_razy_uszkodzony() + "\n";
        
        res.send("ok: \n" + info);
        const data: string = JSON.stringify(samochod);
        await FileOperations.writeFile(name, data);

        }
        catch(error){
            console.log(`ERROR: ${error}`)
            res.send(error);
        }
})
samochodRouter.delete('/:id', async (req, res) =>{
    try{
    const id = req.params.id;
    const name: string = id + ".json"
    FileOperations.deleteFile(name);
    res.send("ok: deleted samochod" + id);
    }
    catch(error){
        console.log(`ERROR: ${error}`)
        res.send(error);
    }
})

export default samochodRouter;