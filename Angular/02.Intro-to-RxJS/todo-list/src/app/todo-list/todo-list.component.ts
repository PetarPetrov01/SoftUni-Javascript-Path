import { Component, OnInit } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Todo } from '../type/Todo';
import { NgFor } from '@angular/common';
import { TodoService } from '../todo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  providers: [HttpClient]
})

export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private TodoService: TodoService) { }

  ngOnInit(): void {
    this.TodoService.getTodos()
      .subscribe((todos) => {
        this.todos = todos;
        console.log(todos)
      })
  }

  createTodo(event: Event, todoInput: HTMLInputElement){
    event.preventDefault();

    const newTodo: Todo | undefined = this.TodoService.addTodo(todoInput)
    if(newTodo != undefined){
      this.todos.push(newTodo);
      todoInput.value = ''
    }
  }
}
