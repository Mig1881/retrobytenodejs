const yaml = require('js-yaml');
const fs = require('fs');
//
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Lee el fichero de configuración, por defecto es el de produccion aunque podria ser al reves
let configFile = 'config.prod.yaml';
// con la siguiente linea posibilito pasarle argumentos a los comandos node ya sabes con --
const argv = yargs(hideBin(process.argv)).argv;
//si en esos argumentos me han pasado una opcion de config...
if (argv.config != undefined) {
    //si me la han pasado en argumentos, coge esta opcion, sino no hagas nada
    configFile = argv.config;
}
// en el package.json hay una linea en los scripts..
// "start-dev": "node src/app.js --config config.local.yaml"
// este --config son los argumentos que le paso para que coga la bd local

const config = yaml.load(fs.readFileSync(configFile, 'utf-8'));

module.exports = {
    config
};