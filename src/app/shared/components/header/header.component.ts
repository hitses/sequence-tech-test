import { Component, inject, input } from '@angular/core';
import { HeaderService } from '@app/shared/header.service';

@Component({
  selector: 'header-component',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly headerService = inject(HeaderService);

  icon = input.required<string>();
  title = input.required<string>();

  onClickIcon() {
    if (this.title() === 'Canciones') {
      this.headerService.performAction('menu');
    } else if (this.title() === 'Nueva canción') {
      this.headerService.performAction('back');
    }
  }
}
