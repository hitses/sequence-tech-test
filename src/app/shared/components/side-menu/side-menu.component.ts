import { Component, inject } from '@angular/core';
import { SideMenuService } from '@app/shared/services/side-menu.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'side-menu-component',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  readonly sideMenuService = inject(SideMenuService);

  closeMenu() {
    this.sideMenuService.closeMenu();
  }
}
