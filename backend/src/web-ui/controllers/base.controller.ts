import { FileResultDto } from '@src/application';
import { StreamableFile, Type } from '@nestjs/common';
import { Readable } from 'stream';

export abstract class BaseController {
  protected toStreamableFile({
    fileStream,
    fileSize,
    mimetype,
    filename,
  }: FileResultDto) {
    return new StreamableFile(fileStream as Readable, {
      disposition: `attachment; filename=${encodeURI(filename)}`,
      length: fileSize,
      type: mimetype,
    });
  }
}
