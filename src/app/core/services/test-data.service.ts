import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestDataService implements InMemoryDbService {

  createDb() {
    const objects = [];
    return { objects };
  }

}
