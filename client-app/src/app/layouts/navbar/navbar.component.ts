import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Output() sidebarStateChange = new EventEmitter<boolean>();
  isSidebarOpen = false;
  isScreenLarge = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isScreenLarge = window.innerWidth >= 768; // Assuming 640px as the breakpoint for larger screens
    if (this.isScreenLarge) {
      this.isSidebarOpen = true; // Ensure the sidebar is open on larger screens
      this.sidebarStateChange.emit(this.isSidebarOpen);
    } else {
      this.isSidebarOpen = false; // Ensure the sidebar is closed on smaller screens
      this.sidebarStateChange.emit(this.isSidebarOpen);
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarStateChange.emit(this.isSidebarOpen);
  }
}
