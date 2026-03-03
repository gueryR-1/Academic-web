import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  /** When true the global navbar in app.html is hidden */
  readonly hideNavbar = signal(false);

  show(): void {
    this.hideNavbar.set(false);
  }

  hide(): void {
    this.hideNavbar.set(true);
  }
}
