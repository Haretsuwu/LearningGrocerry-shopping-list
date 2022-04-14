import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryStorageServiceProvider } from '../../providers/category-storage-service/category-storage-service';


@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  public categories: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public categoryStorage: CategoryStorageServiceProvider
    ) {}

  ionViewDidEnter() {
    this.getCategories();
  }

  async getCategories() {
    this.categories = await this.categoryStorage.getCategory();
  }

  // getCategories() {
  //   this.categoryStorage.getCategory().then(productsFromStorage => {
  //     if (productsFromStorage) {
  //       this.categories = productsFromStorage;
  //     } else {
  //       return false;
  //     }
  //   });
  // }

  create() {
    const prompt = this.alertCtrl.create({
      title: 'Nova Categoria',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nome da categoria'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: async data => {
            console.log('Saved clicked');
            await this.categoryStorage.saveCategory(data);
            this.getCategories();
          }
        }
      ]
    });
    prompt.present();
  }

  update() {
    const prompt = this.alertCtrl.create({
      title: 'Editar Categoria',
      inputs: [
        {
          name: 'name',
          placeholder: this.categories.name
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: async data => {
            console.log('Saved clicked');
            await this.categoryStorage.updateCategory(data);
            this.getCategories();
          }
        }
      ]
    });
    prompt.present();
  }

  async delete(category) {
    await this.categoryStorage.removeCategory(category);
    this.getCategories();
  }
}
