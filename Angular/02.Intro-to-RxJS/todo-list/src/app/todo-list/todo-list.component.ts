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
  todoList: Todo[] = [];
  todos: Todo[] = [];
  selectedView: 'all' | 'pending' | 'completed' = 'all';

  constructor(private TodoService: TodoService) { }

  ngOnInit(): void {
    this.TodoService.getTodos()
      .subscribe((todos) => {
        this.todoList = todos;
        this.todos = todos;
        console.log(todos)
      })
  }

  createTodo(event: Event, todoInput: HTMLInputElement) {
    event.preventDefault();

    const newTodo: Todo | undefined = this.TodoService.addTodo(todoInput)
    if (newTodo != undefined) {
      this.todoList.push(newTodo);
      todoInput.value = ''
    }
  }

  completeTodo = (todoId: string) => {
    const currentTodo = this.todoList.find(todo => todo.id === todoId)
    if (currentTodo) {
      currentTodo.completed = !currentTodo.completed
    }
  }

  changeView(event:Event, view: 'all' | 'pending' | 'completed') {
    event.preventDefault();

    this.selectedView = view;
    if (view === 'pending') {
      this.todos = this.todoList.filter(todo => !todo.completed)
    } else if (view === 'completed') {
      this.todos = this.todoList.filter(todo => todo.completed)
    } else {
      this.todos = this.todoList;
    }
  }
}
