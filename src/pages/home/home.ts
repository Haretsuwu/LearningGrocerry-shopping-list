import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { CadastroPage } from './../cadastro/cadastro';
import { CategoryPage } from '../category/category';

import { CategoryStorageServiceProvider } from '../../providers/category-storage-service/category-storage-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
import { SocialSharing } from '@ionic-native/social-sharing';

import { IRecords } from '../../interfaces/IRecords';
import { ICategory } from './../../interfaces/ICategory';

interface ICategoryAndValue {
  category: ICategory;
  value: number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public records: IRecords[]; //this.showSumValuesByCategory()<IRecords>

  constructor(public navCtrl: NavController,
    public storage: StorageServiceProvider,
    public categoryStorage: CategoryStorageServiceProvider,
    public alertCtrl: AlertController,
    private socialSharing: SocialSharing
  ) {
    this.preSetedCategories();
  }


  // this.categoryStorage.initData(["Refeição", "Suco", "Limpeza"]);

  async preSetedCategories(): Promise<void> {
    await this.categoryStorage.initData(["Sem categoria", "Refeição", "Suco", "Limpeza"]);
  }

  ionViewDidEnter(): void {
    this.showProductsListInPage();
    // this.sumAllProductValue();
    // this.showSumValuesByCategory();
  }

  async showProductsListInPage(): Promise<void> {
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

  sumAllProductValue(): string {
    let sumAllProductValues: number = 0;
    if (this.records) {
      this.records.forEach(element => {
        sumAllProductValues += +element.value;
      });
    }
    return sumAllProductValues.toFixed(2); //precisa, pois a função tem que mostrar o valor dessa variavel
  }

  showCategoriesAndValues() {
    const alert = this.alertCtrl.create();
    alert.setTitle('Categorias');
    for (let index = 0; index < this.showSumValuesByCategory().length; index++) {
      const element = this.showSumValuesByCategory()[index];
      alert.setMessage(`${element.category}:  ${element.value}`);
    }
    alert.addButton('OK');
    alert.present();
  }

  // testAlert() {
  //   const alert = this.alertCtrl.create({
  //     title: 'Categorias',
  //     subTitle: ,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

  showSumValuesByCategory(): ICategoryAndValue[] {
    let categoryAndValues: ICategoryAndValue[] = [];
    if (this.records) {
      this.records.forEach((obj: IRecords) => {
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
    return categoryAndValues; //precisa retornar os elementos desse this.showSumValuesByCategory()
  }

  async junk() {
    console.log(this.showProductsListInPage());
  }

  // convertFileSrc(filePath: string): string {

  //   //esse código é o seguinte......quando o usuario seleciona uma imagem, essa imagem fica em base64,
  //   //não é salva na hora o motivo é que se o usuario tirar/selecionar mais de uma imagem, a imagem antiga já terá sido salva no aparelho,
  //   //com isso acumulando muito espaço, então eu mudei a estrategia pra salvar a imagem SOMENTE depois que salvar o pagamento, porem é necessario mostrar a imagem em tela,
  //   //então se for base64 apenas retorna, e se for path_filesystem, faz o tratamento abaixo
  //   var re = /data:image\//i;
  //   var found = filePath.match(re);
  //   if (found) {
  //     return filePath;
  //   }

  //   return (<any>window).Ionic.WebView.convertFileSrc(filePath);
  // }

  useSocialSharing(record) {
    this.socialSharing.share(null, null, record.img, null);
  }

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

  goToCadastroPage(): void {
    this.navCtrl.push(CadastroPage);
  }

  goToCategoryPage(): void {
    this.navCtrl.push(CategoryPage);
  }

  editProduct(product: IRecords): void {
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