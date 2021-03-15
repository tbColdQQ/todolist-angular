import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';
import { AppState } from './store';
import { decrement, increment } from './store/actions/counter.actions';
import { Todo } from './store/reducers/todo.reducer';
import { selectCount } from './store/selectors/counter.selectors';
import { selectTodos } from './store/selectors/todo.selectors';
import { filter, map } from 'rxjs/operators'
import { addTodo, deleteTodo } from './store/actions/todo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements AfterViewInit {
  title = 'angular-test';
  count: Observable<number>
  todos: Observable<Todo[]>

  @ViewChild('addtodoinput') addtodoinput!: ElementRef

  constructor(private store: Store<AppState>) {
    this.count = this.store.pipe(select(selectCount))
    this.todos = this.store.pipe(select(selectTodos))
  }
  increment() {
    this.store.dispatch(increment())
  }
  decrement() {
    this.store.dispatch(decrement())
  }

  ngAfterViewInit () {
    fromEvent<KeyboardEvent>(this.addtodoinput.nativeElement, 'keyup')
      .pipe(
        filter(event => event.key === 'Enter'),
        map(event => (<HTMLInputElement>event.target).value),
        map(title => title.trim()),
        filter(title => title !== '')
      ).subscribe(title => {
        this.store.dispatch(addTodo({title}))
        this.addtodoinput.nativeElement.value = ''
      })
  }

  handleAddTodo () {
    let title: string = this.addtodoinput.nativeElement.value
    title = title.trim()
    if (title !== '') {
      this.store.dispatch(addTodo({title}))
      this.addtodoinput.nativeElement.value = ''
    }
  }

  deleteTodo (id: string) {
    this.store.dispatch(deleteTodo({id}))
  }
}
