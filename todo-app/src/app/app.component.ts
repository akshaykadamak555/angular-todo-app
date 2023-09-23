import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedProduct: any;
  title = 'todo-app';

  selectedTask(selectedProduct: any) {
      console.log('selected product', selectedProduct);
      this.selectedProduct = selectedProduct;
    }
}
