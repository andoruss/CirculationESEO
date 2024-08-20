import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-html-viewer',
  templateUrl: './html-viewer.component.html'
})
export class HtmlViewerComponent implements OnInit {
  htmlContent!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['html']) {
      this.htmlContent = navigation.extras.state['html'];
    } else {
      this.htmlContent = 'No content available';
    }
  }
}