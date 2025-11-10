import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SideNav } from "../side-nav/side-nav";
import { Toolbar } from "../toolbar/toolbar";
import { GenericAvatarDisplay } from "../../../shared/components/generic-avatar-display/generic-avatar-display";

@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, RouterOutlet, SideNav, Toolbar, GenericAvatarDisplay],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  opened = false;
}
