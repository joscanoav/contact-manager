import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ContactService, Contact } from '../../services/contact.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ContactFormComponent],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts = signal<Contact[]>([]);
  editing = signal<Contact | undefined>(undefined);

  constructor(private svc: ContactService) {}

  ngOnInit() { this.load(); }

  load() {
  this.svc.getAll().subscribe(list => {
    console.log('[DEBUG] contacts loaded:', list);
    this.contacts.set(list);
  });
}

  onEdit(contact: Contact) {
    this.editing.set(contact);
  }

  newContact() {
    this.editing.set({ id: undefined!, name: '', email: '', phone: '' });
  }

onSaved() {
  // cerramos el formulario...
  this.editing.set(undefined);
  // ...y recargamos la lista
  this.load();
}

delete(id: number | null) {
  if (id == null) {
    console.warn('[DEBUG] delete() aborted: id is null or undefined');
    return;
  }

  if (confirm('¿Borrar contacto?')) {
    this.svc.delete(id).subscribe({
      next: () => this.load(),
      error: err => console.error('[DEBUG] delete() error =', err)
    });
  }
}
}
