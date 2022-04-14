import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageServiceProvider {
  private registersString = 'registers';

  constructor(public storage: Storage) {
  }
  
  async getSaved() {
    let savedProducts = await this.storage.get(this.registersString) || [];
    if(savedProducts) {
      return savedProducts;
    }
  }

  async save(value) {
    let getSaved = await this.getSaved();
    getSaved = getSaved ? getSaved : [];
    getSaved.push(value);
    return await this.storage.set(this.registersString, getSaved);
  }

  async removeItem(productToBeDeleted) {
    let savedItem = await this.getSaved();
    let index = savedItem.findIndex(product => product.id === productToBeDeleted.id);
    savedItem.splice(index, 1);
    return await this.storage.set(this.registersString, savedItem);
  }

  async updateItem(itemToBeUpdate) {
    let savedItem = await this.getSaved();
    let index = savedItem.findIndex(product => product.id === itemToBeUpdate.id);
    savedItem.splice(index, 1, itemToBeUpdate);
    return await this.storage.set(this.registersString, savedItem);
  }
}
