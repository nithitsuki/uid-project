import express, { Request, Response } from 'express';
// const cors = require('cors');
import path from 'path';
import * as fs from 'fs';
const app = express();

// SCREW CORS
// app.use(cors({
//   origin: '*',
// }));

const port = 8080;
app.use(express.static(path.join(__dirname, '../public')));

interface HallInfo {
  "Capacity": number;
  "AC?": string;
  "Area": number;
}

interface BranchInfo {
  gmap_link: string;
  Halls: {
    [hallName: string]: HallInfo;
  };
}

interface Branches {
  [BranchName: string]: BranchInfo; // A dynamic key where each city maps to a City object
}

// Read and parse the JSON data from 'halls.json'
const data: Branches = JSON.parse(fs.readFileSync('./backend/halls.json', 'utf8'));

const BranchNames: string[] = Object.keys(data);

app.get('/api/Branches', (req, res) => {
  res.json(BranchNames);  // Send the cities array as JSON
});
// LIST OF HALLS IN A BRANCH
app.get('/api/Branches/:s/list_of_halls', (req,res) => {
  // Get the string index 's' from the URL parameter
  const BranchName: string = req.params.s;

  // Check if the string index is a valid city in the map
  const names_of_halls: string[] = Object.keys(data[BranchName]["Halls"]);

  if (names_of_halls === undefined) {
    res.status(400).json({ error: 'Invalid city name provided' });
    return;
  }
  res.json(names_of_halls);
});

// NAME OF FIRST HALL IN A BRANCH
app.get('/api/Branches/:s/first_hall', (req,res) => {
  // Get the string index 's' from the URL parameter
  const BranchName: string = req.params.s;
  // Check if the string index is a valid city in the map
  const names_of_halls: string = Object.keys(data[BranchName]["Halls"])[0];
  if (names_of_halls === undefined) {
    res.status(400).json({ error: 'Invalid city name provided' });
    return;
  }
  res.json(names_of_halls);
});

// GMAP LINK OF A BRANCH
app.get('/api/Branches/:s/gmap_link', (req,res) => {
  // Get the string index 's' from the URL parameter
  const BranchName: string = req.params.s;

  // Check if the string index is a valid city in the map
  const gmap_link: string = data[BranchName]["gmap_link"]

  if (gmap_link === undefined) {
    res.status(400).json({ error: 'Invalid city name provided' });
    return;
  }
  res.json(gmap_link);
});

// LIST OF PROPERTIES OF A HALL
app.get('/api/Branches/:s1/:s2/hall_info', (req,res) => {
  // Get the string index 's' from the URL parameter
  const BranchName: string = req.params.s1;
  const HallName: string = req.params.s2;

  // Check if the string index is a valid city in the map
  const hall_info: HallInfo = data[BranchName]["Halls"][HallName];

  if (hall_info === undefined) {
    res.status(400).json({ error: 'Invalid city name provided' });
    return;
  }
  res.json(hall_info);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
