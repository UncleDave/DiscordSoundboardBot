import { createReadStream } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { FilesService } from '../projects/sounds/src/files-service';

const soundsDirectory = 'projects/bot/sounds';

(async function run() {
  const files = await fs.readdir(soundsDirectory);
  // eslint-disable-next-line max-len
  const filesService = new FilesService('DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://localhost:10000/devstoreaccount1;');

  await Promise.all(files.map(fileName => filesService.saveFile(fileName, createReadStream(path.join(soundsDirectory, fileName)))));
}());
