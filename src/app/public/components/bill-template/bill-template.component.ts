import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ClientModel } from 'src/app/core/models/cliente.model';
import { ProductModel } from 'src/app/core/models/producto.model';
import { BillModel } from 'src/app/core/models/bill.model';
import { MainService } from 'src/app/core/services/main.service';

@Component({
  selector: 'app-bill-template',
  templateUrl: './bill-template.component.html',
  styleUrls: ['./bill-template.component.css']
})
export class BillTemplateComponent {
  constructor(private mainService: MainService) {}
  subTotal : number = 0;
  totalTax : number = 0;
  total: number = 0;
  billProducts: Array<ProductModel> = [];
  clientForm = new FormGroup({
    names: new FormControl('', [Validators.required, Validators.minLength(1)]),
    idNumber: new FormControl('', [Validators.required, Validators.minLength(1)]),
    address: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
  productForm = new FormGroup({
    idNumber: new FormControl('', [Validators.required, Validators.minLength(1)]),
    description: new FormControl('', [Validators.required, Validators.minLength(1)]),
    quantity: new FormControl('', [Validators.required, Validators.minLength(1)]),
    price: new FormControl('', [Validators.required, Validators.minLength(1)]),
    tax: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  submitProductData(){
    const formValues = this.productForm.value;
    const product: ProductModel = {
      idNumber: this.productForm.value?.idNumber ?? '',
      description: this.productForm.value?.description ?? '',
      quantity: parseInt(this.productForm.value?.quantity ?? ''),
      price: parseInt(this.productForm.value?.price ?? ''),
      taxPercent: parseInt(this.productForm.value?.tax ?? ''),
      totalTax : parseInt(this.productForm.value?.quantity ?? '') * parseInt(this.productForm.value?.price ?? '') * parseInt(this.productForm.value?.tax ?? '')/100,
      subTotal: parseInt(this.productForm.value?.quantity ?? '') * parseInt(this.productForm.value?.price ?? ''), 
    };
    this.billProducts.push(product);
    this.updateBillSummary();
  }

  updateBillSummary(){
    this.subTotal = 0;
    this.totalTax = 0;
    this.total = 0;
    for (let product of this.billProducts){
      this.subTotal += product.subTotal ?? 0;
      this.totalTax += product.totalTax ?? 0;
      this.total += (product.subTotal ?? 0) + (product.totalTax ?? 0);
    }
  }

  async saveBill(){
    if(this.clientForm.valid && this.billProducts.length > 0){
      const client: ClientModel = {
        name: this.clientForm.value?.names ?? '',
        idNumber: this.clientForm.value?.idNumber ?? '',
        addres: this.clientForm.value?.address ?? '',
      };
      const bill: BillModel = {
        billCode: await this.getBillNameCode(),
        client: client,
        products: this.billProducts,
        totalTaxes: this.totalTax,
        subTotal: this.subTotal,
        total: this.total,
      };
      await this.mainService.saveBills(bill);
      this.cleanBillForms();
      alert("Factura guardada exítosamente");
    }else{
      alert("Campos incompletos")
    } 
  }

  async getBillNameCode(): Promise<string>{
    let currentBillSaved: Array<BillModel>=
    await this.mainService.getSavedBills();
    const billNumber: number = currentBillSaved.length + 1;
    return 'F-' + billNumber.toString();
  }

  cleanBillForms(){
    this.clientForm.reset();
    this.productForm.reset();
    this.billProducts = [];
    this.total = 0;
    this.subTotal = 0;
    this.totalTax= 0;
  }


}

