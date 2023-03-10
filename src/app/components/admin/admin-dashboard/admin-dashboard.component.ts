import { UserService } from 'src/app/components/admin/services/user.service';
import { Component } from '@angular/core';
import { ProductService } from '../../products-section/services/product.service';
import { faBoxOpen, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  manageProducts = false;
  manageUsers = false;
  reports = true;

  products: any[] = [];
  allUsers: any[] = [];
  orderUsers: any = [];
  totalsales = '';
  allOrders: any[] = [];
  isLoading = false;
  faBoxOpen = faBoxOpen;
  faArrowLeft = faArrowLeft;
  constructor(
    private productServices: ProductService,
    private UserService: UserService,
    private ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.UserService.getTotalSales().subscribe(
      (response: any) => {
        this.totalsales = response.totalsales;
      },
      (err) => {
        console.log(err);
      }
    );
    this.UserService.getAllOrders().subscribe((response: any) => {
      this.allOrders = response.data;
    });
    this.isLoading = true;
    this.productServices.getAllProducts().subscribe((response: any) => {
      this.products = response.Data;
      this.isLoading = false;
    });
    this.UserService.getAllUsers().subscribe((response: any) => {
      this.allUsers = response.data;
    });
  }
  viewProducts() {
    this.goToTop();
    this.manageProducts = true;
    this.manageUsers = false;
    this.reports = false;
  }
  viewUsers() {
    this.goToTop();
    this.manageProducts = false;
    this.reports = false;
    this.manageUsers = true;
  }

  viewReports() {
    this.goToTop();
    this.manageProducts = false;
    this.manageUsers = false;
    this.reports = true;
  }
  deleteProductHandler(productId: number, index: any) {
    this.productServices.deletProduct(productId).subscribe((response) => {
      this.products.splice(Number(index), 1);
      this.alertRemoveProduct();
    });
  }
  deleteUserHandler(userId: any, index: any) {
    console.log(userId);
    console.log(typeof userId);
    this.UserService.deletUser(userId).subscribe((response) => {
      this.allUsers.splice(Number(index), 1);
      this.alertRemoveUser();
    });
  }
  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  alertRemoveProduct() {
    this.ToastrService.success('Product deleted successfully');
  }
  alertRemoveUser() {
    this.ToastrService.success('User deleted successfully');
  }
}
///////////////////
