import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Lista de remédios populares com ícones e descrições
    this.items = [
      { title: 'Paracetamol', note: 'Analgésico e antitérmico', icon: 'medkit' },
      { title: 'Ibuprofeno', note: 'Anti-inflamatório e analgésico', icon: 'medkit' },
      { title: 'Amoxicilina', note: 'Antibiótico', icon: 'medkit' },
      { title: 'Dipirona', note: 'Analgésico e antitérmico', icon: 'medkit' },
      { title: 'Omeprazol', note: 'Antiácido', icon: 'medkit' },
      { title: 'Lorazepam', note: 'Ansiolítico', icon: 'medkit' },
      { title: 'Cetirizina', note: 'Antialérgico', icon: 'medkit' },
      { title: 'Metformina', note: 'Antidiabético', icon: 'medkit' },
      { title: 'Losartana', note: 'Antihipertensivo', icon: 'medkit' },
      { title: 'Atorvastatina', note: 'Redutor de colesterol', icon: 'medkit' }
    ];
  }

  itemTapped(event, item) {
    // Navega para a página de detalhes (se existir)
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
