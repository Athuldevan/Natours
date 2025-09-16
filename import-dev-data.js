const fs = require('node:fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./models/tourModal');

dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('connected sucessfully to the db'));

//READ JSON FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'),
);

//import data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data succesfullt loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//DELETE ALL DATAD FROM COLLECTION
const deleteData = async () => {
  try {
    await Tour.deleteMany();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
