import { Component, OnInit } from '@angular/core';
import { INavigation, navLinks } from '../routes';
import { IconsService } from '../icons/icons.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  navItems: Array<INavigation> = navLinks;

  constructor(private icons: IconsService) {}

  ngOnInit() {}
}
