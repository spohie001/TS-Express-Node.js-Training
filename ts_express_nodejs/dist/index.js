"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const samochodRoutes_1 = __importDefault(require("./routes/samochodRoutes"));
const wypozyczalniaRoutes_1 = __importDefault(require("./routes/wypozyczalniaRoutes"));
const app = (0, express_1.default)();
const add = (a, b) => a + b;
app.use(express_1.default.json());
app.use('/samochod', samochodRoutes_1.default);
app.use('/wypozyczalnia', wypozyczalniaRoutes_1.default);
app.get('/', (req, res, next) => {
    res.json({
        message: 'hi!'
    });
});
app.listen(5000, () => console.log('Server running'));
