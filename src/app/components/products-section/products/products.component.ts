import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any = [];
  isLoading = false;
  categories: any[] = [];
  pages : any = 0;
  pageArray : number[] = [];
  categoriesPath = [
    '/products',
    '/products?filterCatogory=1',
    '/products?filterCatogory=2',
    '/products?filterCatogory=3',
    '/products?filterCatogory=3',
    '/products?filterCatogory=4',
  ];

  @Output() categoriesExport: any = new EventEmitter();
  @Input() filteredCategory: any;
  filterCategory = this.route.snapshot.queryParams['filterCatogory'];
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private ProductService: ProductService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    this.goToTop();

    if (this.filterCategory) {
      this.getProductCatogry(this.filterCategory);
    }

    this.isLoading = true;
    this.getPages();
    this.getProducts();
    this.getCatogries();

  }

  getProducts() {
    this.ProductService.getSomePages().subscribe((response: any) => {
      this.products = response.Products;
      this.isLoading = false;
      console.log(this.pageArray)
      console.log(this.pages)
    });
  }

  getProductsByPge(page:number)
  {
    this.ProductService.getProductsByPge(page).subscribe((response: any) => {
      this.products = response.Products;
      this.isLoading = false;
    });
  }

  getPages() {
    this.ProductService.getAllPages().subscribe((response: any) => {
      this.pages = response.pages;
      this.pageArray.length = this.pages;
      this.isLoading = false;
    });
  }
  getCatogries() {
    this.ProductService.getAllCatogries().subscribe((respone: any) => {
      this.categories = respone.data;
      this.categoriesExport.emit(this.categories);
    });
  }
  getWidth() {
    if (this.categoriesPath.includes(this.router.url)) {
      return 'col-9';
    } else {
      return 'col-12';
    }
  }
  getWidthEmptyMessage() {
    if (this.categoriesPath.includes(this.router.url)) {
      return 'col-9 fs-3 d-flex justify-content-center align-items-center text-bg-info rounded-5 p-4';
    } else {
      return 'col-12 fs-3 d-flex justify-content-center align-items-center text-bg-info  rounded-5 p-4';
    }
  }
  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  getProductCatogry(catogryId: any) {
    this.ProductService.getProductsByCatogries(catogryId).subscribe(
      (res: any) => {
        this.products = res.Data;
      }
    );
  }
}
