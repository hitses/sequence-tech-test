import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private headerActionSubject = new BehaviorSubject<string>('');
  headerAction = this.headerActionSubject.asObservable();

  performAction(action: string) {
    this.headerActionSubject.next(action);
  }
}
