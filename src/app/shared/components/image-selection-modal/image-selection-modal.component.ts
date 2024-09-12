import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-selection-modal',
  templateUrl: './image-selection-modal.component.html',
  styleUrls: ['./image-selection-modal.component.scss'],
})
export class ImageSelectionModalComponent  implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {}

  selectOption(option : string) {
    this.modalController.dismiss({selectedOption : option})
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
