import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ICategory } from '../../interfaces/ICategory';
import { CategoryStorageServiceProvider } from '../../providers/category-storage-service/category-storage-service';


@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  public categories: ICategory[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public categoryStorage: CategoryStorageServiceProvider
    ) {}

  ionViewDidEnter(): void {
    this.getCategories();
  }

  async getCategories(): Promise<void> {
    this.categories = await this.categoryStorage.getCategories();
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

  create(): void {
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
          handler: async (data: ICategory) => {
            console.log('Saved clicked');
            await this.categoryStorage.saveCategory(data);
            this.getCategories();
          }
        }
      ]
    });
    prompt.present();
  }

  update(category: ICategory): void {
    const prompt = this.alertCtrl.create({
      title: 'Editar Categoria',
      inputs: [
        {
          name: 'name',
          placeholder: category.name
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
          handler: async (data: ICategory) => {
            console.log('Saved clicked');
            console.log(data);
            category.name = data.name;
            await this.categoryStorage.updateCategory(category);
            this.getCategories();
          }
        }
      ]
    });
    prompt.present();
  }

  async delete(category: ICategory): Promise<void> {
    await this.categoryStorage.removeCategory(category);
    this.getCategories();
  }
}
