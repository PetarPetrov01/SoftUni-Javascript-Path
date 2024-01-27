import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Todo } from './type/Todo';
import { IdGeneratorService } from './id-generator.service';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  constructor(private http: HttpClient,private idService: IdGeneratorService) { }

  getTodos() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(map(todos => todos
        .map((todo) => {
          return {
            title: todo.title,
            completed: todo.completed,
            id: this.idService.generateId()
          }
        })
        .slice(0, 10)
      ))
  }

  addTodo(titleInput: HTMLInputElement): Todo | undefined {
    if (titleInput.value !== '') {
      return {
        title: titleInput.value,
        completed: false,
        id: this.idService.generateId()
      }
    } 
    return undefined;
  }
}
