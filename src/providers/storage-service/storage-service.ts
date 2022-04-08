import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageServiceProvider {

  constructor(public storage: Storage) {
  }

  async save(value) {
    let getSaved = await this.getSaved();
    getSaved = getSaved ? getSaved : [];
    getSaved.push(value)
    return await this.storage.set('registers', getSaved);
  }

  async getSaved() {
    return await this.storage.get('registers');
  }

  async remove() {
    return await this.storage.remove('registers');
  }
}
