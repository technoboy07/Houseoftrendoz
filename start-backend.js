const { spawn } = require('child_process');
const path = require('path');

// Start the backend server
const backendPath = path.join(__dirname, 'houseoftrendoz-backend');
const backendProcess = spawn('npm', ['run', 'dev'], {
  cwd: backendPath,
  stdio: 'inherit',
  shell: true
});

console.log('🚀 Starting backend server...');
console.log('📁 Backend directory:', backendPath);

backendProcess.on('error', (error) => {
  console.error('❌ Failed to start backend:', error);
});

backendProcess.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down backend server...');
  backendProcess.kill('SIGINT');
  process.exit(0);
});
