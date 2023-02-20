import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{

  type = '';
  id = '';
  url = '';
  movies: any;
  product: any;

  constructor(private route : ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];
    if (this.type === 'trending') {
      this.url = 'http://localhost:4200/assets/data/trending-movies.json';
    }
    if (this.type === 'theatre') {
      this.url = 'http://localhost:4200/assets/data/theatre-movies.json';
    }
    if (this.type === 'popular') {
      this.url = 'http://localhost:4200/assets/data/popular-movies.json';
    }
    this.getProduct();
  }
 getProduct(){
  this.http.get(this.url).subscribe((movies) => {
    this.movies = movies;
    let index = this.movies.findIndex(
      (product: { id: string }) => product.id == this.id
      );
    if (index > -1){
      this.product = this.movies[index];
    }
  });

 }
  

}
