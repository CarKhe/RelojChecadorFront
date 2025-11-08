import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SideNav } from "../side-nav/side-nav";
import { Toolbar } from "../toolbar/toolbar";

@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, RouterOutlet, SideNav, Toolbar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  opened = true;
}
