import { Component } from '@angular/core';
import { ExternalSystemService } from '../../services/external-system.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-external-system',
  templateUrl: './external-system.component.html',
  styleUrls: ['./external-system.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ExternalSystemComponent {
  systems: any[] = [];
  externalSystems: any[] = [];
  searchTerm: string = '';
  newSystem: any = {
    name: '',
    baseURL: '',
    authMethod: '',
    key: '',
    value: '',
    authPlace: ''
  };
  isCreateModalOpen: boolean = false;

  constructor(private externalSystemService: ExternalSystemService) {
    this.loadSystems();
  }

  loadSystems() {
    this.externalSystemService.getSystems().subscribe(systems => {
      this.systems = systems;
      this.externalSystems = systems;
    });
  }

  search() {
    this.externalSystems = this.systems.filter(system =>
      system.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleAccordion(id: number) {
    this.externalSystems = this.externalSystems.map(system => {
      if (system.id === id) {
        system.isExpanded = !system.isExpanded;
      }
      return system;
    });
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  createSystem() {
    this.externalSystemService.createSystem(this.newSystem).subscribe(() => {
      this.loadSystems();
      this.closeCreateModal();
    });
  }

  copySystem(system: any, event: Event) {
    event.stopPropagation();
    // Implement copy logic here
  }

  deleteSystem(id: number, event: Event) {
    event.stopPropagation();
    this.externalSystemService.deleteSystem(id).subscribe(() => {
      this.loadSystems();
    });
  }
}
