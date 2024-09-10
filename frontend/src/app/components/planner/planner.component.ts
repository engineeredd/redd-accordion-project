import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PlannerService } from '../../services/planner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
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
      status: ['', Validators.required],
      description: [''],
      plannerType: ['', Validators.required],
      externalSystemConfigs: this.fb.array([]),
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

  // Add External System Config
  get externalSystemConfigsArray(): FormArray {
    return this.plannerForm.get('externalSystemConfigs') as FormArray;
  }

  addExternalSystemConfig() {
    const externalConfigGroup = this.fb.group({
      configName: ['', Validators.required],
      configValue: ['', Validators.required]
    });
    this.externalSystemConfigsArray.push(externalConfigGroup);
  }

  removeExternalSystemConfig(index: number) {
    this.externalSystemConfigsArray.removeAt(index);
  }

  // Add Fund
  get fundsArray(): FormArray {
    return this.plannerForm.get('funds') as FormArray;
  }

  addFund() {
    const fundGroup = this.fb.group({
      fundName: ['', Validators.required],
      fundAlias: ['', Validators.required]
    });
    this.fundsArray.push(fundGroup);
  }

  removeFund(index: number) {
    this.fundsArray.removeAt(index);
  }

  // Add Source
  get sourcesArray(): FormArray {
    return this.plannerForm.get('sources') as FormArray;
  }

  addSource() {
    const sourceGroup = this.fb.group({
      sourceName: ['', Validators.required]
    });
    this.sourcesArray.push(sourceGroup);
  }

  removeSource(index: number) {
    this.sourcesArray.removeAt(index);
  }

  // Add Run
  get runsArray(): FormArray {
    return this.plannerForm.get('runs') as FormArray;
  }

  addRun() {
    const runGroup = this.fb.group({
      runName: ['', Validators.required]
    });
    this.runsArray.push(runGroup);
  }

  removeRun(index: number) {
    this.runsArray.removeAt(index);
  }

  // Add Report
  get reportsArray(): FormArray {
    return this.plannerForm.get('reports') as FormArray;
  }

  addReport() {
    const reportGroup = this.fb.group({
      reportType: ['', Validators.required],
      reportName: ['', Validators.required]
    });
    this.reportsArray.push(reportGroup);
  }

  removeReport(index: number) {
    this.reportsArray.removeAt(index);
  }

  // Delete planner
  delete(plannerId: number) {
    if (confirm('Are you sure you want to delete this planner?')) {
      this.plannerService.deletePlanner(plannerId).subscribe({
        next: () => {
          this.planners = this.planners.filter(planner => planner.id !== plannerId);
          this.filteredPlanners = this.planners; // Refresh filtered planners
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