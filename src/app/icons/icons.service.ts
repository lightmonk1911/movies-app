import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { icons } from './icons';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    icons.forEach((iconName) => {
      iconRegistry.addSvgIcon(
        iconName,
        sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${iconName}.svg`)
      );
    });
  }
}
