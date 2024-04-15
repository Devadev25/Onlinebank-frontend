import { Component } from '@angular/core';
import { PageloaderService } from '../service/pageloader.service';

@Component({
  selector: 'app-pageloader',
  templateUrl: './pageloader.component.html',
  styleUrl: './pageloader.component.css',
})
export class PageloaderComponent {
  constructor(public _loader: PageloaderService) {}
}
