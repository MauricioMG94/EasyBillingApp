import { ClientModel } from "./cliente.model";
import { ProductModel } from "./producto.model";

export type BillModel = {
    billCode: String;
    client: ClientModel;
    products?: Array<ProductModel>;
    totalTaxes: number;
    subTotal: number;
    total: number;
}