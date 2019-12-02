import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile';
import { Profile1Component } from './profile1/profile1';
import { BudgetInputComponent } from './budget-input/budget-input';
@NgModule({
	declarations: [ProfileComponent,
    ProfileComponent,
    Profile1Component,
    BudgetInputComponent],
	imports: [],
	exports: [ProfileComponent,
    ProfileComponent,
    Profile1Component,
    BudgetInputComponent]
})
export class ComponentsModule {}
