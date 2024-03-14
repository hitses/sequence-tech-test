import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { BehaviorSubject, tap } from 'rxjs';

import { environment } from '@env/environment';

import { Company } from '../models/company.interface';

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.apiUrl;

  companies: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);
  company = signal<Company[]>({} as Company[]);

  constructor() {
    this.getCompanies();
  }

  getCompanies() {
    this.http
      .get<Company[]>(`${this.url}/companies`)
      .pipe(
        tap((data: Company[]) => {
          this.companies.next(data);
        })
      )
      .subscribe();
  }

  getCompanyBySongId(songId: number) {
    const allCompanies = this.companies.getValue();
    const filteredCompanies = allCompanies.filter((company) => {
      return company.songs.includes(songId);
    });

    this.company.set(
      filteredCompanies.length > 0 ? filteredCompanies : ({} as Company[])
    );
  }
}
