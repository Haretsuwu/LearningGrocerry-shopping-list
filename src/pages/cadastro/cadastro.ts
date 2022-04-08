import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';


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
    superMarket: []
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageServiceProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  async register(register) {
    let res = await this.storage.save(register)
    console.log(res)
    // this.storage.save(register).then(res => res).then(json => console.log(json));
  }

  autoFill() {
    const descriptions = ["Coquinha", "Pepsi", "Heiniken", "Skol", "Almoço"];
    const values = ["10", "13", "12", "11", "8", "7", "20"];
    const categories = ["Refrigerante", "Cerveja", "Refeição"];
    const superMarkets = ["São Luiz", "Extra", "Gbarbosa", "Mercadinho da esquina", "Bom preço", "Pão de Açucar"];
    // this.product = {
    //   description: descriptions[Math.floor(Math.random()*descriptions.length)],
    //   value: values[Math.floor(Math.random()*values.length)],
    //   category: categories[Math.floor(Math.random()*categories.length)],
    //   superMarket: superMarkets[Math.floor(Math.random()*superMarkets.length)]
    // };
  }
}
