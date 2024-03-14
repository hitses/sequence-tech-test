import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SideMenuService {
  isOpen = false;

  openMenu() {
    this.isOpen = true;
  }

  closeMenu() {
    this.isOpen = false;
  }
}
