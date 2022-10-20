const fs = require('fs');
const child_process = require('child_process');
const yaml = require('js-yaml');


let cmd = process.argv[2];
let arg = process.argv[3];

let DEBUG = false;
if(process.env.DEBUG === '1') {
  DEBUG = true;
}

if(DEBUG) {
  console.log(__dirname);
  console.log(process.argv); 
}

let result = null;
let dir = '';
let projectPath = process.env.CI_PROJECT_DIR;
let rootPath = '/tmp/ramdisk/stuff/project';

if(projectPath) {
  function job() {
    let filename = projectPath + '/content.config.yml';
    let dir = '';
    let content = null;
    
    if(fs.existsSync(filename)){
      content = yaml.load(fs.readFileSync(filename, 'utf8'));
      
      dir += rootPath;
      if(content.group){
        dir += '/' + content.group;
      }

      if(content.name){
        dir += '/' + content.name;
      }
      let r = null;
      
      r = child_process.spawnSync('mkdir', ['-p', dir], {
        cwd: projectPath,
        shell: true,
        stdio: DEBUG ? 'inherit' : null
      });

      r = child_process.spawnSync('sh', ['/tmp/ramdisk/stuff/tools/check.sh', dir], {
        cwd: projectPath,
        shell: true,
        stdio: DEBUG ? 'inherit' : null
      });
      
      r = child_process.spawnSync('touch', [dir + '/deploy.lock'], {
        cwd: projectPath,
        shell: true,
        stdio: DEBUG ? 'inherit' : null
      });

      r = child_process.spawnSync('cp', ['-R', projectPath + '/*', dir], {
        cwd: projectPath,
        shell: true,
        stdio: DEBUG ? 'inherit' : null
      });
    } else {
      let r = null;

      dir += '/stuff';
      r = child_process.spawnSync('sh', ['/tmp/ramdisk/stuff/tools/check.sh', dir], {
        cwd: projectPath,
        shell: true,
        stdio: DEBUG ? 'inherit' : null
      });
      
      r = child_process.spawnSync('touch', [dir + '/deploy.lock'], {
        cwd: projectPath,
        shell: true,
        stdio: DEBUG ? 'inherit' : null
      });

      r = child_process.spawnSync('cp', ['-R', 'builder', dir], {
        cwd: projectPath,
        shell: true,
        stdio: DEBUG ? 'inherit' : null
      });
      
      r = child_process.spawnSync('cp', ['-R', 'dependence', dir], {
        cwd: projectPath,
        shell: true,
        stdio: DEBUG ? 'inherit' : null
      });
      
      r = child_process.spawnSync('cp', ['-R', 'systemjs', dir], {
        cwd: projectPath,
        shell: true,
        stdio: DEBUG ? 'inherit' : null
      });
    }

    if(cmd) {
      result = child_process.spawnSync(cmd, [arg], {
        cwd: dir,
        shell: true,
        stdio: DEBUG ? 'inherit' : null
      });
    }

    // unlock
    child_process.spawnSync('rm', [dir + '/deploy.lock'], {
      cwd: projectPath,
      shell: true,
      stdio: DEBUG ? 'inherit' : null
    });

    // release
    if(content) {
      let r = child_process.spawnSync('rm', ['-rf', dir], {
        cwd: dir,
        shell: true,
        stdio: DEBUG ? 'inherit' : null
      });

      if(!result || (result.code === 0) ) {
        result = r;
      }
    }

  }

  function check(){
    if(fs.existsSync(projectPath + '/.timestamp')){
      setTimeout(check, 5000);
    } else {
      job();
    }
  }
  check();

} else {
  console.log(filename + ' error');
  process.exit(1);
}

if(result){
  process.exit(result.status);
} else {
  process.exit(0);
}
