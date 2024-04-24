import fs, { promises as fsPromises } from 'fs';
import { join } from 'path';
import { Samochod } from './Samochod';
import { WypozczalniaJednodniowa } from './WypozczalniaJednodniowa';

const __dir: string = "src/data";

async function accessFile(name:string) {
    try{
        const filepath: string = join(__dir, name);
        const result = await fsPromises.access(filepath, fs.constants.F_OK);
        return true;
    }
    catch(e){
        return false;
    }
}
export async function createFile(name: string, data: string){
    const filepath: string = join(__dir, name);
    const result = await accessFile(name);
    console.log("result: "+ result);
    if(!result){
        await fsPromises.writeFile(filepath, data, {
            flag: 'w',
            });
        console.log(`created file: ${filepath} with data: ${data}`);
        return true;
    }
    return false;
}

export async function readFile(name: string): Promise<Buffer>{
    const filepath: string = join(__dir, name);
    await accessFile(name)
    const result = await fsPromises.readFile(filepath);
    console.log(`read file: ${name} with data: ${result}`);
    return result;
}  

export async function writeFile(name: string, data: string){
    const filepath: string = join(__dir, name);
    await accessFile(name)
    await fsPromises.writeFile(join(__dir, name), data, {
        flag: 'w',
        });
    console.log(`created file: ${join(__dir, name)} with data: ${data}`);
}   

export async function fromJsonToObj(name:string): Promise<Samochod> {
    await accessFile(name);
    const buffer = await readFile(name);
        const samochodFromJSON = JSON.parse(buffer.toString());
        const samochod = new Samochod(samochodFromJSON.numer, 
            samochodFromJSON.przebieg, 
            samochodFromJSON.liczba_pasazerów,
            samochodFromJSON.cena_za_dzien,
            samochodFromJSON.lista_uszkodzen,
            samochodFromJSON.lista_wypozyczen,
            samochodFromJSON.wypozyczony,
            )
    return samochod; 
}
export async function fromJsonToWypozyczalnia(): Promise<WypozczalniaJednodniowa> {
    var tab: Samochod[] = [];
    try {
        // const wypozyczalnia: WypozczalniaJednodniowa
        const files = await fsPromises.readdir(__dir);
        for (const file of files){
            tab.push(await fromJsonToObj(file));
        }
        return new WypozczalniaJednodniowa(tab);
      } 
      catch (err) {
        console.error(err);
        return new WypozczalniaJednodniowa(tab);
      } 
}
export async function deleteFile(name:string) {
    const filepath: string = join(__dir, name);
    await accessFile(name);
    fs.rm(filepath, (error) => {});

}

// export default {createFile, readFile};