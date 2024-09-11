import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PlannerService } from '../../services/planner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class PlannerComponent implements OnInit {
  plannerForm: FormGroup;
  funds: any[] = [];
  sources: any[] = [];
  runs: any[] = [];
  reports: any[] = [];
  externalSystemConfigs: any[] = [];
  planners: any[] = []; // To hold all planners
  filteredPlanners: any[] = []; // To hold filtered planners
  searchTerm: string = '';
  expandedAccordionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private plannerService: PlannerService
  ) {
    this.plannerForm = this.fb.group({
      name: ['', Validators.required],
      ownerName: ['', Validators.required],
      status: [''],
      description: [''],
      plannerType: ['', Validators.required],
      externalSystemConfigId: [null, Validators.required],
      triggerSources: [false],
      triggerRuns: [false],
      triggerReports: [false],
      funds: this.fb.array([]),
      sources: this.fb.array([]),
      runs: this.fb.array([]),
      reports: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
    this.loadPlanners(); // Load all planners on initialization
  }

  // Load dropdown data
  loadDropdownData() {
    this.plannerService.getAllFunds().subscribe((data) => {
      this.funds = data;
    });

    this.plannerService.getAllSources().subscribe((data) => {
      this.sources = data;
    });

    this.plannerService.getAllRuns().subscribe((data) => {
      this.runs = data;
    });

    this.plannerService.getAllReports().subscribe((data) => {
      this.reports = data;
    });

    this.plannerService.getExternalSystemConfigs().subscribe((data) => {
      this.externalSystemConfigs = data;
    });
  }

  // Load all planners
  loadPlanners() {
    this.plannerService.getPlanners().subscribe((data) => {
      this.planners = data;
      this.filteredPlanners = this.planners; // Initialize filtered planners
    });
  }

  // Search functionality
  onSearch() {
    if (this.searchTerm) {
      this.filteredPlanners = this.planners.filter(planner =>
        planner.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredPlanners = this.planners;
    }
  }

  // Toggle accordion
  toggleAccordion(plannerId: number) {
    this.expandedAccordionId = this.expandedAccordionId === plannerId ? null : plannerId;
  }

  // Create New Planner
  createNewPlanner() {
    const newPlanner = {
      id: Date.now(), // Temporary ID
      name: '',
      ownerName: '',
      description: '',
      status: '', // Placeholder status
      plannerType: '',
      externalSystemConfigId: null,
      triggerSources: false,
      triggerRuns: false,
      triggerReports: false,
      funds: [],
      sources: [],
      runs: [],
      reports: []
    };

    this.planners.push(newPlanner);
    this.filteredPlanners = [...this.planners]; // Refresh filtered planners
    this.expandedAccordionId = newPlanner.id; // Automatically expand the new planner's accordion
  }

  // Add External System Config
  get externalSystemConfigId(): FormGroup {
    return this.plannerForm.get('externalSystemConfigId') as FormGroup;
  }

  // Get Form Arrays
  get fundsArray(): FormArray {
    return this.plannerForm.get('funds') as FormArray;
  }

  get sourcesArray(): FormArray {
    return this.plannerForm.get('sources') as FormArray;
  }

  get runsArray(): FormArray {
    return this.plannerForm.get('runs') as FormArray;
  }

  get reportsArray(): FormArray {
    return this.plannerForm.get('reports') as FormArray;
  }

  // Add Fund Method
  createFund(): FormGroup {
    return this.fb.group({
      fundName: [''],
      fundAlias: ['']
    });
  }

  addFund(): void {
    this.fundsArray.push(this.createFund());
  }

  removeFund(index: number): void {
    this.fundsArray.removeAt(index);
  }

  // Add Source Method
  addSource() {
    const source = this.fb.group({
      sourceName: ['']
    });
    this.sourcesArray.push(source);
  }

  // Add Run Method
  addRun() {
    const run = this.fb.group({
      runName: ['']
    });
    this.runsArray.push(run);
  }

  // Add Report Method
  addReport() {
    const report = this.fb.group({
      reportName: [''],
      reportType: ['']
    });
    this.reportsArray.push(report);
  }

  removeSource(index: number): void {
    this.sourcesArray.removeAt(index);
  }
  
  removeRun(index: number): void {
    this.runsArray.removeAt(index);
  }
  
  removeReport(index: number): void {
    this.reportsArray.removeAt(index);
  }
  
  // Delete planner
  delete(plannerId: number) {
    if (confirm('Are you sure you want to delete this planner?')) {
      // Remove the accordion immediately
      this.planners = this.planners.filter(planner => planner.id !== plannerId);
      this.filteredPlanners = this.planners; // Refresh filtered planners
      this.expandedAccordionId = null; // Collapse the accordion

      this.plannerService.deletePlanner(plannerId).subscribe({
        next: () => {
          console.log('Planner deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting planner', error);
        }
      });
    }
  }

  // Submit form
  onSubmit() {
    if (this.plannerForm.valid) {
      this.plannerService.createPlanner(this.plannerForm.value).subscribe({
        next: (response) => {
          console.log('Planner created successfully', response);
          this.loadPlanners(); // Reload planners after creation
        },
        error: (error) => {
          console.error('Error creating planner', error);
        }
      });
    }
  }
}