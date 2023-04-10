import { NgModule } from '@angular/core';
import { SettingsModule } from 'app/layout/common/settings/settings.module';
import { LayoutComponent } from 'app/layout/layout.component';
import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { SharedModule } from 'app/shared/shared.module';
import { ClassicLayoutModule } from './layouts/vertical/classic/classic.module';

const layoutModules = [
    // Empty
    EmptyLayoutModule,
    ClassicLayoutModule,
];

@NgModule({
    declarations: [LayoutComponent],
    imports: [SharedModule, SettingsModule, ...layoutModules],
    exports: [LayoutComponent, ...layoutModules],
})
export class LayoutModule {}
