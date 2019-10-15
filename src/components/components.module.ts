import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile';
import { Profile1Component } from './profile1/profile1';
@NgModule({
	declarations: [ProfileComponent,
    ProfileComponent,
    Profile1Component],
	imports: [],
	exports: [ProfileComponent,
    ProfileComponent,
    Profile1Component]
})
export class ComponentsModule {}
