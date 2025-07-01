import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private API = 'http://localhost:3001/contacts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.API);
  }

  create(contact: Omit<Contact, 'id'>): Observable<Contact> {
    return this.http.post<Contact>(this.API, contact);
  }

  update(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(
      `${this.API}/${contact.id}`,
      contact
    );
  }

delete(id: number): Observable<void> {
  return this.http.delete<void>(`${this.API}/${id}`);
}
}
