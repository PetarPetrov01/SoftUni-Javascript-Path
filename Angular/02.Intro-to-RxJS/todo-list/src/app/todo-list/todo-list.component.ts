import { Component } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Todo } from '../type/Todo';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor,TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: Todo[] = [
    {  title: 'Do some task',  completed: false},
    {  title: 'Do some task even more',  completed: false},
    {  title: 'Do something',  completed: false},
  ]
}
