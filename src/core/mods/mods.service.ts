import { Injectable, Logger } from '@nestjs/common';
import { Mod, ModConfig } from './mod.types';
import { IO, Path } from '../common/util/io/io.service';
import * as yaml from 'js-yaml';

@Injectable()
export class ModsService {
  private readonly mods: Array<ModConfig> = [];
  private readonly logger: Logger = new Logger(ModsService.name);

  constructor() {}

  loadMod(path: Path) {
    IO.readDirSync('mods').forEach((mod) => {
      let config: ModConfig;
      try {
        const _config = yaml.load(
          IO.readFileSync(IO.resolve('mods', mod, 'mod.yaml')),
        ).mod;
        _config.path = IO.resolve('mods', mod);
        config = _config;
      } catch (e) {
        return this.logger.error(
          `There was an issue loading a mod's configuration file. Stack trace:\n${e.stack}`,
        );
      }
      this.mods.push(config);
    });
    this.executeMods();
  }

  executeMods() {
    this.mods.forEach((mod: ModConfig) => {
      try {
        const script = require(IO.resolve(mod.path as string, mod.entrypoint));
        try {
          script.exports.forEach((ex) => {
            if (ex.prototype instanceof Mod) {
              new ex();
            }
          })
        } catch (e) {
          this.logger.error(`Could not execute mod. Stack:\n${e.stack}`);
        }
      } catch (e) {
        this.logger.error(`Could not load mod from path. Stack:\n${e.stack}`);
      }
    })
  }
}
