import express, { Request, Response } from 'express';
const cors = require('cors');
import * as fs from 'fs';
// import path from 'path';
const app = express();
app.use(cors());
const port = 3000;

interface HallInfo {
  Capacity: number;
  "Air Conditioning": string;
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
const data: Branches = JSON.parse(fs.readFileSync('./halls.json', 'utf8'));

const BranchNames: string[] = Object.keys(data);

app.get('/api/Branches', (req, res) => {
  res.json(BranchNames);  // Send the cities array as JSON
});

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
