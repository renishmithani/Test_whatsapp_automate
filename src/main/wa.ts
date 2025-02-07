import { dialog } from 'electron';
import { Client, LocalAuth } from 'whatsapp-web.js';
const qrcode = require('qrcode-terminal');

console.log('Whatsapp -web a..');

const client = new Client({
  restartOnAuthFail: true,
  authStrategy: new LocalAuth({
    clientId: 'client-one',
  }),
  puppeteer: {
    headless: true,
  },
});

console.log('Start initializing ...');
client
  .initialize()
  .then(() => {
    console.log('Initialize success ');
    dialog.showErrorBox('Init', 'Success');
  })
  .catch((err) => {
    console.log(err);
    dialog.showErrorBox('Init', `${err} Failed`);
  });

client.on('qr', (qr) => {
  // Generate and log QR code to the terminal
  dialog.showErrorBox('QR', 'Success');
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session) => {
  console.log('WHATSAPP WEB => Authenticated');
});

client.on('auth_failure', (session) => {});

client.on('ready', async () => {
  console.log('Client is ready!');
});

client.on('change_state', (state) => {});

client.on('disconnected', async (state) => {});
