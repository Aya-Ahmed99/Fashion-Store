import { Component } from '@angular/core';
import { faCartShopping, faHouse } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  faCartShopping = faCartShopping;
  faHouse = faHouse;
}
