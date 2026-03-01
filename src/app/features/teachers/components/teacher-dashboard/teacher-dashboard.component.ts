import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { IconName } from '../../../../shared/components/icon/icon.types';
import { PanelDocenteComponent } from '../panel-docente/panel-docente.component';
import { MisMateriasComponent } from '../mis-materias/mis-materias.component';
import { SubirCalificacionesComponent } from '../subir-calificaciones/subir-calificaciones.component';

export type DashboardView = 'inicio' | 'materias' | 'calificaciones';

interface NavItem {
  id: DashboardView;
  label: string;
  icon: IconName;
}

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    PanelDocenteComponent,
    MisMateriasComponent,
    SubirCalificacionesComponent,
  ],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css',
})
export class TeacherDashboardComponent {
  @Output() logout = new EventEmitter<void>();

  activeView = signal<DashboardView>('inicio');
  showLogoutConfirm = signal(false);

  navItems: NavItem[] = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'materias', label: 'Mis Materias', icon: 'book-open' },
    { id: 'calificaciones', label: 'Subir Calificaciones', icon: 'clipboard-list' },
  ];

  getPageTitle(): string {
    switch (this.activeView()) {
      case 'inicio':
        return 'Panel Docente';
      case 'materias':
        return 'Mis Materias';
      case 'calificaciones':
        return 'Subir Calificaciones';
    }
  }

  setView(view: DashboardView): void {
    this.activeView.set(view);
  }

  requestLogout(): void {
    this.showLogoutConfirm.set(true);
  }

  confirmLogout(): void {
    this.showLogoutConfirm.set(false);
    this.logout.emit();
  }

  cancelLogout(): void {
    this.showLogoutConfirm.set(false);
  }
}
