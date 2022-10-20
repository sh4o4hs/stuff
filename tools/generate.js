const fs = require('fs');
const yaml = require('js-yaml');

let rootPath = '/tmp/ramdisk/stuff/project';


let filename ='content.config.yml';
let dir = '';

if(fs.existsSync(filename)) {
  let content = yaml.load(fs.readFileSync(filename, 'utf8'));
  
  if(content.group) {
    dir += content.group + '/';
    console.log('export STUFF_GROUP='+content.group);
  }

  if(content.name) {
    dir += content.name;
    console.log('export STUFF_NAME='+content.name);
  }
}
if(dir) {
  console.log('export STUFF_WORKSPACE=' + dir);
}
