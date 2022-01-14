import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { MaterialModule } from "./material/material.module";
import { UnitPipe } from "./pipes/unit/unit.pipe";

@NgModule({
    declarations : [
        UnitPipe,
    ],
    imports : [
        CommonModule,
        IonicModule,
        MaterialModule
    ],
    exports : [
        UnitPipe,
        MaterialModule
    ]
})

export class SharedModule{}