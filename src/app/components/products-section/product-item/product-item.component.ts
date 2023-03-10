import { ToastrService } from 'ngx-toastr';
import { Component, Input } from '@angular/core';
import { ProductNumberService } from 'src/app/components/shared/services/product-number.service';
import { AccountService } from 'src/app/components/account/services/account.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  faCartShopping = faCartShopping;
  cart: any[] = [];
  quantity = 0;
  url :string = "https://ecommercenodeapp1.onrender.com";
  @Input() product: any = {};

  constructor(
    private ProductNumberService: ProductNumberService,
    public accountService: AccountService,
    private ToastrService: ToastrService
  ) {}

  addToCart() {
    let MyproductClone = this.product;
    if ('cart' in localStorage) {
      this.cart = JSON.parse(localStorage.getItem('cart')!);
      let exist: boolean = this.cart.find(
        (product) => product._id === MyproductClone._id
      );
      //
      if (exist) {
        let index = this.cart.findIndex(
          (product) => product._id === MyproductClone._id
        );
        this.cart[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.ProductNumberService.numberOfproduct = this.cart.length;
      } else {
        MyproductClone.quantity = ++this.quantity;
        this.cart.push(MyproductClone);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.ProductNumberService.numberOfproduct = this.cart.length;
      }
    } else {
      MyproductClone.quantity = ++this.quantity;
      this.cart.push(MyproductClone);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.ProductNumberService.numberOfproduct = this.cart.length;
    }
    this.addToCartAlert();
  }
  addToCartAlert() {
    this.ToastrService.success('added to cart successfully');
  }
  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
