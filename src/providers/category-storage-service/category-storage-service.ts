import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';
import { ICategory } from '../../interfaces/ICategory';


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
    let getCategory = await this.getCategories();
    if (getCategory.length === 0) {
      for (let index = 0; index < initialCategoriesName.length; index++) {
        const categoryName = initialCategoriesName[index];
        getCategory.push({name: categoryName, id: uuidv4()});
      }
    }
    await this.storage.set(this.categoriesString, getCategory); //não precisa
  }
  
  async saveCategory(category: ICategory) {
    let getCategory = await this.getCategories();
    getCategory.push({name: category.name, id: uuidv4()});
    await this.storage.set(this.categoriesString, getCategory); //não precisa
  }

  async getCategories(): Promise<ICategory[]> {
    let savedCategories: ICategory[] = await this.storage.get(this.categoriesString) || [];
    if(savedCategories) {
      return savedCategories;
    }
  }

  async updateCategory(categoryToBeUpdate: ICategory) {
    let getCategory = await this.getCategories();
    let index = getCategory.findIndex(category => category.id === categoryToBeUpdate.id);
    getCategory.splice(index, 1, categoryToBeUpdate);
    await this.storage.set(this.categoriesString, getCategory); //não precisa
  }

  async removeCategory(categoryToBeRemoved: ICategory) {
    let getCategory = await this.getCategories();
    let index = getCategory.findIndex(product => product.id === categoryToBeRemoved.id);
    getCategory.splice(index, 1);
    await this.storage.set(this.categoriesString, getCategory); //não precisa
  }

}
