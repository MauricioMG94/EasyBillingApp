import { Component } from '@angular/core';
import { BillModel } from 'src/app/core/models/bill.model';
import { MainService } from 'src/app/core/services/main.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent {
  constructor(private mainService: MainService) {}

  billItemsSaved: Array<BillModel> = [];

  async ngOnInit(){
    this.billItemsSaved = await this.mainService.getSavedBills();
  }
}
