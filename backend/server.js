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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { json } from 'express/lib/response';
const fs = __importStar(require("fs"));
// import path from 'path';
const app = (0, express_1.default)();
const port = 3000;
// Read and parse the JSON data from 'halls.json'
const data = JSON.parse(fs.readFileSync('../halls.json', 'utf8'));
const BranchNames = Object.keys(data);
app.get('/api/Branches', (req, res) => {
    res.json(BranchNames); // Send the cities array as JSON
});
app.get('/api/Branches/:s', (req, res) => {
    // Get the string index 's' from the URL parameter
    const BranchName = a.params.s;
    // Check if the string index is a valid city in the map
    const index = data[BranchName];
    if (index === undefined) {
        return res.status(400).json({ error: 'Invalid city name provided' });
    }
    res.json({ index });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
