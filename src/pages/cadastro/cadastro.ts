import { IRecords } from './../../interfaces/IRecords';
import { ICategory } from './../../interfaces/ICategory';
import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryStorageServiceProvider } from '../../providers/category-storage-service/category-storage-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { v4 as uuidv4 } from 'uuid';

interface IProduct {
  description: string;
  value: string;
  category: string;
  superMarkets: string[];
  id: string;
}

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  public product: IProduct = {
    description: "",
    value: "",
    category: "",
    superMarkets: [],
    id: uuidv4()
  };
  public place: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageServiceProvider,
    public categoryStorage: CategoryStorageServiceProvider,
    public alertCtrl: AlertController
    ) {
      let productComingFromHome = this.navParams.get('product');
      if(productComingFromHome) {
        this.product = productComingFromHome;
      }
  }

  addPlaceToSuperMarkets() {
    this.product.superMarkets.push(this.place);
    this.product.superMarkets.filter(Boolean);
    console.log(this.product);
  }

  removePlaceFromSuperMarkets(name: string) {
    let index = this.product.superMarkets.indexOf(name);
    this.product.superMarkets.splice(index, 1);
    console.log(this.product);
  }

  async register(register) {
    let savedProducts: IRecords[] = await this.storage.getSaved();
    let exists = savedProducts.some(alreadyExist => alreadyExist.description === register.description);
    if(exists) {
      return alert("Esse valor já existe");
      // return;
    }
    console.log("Não deveria estar aqui")
    await this.storage.save(register);
    // this.storage.save(register).then(res => res).then(json => console.log(json));
  }

  async autoFill() {
    const descriptions = ["Coquinha", "Pepsi", "Heiniken", "Skol", "Almoço"];
    const values = ["10", "13", "12", "11", "8", "7", "20"];
    const categories = await this.categoryStorage.getCategories();
    const superMarkets = ["São Luiz", "Extra", "Gbarbosa", "Mercadinho da esquina", "Bom preço", "Pão de Açucar"];
    this.product = {
      description: descriptions[Math.floor(Math.random()*descriptions.length)],
      value: values[Math.floor(Math.random()*values.length)],
      category: categories[Math.floor(Math.random()*categories.length)].name,
      superMarkets: [],
      id: uuidv4()
    };
    this.place = this.randomSuperMarkets(superMarkets);
  }

  randomSuperMarkets(superMarket: string[]) {
    return superMarket[Math.floor(Math.random()*superMarket.length)];
  }

  editPlace(place: string) {
    let index = this.product.superMarkets.indexOf(place);
    this.product.superMarkets[index] = this.place;
  }

  removeProduct() {
    this.storage.removeItem(this.product);
    console.log("product removed");
  }

  uppdateProduct() {
    this.storage.updateItem(this.product);
    console.log("produto ", this.product);
  }

  saveNewCategory() {
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
          handler: (data: ICategory) => {
            console.log('Saved clicked');
            this.categoryStorage.saveCategory(data);
          }
        }
      ]
    });
    prompt.present();
  }

  async showCategories() {
    const categories: ICategory[] = await this.categoryStorage.getCategories();
    let alert = this.alertCtrl.create();
    alert.setTitle('Categorias');

    for (let index = 0; index < categories.length; index++) {
      const element = categories[index];
      alert.addInput({
        type: 'radio',
        label: element.name,
        value: element as any,
        checked: true
      });
    }
    // for(let category of this.product.category) {
    //   alert.addInput({
    //     type: 'radio',
    //     label: category,
    //     value: category,
    //     checked: true
    //   });
    // }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: (data: ICategory) => {
        console.log("escolheu ",  data);
        this.product.category = data.name;
      }
    });
    alert.addButton({
      text: 'Adicionar',
      handler: data => {
        this.saveNewCategory();
      }
    });
    alert.present();
  }
}
