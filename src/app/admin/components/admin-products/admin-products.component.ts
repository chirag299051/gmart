import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  // items: Product[] = [];
  // itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
    .subscribe(p => {
      this.filteredProducts = this.products = p;
      // this.initializeTable(p);
    });
   }

  //  private initializeTable(p: Product[]) {   
  //   this.tableResource = new DataTableResource(p);
  //   this.tableResource.query({ offset: 0, limit: 10 })
  //     .then(items => this.items = items);
  //   this.tableResource.count()
  //     .then(count => this.itemCount = count);
  //  }

  //  reloadItems(params) {
  //   if (!this.tableResource) return;

  //   this.tableResource.query({params})
  //   .then(items => this.items = items);
  //  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }
}
