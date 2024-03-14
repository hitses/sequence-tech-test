import { Component, inject } from '@angular/core';
import { SideMenuService } from '@app/shared/side-menu.service';

@Component({
  selector: 'side-menu-component',
  standalone: true,
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  readonly sideMenuService = inject(SideMenuService);

  closeMenu() {
    this.sideMenuService.closeMenu();
  }
}
