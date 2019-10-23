import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DreggerPage } from './dregger';
import { DragulaModule } from 'ng2-dragula';
@NgModule({
  declarations: [
    DreggerPage,
  ],
  imports: [
    IonicPageModule.forChild(DreggerPage),
    DragulaModule
    ,
  ],
})
export class DreggerPageModule {}
