import { Route } from '@angular/router';
import { ExternalSystemComponent } from './components/external-system/external-system.component';
import { PlannerComponent } from './components/planner/planner.component';

export const routes: Route[] = [
  { path: 'external-system', component: ExternalSystemComponent },
  { path: 'planner', component: PlannerComponent },
  { path: '', redirectTo: '/external-system', pathMatch: 'full' }  // Default route
];