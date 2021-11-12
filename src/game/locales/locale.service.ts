import { Injectable } from '@nestjs/common';
import { IO } from 'src/core/common/util/io/io.service';
import { Locale, LocaleCode } from './locale.types';

@Injectable()
export class LocaleService {
  readonly localeCodes: Array<LocaleCode>;
  readonly locales: Record<LocaleCode, Locale> = {};
  constructor() {
    this.localeCodes = (
      IO.deserialize(
        IO.readFileSync(IO.resolve('database', 'locales', 'languages.json')),
      ) as Array<Record<string, LocaleCode>>
    ).map((l) => l['ShortName']);

    for (const [, lv] of Object.entries(this.localeCodes)) {
      this.locales[lv] = {
        menu: IO.deserialize(
          IO.readFileSync(
            IO.resolve('database', 'locales', 'menu', `${lv}.json`),
          ),
        ),
        global: IO.deserialize(
          IO.readFileSync(
            IO.resolve('database', 'locales', 'global', `${lv}.json`),
          ),
        ),
      };
    }
  }
}
