import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SideMenuService {
  isOpen = signal<boolean>(false);

  openMenu() {
    this.isOpen.set(true);
  }

  closeMenu() {
    this.isOpen.set(false);
  }
}
