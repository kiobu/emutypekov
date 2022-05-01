import { Mod } from 'src/core/mods/mod.types';

export class MyMod extends Mod {
  constructor() {
    super();
    console.log('Hello world.');
  }
}
