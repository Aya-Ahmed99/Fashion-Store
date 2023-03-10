import { AccountService } from 'src/app/components/account/services/account.service';
import { Component } from '@angular/core';
import { UserService } from 'src/app/components/account/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  userId: any;
  userData: any;
  isLoading = false;

  selectedCategory = '';
  categories: any = [];
  productData: any;
  faCartShopping = faCartShopping;

  constructor(
    private BreadcrumbService: BreadcrumbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private UserService: UserService,
    private AccountService: AccountService,
    private ToastrService: ToastrService
  ) {}
  userForm = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
    isAdmin: new FormControl(false),
  });
  ngOnInit(): void {
    this.BreadcrumbService.set('@updateUser', 'Update Data');
  }
  updateUser() {
    let userId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.userForm.status == 'VALID') {
      this.isLoading = true;
      this.UserService.updateUser(userId, this.userForm.value).subscribe(
        (response) => {
          this.alertUpdate();
          this.AccountService.userName = this.userForm.value.fullName;
          this.isLoading = false;
        }
      );
    }
  }
  alertUpdate() {
    this.ToastrService.success('Data updated successfully');
  }
  get getName() {
    return this.userForm.controls['fullName'];
  }
  get getEmail() {
    return this.userForm.controls['email'];
  }
  get getPassword() {
    return this.userForm.controls['password'];
  }
  get getPhone() {
    return this.userForm.controls['phone'];
  }
}
