import { exec } from 'child_process';
import open from 'open';

const buildProcess = exec('npm run build');

buildProcess.stdout.on('data', (data) => {
  console.log(`Build stdout: ${data}`);
});

buildProcess.stderr.on('data', (data) => {
  console.error(`Build stderr: ${data}`);
});

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Build process exited with code ${code}`);
    return;
  }

  const server = exec('npm run server', {
    env: { ...process.env, FROM_START_SCRIPT: 'true' }
  });

  server.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  server.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  server.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  });

  console.log('Server running!');
});