import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ContactService, Contact } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnChanges {
  @Input() editContact?: Contact;
  @Output() created = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();


  form = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    phone: new FormControl<string>('', Validators.required)
  });

  constructor(private svc: ContactService) {}

ngOnChanges(changes: SimpleChanges) {
  if (changes['editContact'] && this.editContact) {
    this.form.patchValue({
      id:      this.editContact.id,   // si viene undefined o null, no pasa nada
      name:    this.editContact.name,
      email:   this.editContact.email,
      phone:   this.editContact.phone
    });
  }
}


onSubmit() {
  if (this.form.invalid) return;

  const id = this.form.get('id')!.value as number | null;
  const name  = this.form.get('name')!.value as string;
  const email = this.form.get('email')!.value as string;
  const phone = this.form.get('phone')!.value as string;

  if (id) {
    this.svc.update({ id, name, email, phone })
      .subscribe(() => this.resetAndEmitUpdated());
  } else {
    this.svc.create({ name, email, phone })
      .subscribe(() => this.resetAndEmitCreated());
  }
}

private resetAndEmitCreated() {
  this.form.reset({ id: null, name: '', email: '', phone: '' });
  this.created.emit();
}

private resetAndEmitUpdated() {
  this.form.reset({ id: null, name: '', email: '', phone: '' });
  this.updated.emit();
}
onCancel() {
  this.form.reset({ id: null, name: '', email: '', phone: '' });
  this.canceled.emit();
}
}