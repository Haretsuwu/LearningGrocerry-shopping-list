import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IRecords } from '../../interfaces/IRecords';


@Injectable()
export class StorageServiceProvider {
  private registersString = 'registers';

  constructor(public storage: Storage) {
  }
  
  async getSaved(): Promise<IRecords[]> {
    let savedProducts: IRecords[] = await this.storage.get(this.registersString) || [];
    if(savedProducts) {
      console.log(savedProducts);
      return savedProducts;
    }
  }

  async save(value: IRecords): Promise<void> {
    let getSaved: IRecords[] = await this.getSaved();
    getSaved = getSaved ? getSaved : [];
    getSaved.push(value);
    await this.storage.set(this.registersString, getSaved); //não precisa
  }

  async removeItem(productToBeDeleted): Promise<void> {
    let savedItem: IRecords[] = await this.getSaved();
    let index = savedItem.findIndex(product => product.id === productToBeDeleted.id);
    savedItem.splice(index, 1);
    await this.storage.set(this.registersString, savedItem); //não precisa
  }

  async updateItem(itemToBeUpdate): Promise<void> {
    let savedItem: IRecords[] = await this.getSaved();
    let index = savedItem.findIndex(product => product.id === itemToBeUpdate.id);
    savedItem.splice(index, 1, itemToBeUpdate);
    await this.storage.set(this.registersString, savedItem); //não precisa
  }
}
