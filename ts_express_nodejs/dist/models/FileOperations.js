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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.fromJsonToWypozyczalnia = exports.fromJsonToObj = exports.writeFile = exports.readFile = exports.createFile = void 0;
const fs_1 = __importStar(require("fs"));
const path_1 = require("path");
const Samochod_1 = require("./Samochod");
const WypozczalniaJednodniowa_1 = require("./WypozczalniaJednodniowa");
const __dir = "src/data";
async function accessFile(name) {
    try {
        const filepath = (0, path_1.join)(__dir, name);
        const result = await fs_1.promises.access(filepath, fs_1.default.constants.F_OK);
        return true;
    }
    catch (e) {
        return false;
    }
}
async function createFile(name, data) {
    const filepath = (0, path_1.join)(__dir, name);
    const result = await accessFile(name);
    console.log("result: " + result);
    if (!result) {
        await fs_1.promises.writeFile(filepath, data, {
            flag: 'w',
        });
        console.log(`created file: ${filepath} with data: ${data}`);
        return true;
    }
    return false;
}
exports.createFile = createFile;
async function readFile(name) {
    const filepath = (0, path_1.join)(__dir, name);
    await accessFile(name);
    const result = await fs_1.promises.readFile(filepath);
    console.log(`read file: ${name} with data: ${result}`);
    return result;
}
exports.readFile = readFile;
async function writeFile(name, data) {
    const filepath = (0, path_1.join)(__dir, name);
    await accessFile(name);
    await fs_1.promises.writeFile((0, path_1.join)(__dir, name), data, {
        flag: 'w',
    });
    console.log(`created file: ${(0, path_1.join)(__dir, name)} with data: ${data}`);
}
exports.writeFile = writeFile;
async function fromJsonToObj(name) {
    await accessFile(name);
    const buffer = await readFile(name);
    const samochodFromJSON = JSON.parse(buffer.toString());
    const samochod = new Samochod_1.Samochod(samochodFromJSON.numer, samochodFromJSON.przebieg, samochodFromJSON.liczba_pasazerów, samochodFromJSON.cena_za_dzien, samochodFromJSON.lista_uszkodzen, samochodFromJSON.lista_wypozyczen, samochodFromJSON.wypozyczony);
    return samochod;
}
exports.fromJsonToObj = fromJsonToObj;
async function fromJsonToWypozyczalnia() {
    var tab = [];
    try {
        // const wypozyczalnia: WypozczalniaJednodniowa
        const files = await fs_1.promises.readdir(__dir);
        for (const file of files) {
            tab.push(await fromJsonToObj(file));
        }
        return new WypozczalniaJednodniowa_1.WypozczalniaJednodniowa(tab);
    }
    catch (err) {
        console.error(err);
        return new WypozczalniaJednodniowa_1.WypozczalniaJednodniowa(tab);
    }
}
exports.fromJsonToWypozyczalnia = fromJsonToWypozyczalnia;
async function deleteFile(name) {
    const filepath = (0, path_1.join)(__dir, name);
    await accessFile(name);
    fs_1.default.rm(filepath, (error) => { });
}
exports.deleteFile = deleteFile;
// export default {createFile, readFile};
