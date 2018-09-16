import { Component, OnInit } from '@angular/core';
import { Category } from '../category'
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  ngOnInit() {
  	this.getCategories();
  }

  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.categoryService.addCategory({id: this.findMissingID(), name: name } as Category)
    .subscribe(product => {
      this.categories.push(product);
    });
  }

  findMissingID(): number {
    let i = 0;
    for (let category of this.categories) {
      i++;
      if (category.id != i) {
        return i;
      }
    }
    return i+1;
  }

  delete(category: Category): void {
    this.categories = this.categories.filter(h => h !== category);
    this.categoryService.deleteCategory(category).subscribe();
  }

}
