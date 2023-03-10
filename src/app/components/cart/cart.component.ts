import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/components/cart/services/cart.service';
import { ProductNumberService } from 'src/app/components/shared/services/product-number.service';
import { faBoxOpen, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  checkedOut = false;
  isLoading = false;
  url :string = "https://ecommercenodeapp1.onrender.com";

  token = localStorage.getItem('user');
  myCart: any[] = [];
  total = 0;
  subtotal = 0;
  taxes = 0.14;
  shiping = 50;
  quantity = 0;
  afterTaxes = 0;
  faBoxOpen = faBoxOpen;
  faArrowLeft = faArrowLeft;
  constructor(
    private ProductNumberService: ProductNumberService,
    private CartService: CartService,
    private router: Router,
    private ToastrService: ToastrService
  ) {}
  ngOnInit() {
    this.getCartProduct();
  }
  increaseQuantity(e: any, index: number) {
    this.myCart[index].quantity++;
    this.quantity = ++e.innerText;
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.myCart));
  }
  decreaseQuantity(quantity: any, index: number) {
    if (this.myCart[index].quantity > 0) {
      this.myCart[index].quantity--;
      this.quantity = --quantity.innerText;
      this.getTotalPrice();
      localStorage.setItem('cart', JSON.stringify(this.myCart));
      this.ProductNumberService.numberOfproduct = this.myCart.length;
    }
  }

  getCartProduct() {
    if ('cart' in localStorage) {
      this.myCart = JSON.parse(localStorage.getItem('cart')!);

      this.getTotalPrice();
    }
  }
  getTotalPrice() {
    this.total = 0;
    this.subtotal = 0;
    this.shiping = 0;
    for (let item in this.myCart) {
      this.subtotal += this.myCart[item].price * this.myCart[item].quantity;
      if (this.myCart[item].quantity > 0) {
        this.shiping = 50;
      } else {
        this.myCart.splice(Number(item), 1);
      }
    }
    this.afterTaxes = this.taxes * this.subtotal;
    this.total = this.subtotal + this.afterTaxes + this.shiping;
  }
  removeItem(index: number) {
    this.myCart.splice(Number(index), 1);
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.myCart));
    this.ProductNumberService.numberOfproduct = this.myCart.length;
  }
  checkOut() {
    this.goToTop();
    this.checkedOut = true;
  }
  confirm() {
    if (this.productForm.status == 'VALID') {
      this.isLoading = true;

      if (this.token != null) {
        let products = this.myCart.map((item) => {
          return {
            product: item._id,
            quantity: item.quantity,
          };
        });
        let model = {
          shippingAddress1: this.productForm.value.address,
          city: this.productForm.value.city,
          zip: this.productForm.value.zip,
          country: 'egypt',
          phone: this.productForm.value.phone,
          orderItems: products,
        };

        this.CartService.createCarte(model).subscribe(
          (res) => {
            this.addAlert();
            localStorage.removeItem('cart');
            this.ProductNumberService.numberOfproduct = 0;
          },
          (err) => console.log(err)
        );
      } else {
        this.router.navigate(['/Account/login'], {
          queryParams: {
            returnUrl: this.router.url,
          },
        });
      }
    }
  }
  getCartToEdit() {
    this.checkedOut = false;
  }
  addAlert() {
    this.confirmOrderAlert();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    setTimeout(() => {
      this.router.navigate(['/products']);
    }, 1100);
  }
  confirmOrderAlert() {
    this.ToastrService.success('Order  confirmed');
  }
  get getCity() {
    return this.productForm.controls['city'];
  }
  get getZip() {
    return this.productForm.controls['zip'];
  }
  get getAddress() {
    return this.productForm.controls['address'];
  }

  get getPhone() {
    return this.productForm.controls['phone'];
  }
  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  productForm = new FormGroup({
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    city: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });
  onSelected(value: any) {
    this.productForm.patchValue({ city: value });
    this.productForm.get('city')!.updateValueAndValidity();
  }
}
