"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Samochod_1 = require("../models/Samochod");
const express_1 = __importDefault(require("express"));
const FileOperations_1 = __importDefault(require("../models/FileOperations"));
const createSamochodRouter = express_1.default.Router();
createSamochodRouter.post('/', async (req, res) => {
    try {
        if (req.body.numer !== null && req.body.przebieg !== null
            && req.body.liczba_pasazerów !== null && req.body.cena_za_dzien !== null) {
            const samochod = new Samochod_1.Samochod(req.body.numer, req.body.przebieg, req.body.liczba_pasazerów, req.body.cena_za_dzien, [], [], false);
            const filename = req.body.numer + ".js";
            (0, FileOperations_1.default)(filename, JSON.stringify(samochod));
            const samochodfromjson = console.log("all ok: " + JSON.stringify(samochod));
            res.send("ok");
        }
        else {
            res.send("not ok");
        }
    }
    catch (error) {
        console.log(`ERROR: ${error}`);
        res.send("error");
    }
});
exports.default = createSamochodRouter;
