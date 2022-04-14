import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class CategoryStorageServiceProvider {
  private categoriesString = 'category';

  constructor(public storage: Storage) {
  }

  // async initData(initialCategory) {
  //   let getCategory = await this.getCategory();
  //   let vazio = getCategory.length === 0 ? true : false;
  //   if(vazio) {
  //     this.saveCategory(initialCategory);
  //   }
  // }

  async initData(initialCategoriesName: string[]) {
    let getCategory = await this.getCategory();
    if (getCategory.length === 0) {
      for (let index = 0; index < initialCategoriesName.length; index++) {
        const categoryName = initialCategoriesName[index];
        getCategory.push({name: categoryName, id: uuidv4()});
      }
    }
    return await this.storage.set(this.categoriesString, getCategory);
  }
  
  async saveCategory(category) {
    let getCategory = await this.getCategory();
    getCategory.push({name: category.name, id: uuidv4()});
    return await this.storage.set(this.categoriesString, getCategory);
  }

  async getCategory() {
    return await this.storage.get(this.categoriesString) || [];
  }

  async updateCategory(categoryToBeUpdate) {
    let getCategory = await this.getCategory();
    let index = getCategory.findIndex(category => category.id === categoryToBeUpdate.id);
    getCategory.splice(index, 1, categoryToBeUpdate);
    return await this.storage.set(this.categoriesString, getCategory);
  }

  async removeCategory(categoryToBeRemoved) {
    let getCategory = await this.getCategory();
    let index = getCategory.findIndex(product => product.id === categoryToBeRemoved.id);
    getCategory.splice(index, 1);
    return await this.storage.set(this.categoriesString, getCategory);
  }

}
