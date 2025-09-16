const fs = require('fs').promises;
// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   if (err) console.log(`Error in reading the file`);
//   else console.log(data);

//   //Callback Hell
//   fetch(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => res.json())
//     .then((data) => {
//       fs.writeFile("dog-img.txt", data.message, (error) => {
//         if (error) {
//           console.log("Error in writing thee");
//         } else {
//           console.log("File Wrote Sucessfully...");
//         }
//       });
//     });

///////////////////////////////////////
// Async Await  consuming promise with Async Await

async function getData() {
  try {
    // 1. Read breed from file
    const breed = await fs.readFile('./dog.txt', 'utf-8');
    console.log('Breed:', breed);

    // 2. Fetch image
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await res.json();
    console.log('Dog image:', data.message);

    // 3. Write to file
    await fs.writeFile('dog-img.txt', data.message);
    console.log('Random dog image saved to dog-img.txt ✅');
  } catch (error) {
    console.error('Something went wrong:', error.message);
    throw new Error('Failed to get data.');
  }
}

getData();
