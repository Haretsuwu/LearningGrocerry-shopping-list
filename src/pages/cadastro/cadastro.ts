import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoryStorageServiceProvider } from '../../providers/category-storage-service/category-storage-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { v4 as uuidv4 } from 'uuid';


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  public product = {
    description: "",
    value: "",
    category: "",
    superMarkets: [],
    id: uuidv4()
  };
  public place;

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

  removePlaceFromSuperMarkets(name) {
    let index = this.product.superMarkets.indexOf(name);
    this.product.superMarkets.splice(index, 1);
    console.log(this.product);
  }

  async register(register) {
    let savedProducts = await this.storage.getSaved();
    let exists = savedProducts.some(alreadyExist => alreadyExist.description === register.description);
    if(exists) {
      alert("Esse valor já existe");
      return;
    }

    let res = await this.storage.save(register);
    console.log(res);
    return res;
    // this.storage.save(register).then(res => res).then(json => console.log(json));
  }

  async autoFill() {
    const descriptions = ["Coquinha", "Pepsi", "Heiniken", "Skol", "Almoço"];
    const values = ["10", "13", "12", "11", "8", "7", "20"];
    const categories = await this.categoryStorage.getCategory();
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

  editPlace(place) {
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
          handler: data => {
            console.log('Saved clicked');
            this.categoryStorage.saveCategory(data);
          }
        }
      ]
    });
    prompt.present();
  }

  async showCategories() {
    const categories = await this.categoryStorage.getCategory();
    let alert = this.alertCtrl.create();
    alert.setTitle('Categorias');

    for (let index = 0; index < categories.length; index++) {
      const element = categories[index];
      alert.addInput({
        type: 'radio',
        label: element.name,
        value: element,
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
      handler: data => {
        console.log("escolheu ",  data.name);
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
