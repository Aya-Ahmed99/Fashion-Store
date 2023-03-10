import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ProductService } from '../services/product.service';
import { ProductNumberService } from 'src/app/components/shared/services/product-number.service';
import { AccountService } from 'src/app/components/account/services/account.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faCartShopping,
  faMinusCircle,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit, OnDestroy {
  faCartShopping = faCartShopping;
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;
  isLoading = false;
  url :string = "https://ecommercenodeapp1.onrender.com";
  product: any = {};
  myOwnProduct: any = [];
  quantity = 0;
  cart: any[] = [];

  constructor(
    private BreadcrumbService: BreadcrumbService,
    private ProductService: ProductService,
    private route: ActivatedRoute,
    public accountService: AccountService,
    private ProductNumberService: ProductNumberService,
    private router: Router,
    private ToastrService: ToastrService
  ) {
    this.subscription = this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event) => {
        let url = event.url;
        let productId = url.slice(10);
        this.isLoading = true;
        this.getItem(productId);
      });
  }
  subscription: any;
  ngOnInit() {
    this.isLoading = true;

    //  this.getItem(this.route.snapshot.paramMap.get('id'));
    //   console.log(this.route);
    // console.log(this.route.snapshot.paramMap.get('id'));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  increaseQuantity() {
    this.quantity++;
  }
  decreaseQuantity() {
    if (this.quantity > 0) this.quantity--;
  }
  getItem(id: any) {
    this.ProductService.getOneProducts(id).subscribe(
      (res) => {
        this.isLoading = false;
        this.quantity = 0;
        this.product = res;
        this.BreadcrumbService.set('@productName', this.product.Data.name);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addToCartAlso(amount: number) {
    if (this.quantity > 0) {
      this.addToCartAlert();
      if ('cart' in localStorage) {
        this.cart = JSON.parse(localStorage.getItem('cart')!);
        let exist: boolean = this.cart.find(
          (product) => product._id === this.product.Data._id
        );
        if (exist) {
          let index = this.cart.findIndex(
            (product) => product._id === this.product.Data._id
          );
          this.cart[index].quantity += this.quantity;
          localStorage.setItem('cart', JSON.stringify(this.cart));
          this.ProductNumberService.numberOfproduct = this.cart.length;
        } else {
          this.product.Data.quantity = this.quantity;
          this.cart.push(this.product.Data);
          localStorage.setItem('cart', JSON.stringify(this.cart));
          this.ProductNumberService.numberOfproduct = this.cart.length;
        }
      } else {
        this.product.Data.quantity = this.quantity;
        this.cart.push(this.product.Data);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.ProductNumberService.numberOfproduct = this.cart.length;
      }
    }
  }
  addToCartAlert() {
    this.ToastrService.success('Product Added successfully');
  }
}
