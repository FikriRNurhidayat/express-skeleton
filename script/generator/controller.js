require('../../lib/string.js');
const color = require('colors');
const fs = require('fs');
var input = process.argv.slice(2);
var yargs = require('yargs');

const argv = yargs
  .option('namespace', {
    alias: 'n',
    description: 'To define your endpoint',
    type: 'string'
  })
  .help()
  .alias('help','h')
  .argv

if (argv._ != []) {
  let name = argv._[0];
  if (!name) {
    console.log("  error".red,"You need to pass controller name".toUpperCase());
    console.log("\n")
    return console.log("  " + "example", "npm run generate:controller".blue + " " + "this_is_controller".red)
  } else {
    let space = name.split("_")
    name = space[0]
    space = space.slice(1);
    name = name.decapitalize();
    space = space.map(i => i.capitalize());
    space.forEach(i => {
      name += i
    });
  }

  let resource = argv._.slice(1);
  let namespace = argv.namespace || '';
  
  if (namespace != "") {
    let controllerFolder = fs.readdirSync('./src/controllers/')
    if (controllerFolder.indexOf(namespace) == -1) {
      fs.mkdirSync('./src/controllers/' + namespace)
    }
  }

  let file =`./src/controllers/${namespace == "" ? "v1/" : namespace + "/"}${name.decapitalize()}Controller.js`
  if (fs.existsSync(file)) return console.log(' exist'.blue, `${file}`, "\n\n File already exist!".yellow, "\n Can't overwrite the file!\n".red)
  
  fs.writeFileSync(file, "var resources = [", 'utf-8')
  let resources = []
  
  resource.forEach(i => {
    if (i.indexOf(':') == -1) {
      console.log("Cannot create ".yellow + `${i}`.red);
      return process.exit(0)
    }
    i = i.split(":");
    let rName = i[0];
    let rMethod = i[1];
    
    if (['post','get','put','delete'].indexOf(rMethod) == -1) {
      console.log("Unexpected method ".yellow  + `${rMethod}`.red + " for ".yellow + `${rName}`.blue )
      return process.exit(0)
    }

    resources.push({
      method: rMethod.toUpperCase(),
      path: '/' + (rName == "" ? '' : rName)
    })
  })

  for (let i = 0; i < resources.length; i++) {
    let data = [
      "\n",
      "  {\n",
      `    method: "${resources[i].method}",\n`,
      `    path: "${resources[i].path}",\n`,
      `    handler: function(req, res, next) {\n`,
      `      req.body = [true, "This will be your response object", 200]\n`,
      `      next()\n`,
      `    }\n`,
      `  }` + (i == (resources.length - 1) ? "" : ",")
    ].join("")

    fs.appendFileSync(file, data, 'utf8');
  }
  
  // Append closed square bracket
  fs.appendFileSync(file, "\n]", 'utf8');
  // Append export code
  let exportCode = [
    "\n\n",
    `module.exports = {\n`,
    `  namespace: "/${name.toLowerCase()}",\n`,
    `  resources\n`,
    `}`
  ].join("")

  fs.appendFileSync(file, exportCode, 'utf8')

  console.log(" create".green, file, "\n\n")

}
