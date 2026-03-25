import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// استيراد المكونات اللي أنت عملتها (تأكد من صحة المسارات)
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Products } from './products/products';
import { SideMenu } from './side-menu/side-menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Products, SideMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'my-first-angular-app';
}