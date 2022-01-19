import { readdir, readFile } from 'fs/promises';
import { createClient } from 'redis';

async function spiderFolder(folderPath, redisClient) {
  const dirEntries = await readdir(folderPath, {
    withFileTypes: true
  });
  
  for (const dirEntry of dirEntries) {
    if (dirEntry.isDirectory()) {
      await spiderFolder(`${folderPath}/${dirEntry.name}`, redisClient);
    } else if (dirEntry.isFile()) {
      const filePath = `${folderPath}/${dirEntry.name}`;
      const fileContents = await readFile(filePath);
      await redisClient.json.set(`file:${filePath}`, '$', JSON.parse(fileContents));
      console.log(filePath);
      console.log(fileContents.toString());
    }
  }
};

async function runApplication() {
  try {
    const client = createClient();
    await client.connect(); // localhost:6379

    await spiderFolder('data', client);
    
    await client.disconnect();
  } catch (e) {
    console.error(e);
  }
};

runApplication();
