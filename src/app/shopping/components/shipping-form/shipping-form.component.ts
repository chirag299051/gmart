import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input ('cart') cart: ShoppingCart;
  shipping: any = {}; 
  userSubscription: Subscription;
  userId: string;

  constructor(private router: Router, private orderServive: OrderService, private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    let order = new Order(this.userId,this.shipping, this.cart);
    let result = await this.orderServive.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }   

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
