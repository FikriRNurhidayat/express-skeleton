let fs = require('fs');

// Read Current Directory
let directory = fs.readdirSync(__dirname)
let folders = []

// Filter folder only 
directory.forEach(i => {
  if (i.indexOf('.') == -1) {
    folders.push(i);
  }
})

directory = {}
// Read all file in each folder
folders.forEach(folder => {
  directory[folder] = fs.readdirSync(`${__dirname}/${folder}`)
  directory[folder] = directory[folder].filter(file => {
    return file.indexOf('.swp') < 0
  })
  directory[folder] = directory[folder].map(file => require(`./${folder}/${file}`))
})

module.exports = directory;
