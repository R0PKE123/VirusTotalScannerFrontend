import {NgTemplateOutlet} from '@angular/common';
import {Component, computed, inject, input} from '@angular/core';

import {
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  SidebarToggleDirective
} from '@coreui/angular';

import {IconDirective} from '@coreui/icons-angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  imports: [ContainerComponent, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent, NgTemplateOutlet, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective]
})
export class DefaultHeaderComponent extends HeaderComponent {

  readonly colorModes = [
    {name: 'light', text: 'Light', icon: 'cilSun'},
    {name: 'dark', text: 'Dark', icon: 'cilMoon'},
    {name: 'auto', text: 'Auto', icon: 'cilContrast'}
  ];
  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });
  sidebarId = input('sidebar1');
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  constructor() {
    super();
  }
}
