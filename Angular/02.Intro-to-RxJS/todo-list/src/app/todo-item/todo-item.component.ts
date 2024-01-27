import { Component, Input } from '@angular/core';
import { Todo } from '../type/Todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo: Todo = {
    title: '',
    completed: false,
    id: '',
  };

  @Input() completeTodo = (todoId: string) => { };

  onCompleteHandler(event: Event, todoId: string) {
    event.preventDefault();
    this.completeTodo(todoId)
  }
}
