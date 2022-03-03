import childProcess from "child_process";
const textToImage = require('text-to-image');
const	spawnPromise = function (command: string, argsarray: string[], envOptions?: childProcess.SpawnOptions) {
  return new Promise<string | Buffer>((resolve, reject) => {
    
    const childProc = childProcess.spawn(command, argsarray, envOptions || {env: process.env, cwd: process.cwd()});
    const resultBuffers: Uint8Array[] = [];

    childProc.stdout?.on('data', buffer => resultBuffers.push(buffer));
    
    childProc.on('exit', (code, signal) => {
      if (code || signal) {
        reject(`${command} failed with ${code || signal}`);
      } else {
        resolve(Buffer.concat(resultBuffers).toString().trim());
      }
    });
  });
	};

const generateImg = async (message: string) => {
  const imageBase64 = await textToImage.generate(message);
  const cleanStr = imageBase64.replace('data:image/png;base64,','');

  return Buffer.from(cleanStr, 'base64');
};

export default generateImg;