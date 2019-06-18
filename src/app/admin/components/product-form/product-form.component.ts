import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/take';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product: any = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private category: CategoryService,
    private productService: ProductService) {
    this.categories$ = category.getCategories();

    this.id = this.route.snapshot.paramMap.get('id')
    this.productService.get(this.id).take(1).subscribe(p =>{
      this.product = p
      console.log(p);
    });
   }

  ngOnInit() {
  }

  save(product){
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
    console.log(product)
  }

  delete(){
    if(!confirm("Are you sure you want to delete this product?")) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
