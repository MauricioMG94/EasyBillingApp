import { Injectable } from '@angular/core';
import { BillModel } from '../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public billKey: string = "bill_key_list";
  constructor() {}

  async getSavedBills(): Promise<Array<BillModel>> {
    let billObjects: Array<BillModel> = [];
    const response: string | null = await localStorage.getItem(this.billKey);
    if(response != null){
      const responseJson: any = JSON.parse(response);
      for (let bill of responseJson){
        const billCasted: BillModel = {
          billCode: bill['billCode'],
          client: bill['client'],
          totalTaxes: bill['totalTax'],
          subTotal: bill['subTotal'],
          total: bill['total'],        
        };
        billObjects.push(billCasted);
      }
    }
    return billObjects;
  }

  async saveBills(bill: BillModel){
    let currentBillSaved: Array<BillModel> = await this.getSavedBills();

    localStorage.setItem(
      this.billKey,
      JSON.stringify([...currentBillSaved, bill])
    );
  }
}
