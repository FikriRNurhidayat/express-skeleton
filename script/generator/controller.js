require('../../lib/string.js');
const color = require('colors');
const fs = require('fs');
var input = process.argv.slice(2);

if (input[0] == 'h' || input[0] == 'help' || input[0] == undefined) {
  console.log("If you want to generate controller, run this command below:")
  console.log("  npm run generate:controller ".yellow + "Namespace:ControllerName".red)
  console.log("  npm run generate:controller ".yellow + "Namespace:ControllerName ".red + "create update delete ".blue + "--namespace=v1".green)
} else {
  var namespace = input[0].split(":")[0].toLowerCase() || "v1"
  var name = input[0].split(":")[1];
  var rest = input.slice(1);

  let file =`./src/controllers/${namespace}/${name.decapitalize()}Controller.js`
  if (fs.existsSync(file)) return console.log(' exist'.blue, `${file}`, "\n\n File already exist!".yellow, "\n Can't overwrite the file!\n".red)

  resource = rest.filter(i => (i.indexOf('-') == -1) || (i.indexOf('--') == -1))
  let resources = []

  fs.writeFileSync(file, "var resources = [", 'utf-8')

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
