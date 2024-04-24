"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Samochod_1 = require("../models/Samochod");
const express_1 = __importDefault(require("express"));
const FileOperations = __importStar(require("../models/FileOperations"));
const samochodRouter = express_1.default.Router();
//create samochod
samochodRouter.post('/', async (req, res) => {
    try {
        if (req.body.numer !== null && req.body.przebieg !== null
            && req.body.liczba_pasazerów !== null && req.body.cena_za_dzien !== null) {
            const samochod = new Samochod_1.Samochod(req.body.numer, req.body.przebieg, req.body.liczba_pasazerów, req.body.cena_za_dzien, [], [], false);
            const filename = req.body.numer + ".json";
            const result = await FileOperations.createFile(filename, JSON.stringify(samochod));
            if (result) {
                res.send("ok");
            }
            else {
                res.send("error: samochod already exists");
            }
        }
        else {
            res.send("not ok");
        }
    }
    catch (error) {
        console.log(`ERROR: ${error}`);
        res.send(error);
    }
});
samochodRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const name = id + ".json";
        FileOperations.readFile(name);
        res.send("ok");
    }
    catch (error) {
        console.log(`ERROR: ${error}`);
        res.send(error);
    }
});
samochodRouter.put('/wypozycz/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const name = id + ".json";
        const samochod = await FileOperations.fromJsonToObj(name);
        if (samochod.wypozycz()) {
            res.send("ok: samochod wypozyczony na jeden dzien");
            const data = JSON.stringify(samochod);
            await FileOperations.writeFile(name, data);
        }
        else {
            res.send("error: samochod nie moze zostac wypozyczony");
        }
    }
    catch (error) {
        console.log(`ERROR: ${error}`);
        res.send(error);
    }
});
samochodRouter.put('/zwroc/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const name = id + ".json";
        const samochod = await FileOperations.fromJsonToObj(name);
        if (samochod.zwroc()) {
            res.send("ok: samochod zwrocony");
            const data = JSON.stringify(samochod);
            await FileOperations.writeFile(name, data);
        }
        else {
            res.send("error: samochod nie moze zostac zwrocony");
        }
    }
    catch (error) {
        console.log(`ERROR: ${error}`);
        res.send(error);
    }
});
samochodRouter.put('/dodaj-uszkodzenie/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const name = id + ".json";
        const samochod = await FileOperations.fromJsonToObj(name);
        samochod.dodaj_uszkodzenie();
        res.send("ok: dodano uszkodzenie");
        const data = JSON.stringify(samochod);
        await FileOperations.writeFile(name, data);
    }
    catch (error) {
        console.log(`ERROR: ${error}`);
        res.send(error);
    }
});
samochodRouter.get('/info/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const name = id + ".json";
        const samochod = await FileOperations.fromJsonToObj(name);
        var info = "";
        info += "dostepny: " + samochod.kiedy_dostepny() + "\n";
        info += "wypozyczony: " + samochod.ile_razy_wypozyczony() + " razy\n";
        info += "dostepny: " + samochod.ile_razy_uszkodzony() + "\n";
        res.send("ok: \n" + info);
        const data = JSON.stringify(samochod);
        await FileOperations.writeFile(name, data);
    }
    catch (error) {
        console.log(`ERROR: ${error}`);
        res.send(error);
    }
});
samochodRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const name = id + ".json";
        FileOperations.deleteFile(name);
        res.send("ok: deleted samochod" + id);
    }
    catch (error) {
        console.log(`ERROR: ${error}`);
        res.send(error);
    }
});
exports.default = samochodRouter;
