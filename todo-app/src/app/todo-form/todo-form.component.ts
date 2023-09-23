import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent implements OnChanges {
  todoForm: FormGroup;

  assigneeList = ['Akshay Kadam', 'Sachin More' ];
  priorityList = ['High', 'Medium', 'Low'];

  @Input() selectedProduct;


  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private messageService: MessageService) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes?.['selectedProduct'].currentValue);
    this.todoForm.patchValue(changes?.['selectedProduct'].currentValue);
  }

  createForm() {
    this.todoForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      assignTo: ['', Validators.required],
      priority: [''],
    });
  }

  submit() {
    let data: any;
    console.log('form', this.todoForm.value);
    if (this.selectedProduct?.id) {
      data = {
        ...this.todoForm.value,
        id: this.selectedProduct?.id
      }
      this.apiService.updateTask(data).subscribe(response =>
        console.log('response', response))
        this.apiService.newRecordCreated(true);
        this.messageService.add({ severity: 'info', detail: 'Task Updated' });


    } else {
      data = this.todoForm.value;
      this.apiService.createNewTodoTask(data).subscribe(response =>
        console.log('response', response))
        this.apiService.newRecordCreated(true);
        this.messageService.add({ severity: 'success', detail: 'Task Created' });
    }

  }
}
