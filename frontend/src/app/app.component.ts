import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ContactListComponent } from './components/contact-list/contact-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ButtonModule,ContactListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  @ViewChild(ContactListComponent) listCmp!: ContactListComponent;
  onCreated() { this.listCmp.load(); }
  onUpdated() { this.listCmp.load(); }
  }

