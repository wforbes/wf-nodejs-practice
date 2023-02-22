const { spawn } = require('child_process');
//here npm.cmd for windows.for others only use npm
const workerProcess = spawn('npm.cmd', ['start']); 

  workerProcess.stdout.on('data', function (data) {  
      console.log('stdout: ' + data);  
   });  
 workerProcess.stderr.on('data', function (data) {  
      console.log('stderr: ' + data);  
   });  
 workerProcess.on('close', function (code) {  
      console.log('child process exited with code ' + code);
	  workerProcess.kill('SIGKILL')
   });  