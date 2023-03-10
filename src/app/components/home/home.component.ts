import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  images = [
    '../../../assets/images/home-catogery/pc.jpg',
    'https://www.freepnglogos.com/uploads/necklace-png/necklace-jewellery-transparent-png-pictures-icons-and-png-backgrounds-26.png',
    'https://www.freepnglogos.com/uploads/suit-png/suit-hall-madden-2.png',
    'https://images.pngnice.com/download/2218/Fashion-Woman-PNG-Transparent-HD-Photo.png',
  ];
  categories: any;
  constructor(private router: Router) {}
  dipalyCategories(event: any) {
    this.categories = event;
  }
  dispalyOneCatogory(id: any) {
    this.router.navigate(['/products'], {
      queryParams: {
        filterCatogory: id,
      },
    });
  }
}
