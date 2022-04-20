import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { CategoryStorageServiceProvider } from '../../providers/category-storage-service/category-storage-service';
import { CategoryPage } from '../category/category';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { CadastroPage } from './../cadastro/cadastro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public records: any;

  constructor(public navCtrl: NavController,
    public storage: StorageServiceProvider,
    public categoryStorage: CategoryStorageServiceProvider,
    public alertCtrl: AlertController
  ) {
    this.preSetedCategories();
  }


  // this.categoryStorage.initData(["Refeição", "Suco", "Limpeza"]);

  async preSetedCategories() {
    await this.categoryStorage.initData(["Sem categoria","Refeição", "Suco", "Limpeza"]);
  }

  async pegaDados() {
    const resultado: any = await fetch('https://api.github.com/users/IArturRodrigues')
    const resultado2: any = await fetch('https://api.github.com/users/IArturRodrigues')
    const resultado3: any = await fetch('https://api.github.com/users/IArturRodrigues')

    console.log(resultado.status);
  }

  ionViewDidEnter() {
    this.showProductsListInPage();
    // this.sumAllProductValue();
    // this.showSumValuesByCategory();
  }

  async showProductsListInPage() {
    this.records = await this.storage.getSaved();
  }

  // ionViewDidEnter() {
  //   this.storage.getSaved().then(productsFromStorage => {
  //     if (productsFromStorage) {
  //       return this.records = productsFromStorage;
  //     }
  //   });
  //   this.sumAllProductValue();
  //   this.showSumValuesByCategory();
  // }

  sumAllProductValue() {
    let plus = 0;
    if (this.records) {
      this.records.forEach(element => {
        plus += +element.value;
      });
    }
    return plus; //precisa, pois a função tem que mostrar o valor dessa variavel
  }

  showSumValuesByCategory() {
    let categoryAndValues = [];
    if (this.records) {
      this.records.forEach(obj => {
        let soma = 0;
        let existe = categoryAndValues.some(nResult => nResult.category == obj.category);
        this.records.filter((objt) => {
          if (objt.category === obj.category) {
            let value = +objt.value;
            soma += value;
          }
        });
        if (!existe) {
          categoryAndValues.push({ category: obj.category, value: soma });
        }
      });
    }
    return categoryAndValues; //precisa retornar os elementos desse array
  }

  // async junk() {
  //   console.log("return ",this.thisFunctionReturnAValue());
  //   console.log("not return ",this.thisFunctionNotReturn());
  // }

  // thisFunctionReturnAValue() {
  //   return "Olá mundo";
  // }

  // thisFunctionNotReturn() {
  //   const hw = "Olá mundo";
  // }

  // bugginReturn(value) {
  //   if(value === 1) {
  //     return "sim";
  //   }
  //   console.log("Este codigo deve executar!");
  //   return "não";
  // }

  goToCadastroPage() {
    this.navCtrl.push(CadastroPage);
  }

  goToCategoryPage() {
    this.navCtrl.push(CategoryPage);
  }

  editProduct(product) {
    this.navCtrl.push(CadastroPage, {
      'product': product
    });
  }
}

//   showRadio() {
//     let alert = this.alertCtrl.create();
//     alert.setTitle('Lightsaber color');

//     for(let record of this.records) {
//       alert.addInput({
//         type: 'radio',
//         label: record.description,
//         value: record,
//         checked: true
//       });
//     }

//     alert.addButton('Cancel');
//     alert.addButton({
//       text: 'OK',
//       handler: data => {
//         console.log("escolheu ",  data);
//         // this.testRadioOpen = false;
//         // this.testRadioResult = data;
//       }
//     });
//     alert.addButton({
//       text: 'teste',
//       handler: data => {
//         this.showPrompt();
//       }
//     });
//     alert.present();
//   }

//   showPrompt() {
//     const prompt = this.alertCtrl.create({
//       title: 'Coloque algo',
//       inputs: [
//         {
//           name: 'categoria',
//           placeholder: 'Algo'
//         },
//       ],
//       buttons: [
//         {
//           text: 'Cancel',
//           handler: data => {
//             console.log('Cancel clicked');
//           }
//         },
//         {
//           text: 'Save',
//           handler: data => {
//             console.log('Saved clicked');
//             console.log(data);
//           }
//         }
//       ]
//     });
//     prompt.present();
//   }
// }

  // segundaFuncao() {

  // }

  // primeiraFuncao() {

  //   function segundaFuncao() {

  //   }

  // }