import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll():Observable<any[]> {
    return this.db.list('/products');
  }

  get(productId) {
    return this.db.object('/products/'+ productId);
  }

  update(productId, product) {
    this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    this.db.object('/products/' + productId).remove();
  }
}
