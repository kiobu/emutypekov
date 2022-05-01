import { Path } from '../common/util/io/io.service';
import { ModsService } from './mods.service';
import { IO } from '../common/util/io/io.service';

export interface ModConfig {
  name: string;
  author: string;
  entrypoint: string;
  path: Path;
}

export class Mod {
  constructor() {
    console.log(IO.resolve(__dirname));
    //modsService.loadMod(IO.resolve(__dirname));
  }
}
