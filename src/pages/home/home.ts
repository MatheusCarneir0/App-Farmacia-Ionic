import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pacientes = [
    { Nome: 'João Silva', Telefone: '123456789', Sintomas: ['Dor de cabeça'], Remedios: ['Paracetamol'], ReceitaMedica: false },
    { Nome: 'Maria Oliveira', Telefone: '987654321', Sintomas: ['Tosse seca'], Remedios: ['Xarope para tosse'], ReceitaMedica: false }
  ];

  remediosQuePrecisamReceita = ['Antibiótico', 'Ansiolítico', 'Corticosteroide'];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {}

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Adicionar Cliente',
      message: "Insira os dados do cliente e sintomas:",
      inputs: [
        {
          name: 'Nome',
          placeholder: 'Nome do Cliente',
          type: 'text'
        },
        {
          name: 'Telefone',
          placeholder: 'Número de Telefone',
          type: 'tel'
        },
        {
          name: 'Sintomas',
          placeholder: 'Sintomas (separados por vírgula)',
          type: 'textarea',
          value: ''
        },
        {
          name: 'Remedios',
          placeholder: 'Remédios (separados por vírgula)',
          type: 'text'
        },
        {
          name: 'ReceitaMedica',
          placeholder: 'Receita Médica (obrigatório se necessário)',
          type: 'text',
          value: ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Adicionar',
          handler: data => {
            const remedios = data.Remedios ? data.Remedios.split(',').map(r => r.trim()) : [];
            const exigeReceita = remedios.length > 0 && remedios.some(r => this.remediosQuePrecisamReceita.includes(r));

            if (!data.Nome || !data.Telefone || !data.Sintomas || (exigeReceita && !data.ReceitaMedica)) {
              if (exigeReceita && !data.ReceitaMedica) {
                this.showAlert('Campo "Receita Médica" é obrigatório para alguns remédios.');
              } else {
                this.showAlert('Preencha todos os campos obrigatórios.');
              }
              return false;
            } else {
              const paciente = {
                Nome: data.Nome,
                Telefone: data.Telefone,
                Sintomas: data.Sintomas.split(',').map(s => s.trim()),
                Remedios: remedios,
                ReceitaMedica: !!data.ReceitaMedica
              };
              this.pacientes.push(paciente);
            }
          }
        }
      ]
    });

    prompt.present();
  }

  excluir(paciente) {
    const index = this.pacientes.indexOf(paciente);
    if (index > -1) {
      this.pacientes.splice(index, 1);
    }
  }

  showConfirm(paciente) {
    const confirm = this.alertCtrl.create({
      title: 'Excluir Cliente',
      message: 'Deseja excluir este cliente?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.excluir(paciente);
          }
        }
      ]
    });
    confirm.present();
  }

  verMais(paciente) {
    const alert = this.alertCtrl.create({
      title: 'Detalhes do Cliente',
      message: `Nome: ${paciente.Nome}<br>
                Telefone: ${paciente.Telefone}<br>
                Sintomas: ${paciente.Sintomas.join(', ')}<br>
                Remédios: ${paciente.Remedios.join(', ')}<br>
                Necessita Receita Médica: ${paciente.ReceitaMedica ? 'Sim' : 'Não'}`,
      buttons: ['OK']
    });
    alert.present();
  }

  private showAlert(message: string) {
    const alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
