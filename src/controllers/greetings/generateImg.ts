// eslint-disable-next-line @typescript-eslint/no-var-requires
const gm = require('gm').subClass({ imageMagick: true });

const generateImg = async (message: string) => {
  return new Promise<Buffer>((resolve, reject) => {
    gm(450, 70, '#fff')
    .drawText(10, 30, message)
    .toBuffer('PNG', (error: unknown, buffer: Buffer) => {
      error ? reject(error) : resolve(buffer);
    });
  });
};

export default generateImg;