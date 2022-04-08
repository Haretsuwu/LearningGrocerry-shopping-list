import { CadastroPage } from './../cadastro/cadastro';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public records: any =  [{description: 'coquinha', value: '13', category: 'refri', superMarkets: ["extra", "pão de açucar"]}
  ,{description: 'Heiniken', value: '7', category: 'Cerveja', superMarkets: ["exito", "pão de açucar"]}
  ,{description: 'Skol', value: '11', category: 'Refrigerante', superMarkets: ["são luis", "pague menos"]}
  ,{description: 'Coquinha', value: '20', category: 'Cerveja', superMarkets: ["mercadin", "zezin"]}
  ,{description: 'Almoço', value: '10', category: 'Cerveja', superMarkets: ["extra", "padaria"]}
  ,{description: 'Coquinha', value: '10', category: 'Refrigerante', superMarkets: ["extra", "pão de açucar"]}
]

  constructor(public navCtrl: NavController, public storage: StorageServiceProvider) {
    this.storage.getSaved().then(productsFromStorage => {
      if (productsFromStorage) {
        // this.records = productsFromStorage;
      } else {
        return false;
      }
    });
    this.sumAllProductValue();
    this.showSumValuesByCategory()
  }

  // segundaFuncao() {

  // }

  // primeiraFuncao() {

  //   function segundaFuncao() {

  //   }

  // }

  sumAllProductValue() {
    let plus = 0;
    if(this.records) {
       this.records.forEach(element => {
        plus += +element.value
      });
    }
    return plus;
  }

  showSumValuesByCategory() {
    let categoryAndValues = []
    if(this.records) {
      this.records.forEach(obj => {
        let soma = 0;
        let existe = categoryAndValues.some(nResult => nResult.category == obj.category)
        this.records.filter((objt) => {
          if(objt.category === obj.category) {
            let value = +objt.value;
            soma += value;
          }
        });
        if(!existe) {
          categoryAndValues.push({category: obj.category, value: soma})
        }
      });
    }
    return categoryAndValues;
  }

  async junk() {
    console.log(await this.storage.getSaved());
    console.log(this.records);
  }

  goToCadastroPage() {
    this.navCtrl.push(CadastroPage);
  }
}
