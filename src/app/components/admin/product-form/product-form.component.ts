import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../products-section/services/product.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  addedAlert = false;
  updatedAlert = false;
  isLoading = false;
  productId: any;
  selectedCategory = '';
  categories: any = [];
  productData: any;
  faCartShopping = faCartShopping;
  productForm: any;
  constructor(
    private BreadcrumbService: BreadcrumbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private ToastrService: ToastrService
  ) {
    this.productId = activatedRoute.snapshot.params['id'];
    this.productService.getAllCatogries().subscribe((response: any) => {
      this.categories = response.data;
      this.selectedCategory = this.categories[0]._id;
    });
  }
  alertUpdate() {
    this.ToastrService.success('Product Updated successfully');
  }
  alertAdd() {
    this.ToastrService.success('Product added successfully');
  }

  ngOnInit(): void {
    this.goToTop();
    if (this.router.url == '/admin/addproduct/new') {
      this.BreadcrumbService.set('@addNewProduct', 'Add New Product');
    } else {
      this.BreadcrumbService.set('@updateNewProduct', 'Update New Product');
    }
    //   let productId

    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService
        .getOneProducts(this.productId)
        .subscribe((response: any) => {
          this.productData = response.Data;

          console.log(this.productData);
          this.productForm = new FormGroup({
            name: new FormControl(this.productData?.name || '', [
              Validators.required,
              Validators.minLength(3),
            ]),
            description: new FormControl(this.productData?.description || '', [
              Validators.required,
              Validators.minLength(4),
            ]),
            image: new FormControl(this.productData?.image || '', [
              Validators.required,
            ]),
            price: new FormControl(this.productData?.price || '', [
              Validators.required,
            ]),
            category: new FormControl(
              this.productData?.category.name || 'Select Category'
            ),
            countInStock: new FormControl(
              this.productData?.countInStock || '',
              [Validators.required]
            ),
          });
        });
    }
    /*  this.productForm = new FormGroup({
      name: new FormControl(this.productData?.name || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      image: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      category: new FormControl('Select Category'),
      countInStock: new FormControl('', [Validators.required]),
    })*/
    this.productForm = new FormGroup({
      name: new FormControl(this.productData?.name || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.productData?.description || '', [
        Validators.required,
        Validators.minLength(4),
      ]),
      image: new FormControl(this.productData?.image || '', [
        Validators.required,
      ]),
      price: new FormControl(this.productData?.price || '', [
        Validators.required,
      ]),
      category: new FormControl(
        this.productData?.category || 'Select Category'
      ),
      countInStock: new FormControl(this.productData?.countInStock || '', [
        Validators.required,
      ]),
    });
  }

  get getName() {
    return this.productForm.controls['name'];
  }
  get getImage() {
    return this.productForm.controls['image'];
  }
  get getPrice() {
    return this.productForm.controls['price'];
  }
  get getDescription() {
    return this.productForm.controls['description'];
  }
  get getCategory() {
    return this.productForm.controls['category'];
  }
  get getCountInStock() {
    return this.productForm.controls['countInStock'];
  }
  addProduct() {
    this.productForm.controls.category.patchValue(this.selectedCategory);
    if (this.productForm.status == 'VALID') {
      this.isLoading = true;
      if (!this.productId) {
        this.productService
          .addNewProduct(this.productForm.value)
          .subscribe((response) => {
            this.alertAdd();
            this.isLoading = false;
            this.goToTop();
          });
      } else {
        this.productService
          .updateProduct(this.productId, this.productForm.value)
          .subscribe((response) => {
            this.alertUpdate();
            this.isLoading = false;
            this.goToTop();
          });
      }
    }
  }
  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  onImagePicked(event: any) {
    const file = event.target.files[0];
    const file2 = event.target.files;

    console.log(file2);
    this.productForm.patchValue({ image: file });
    this.productForm.get('image')!.updateValueAndValidity();
  }
}
