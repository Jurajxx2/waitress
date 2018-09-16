import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tables = [
      { id: 1, name: 'stol vonku 1', isOccupied: false, outside: true, visible: true, bill: 0 },
      { id: 2, name: 'stol vonku 2', isOccupied: false, outside: true, visible: true, bill: 0 },
      { id: 3, name: 'stol vonku 3', isOccupied: false, outside: true, visible: true, bill: 0 },
      { id: 4, name: 'stol vonku 4', isOccupied: false, outside: true, visible: true, bill: 0 },
      { id: 5, name: 'stol vonku 5', isOccupied: false, outside: true, visible: true, bill: 0 },
      { id: 6, name: 'stol vnutri 1', isOccupied: false, outside: false, visible: true, bill: 0 },
      { id: 7, name: 'stol vnutri 2', isOccupied: false, outside: false, visible: true, bill: 0 },
      { id: 8, name: 'stol vnutri 3', isOccupied: false, outside: false, visible: true, bill: 0 },
      { id: 9, name: 'stol vnutri 4', isOccupied: false, outside: false, visible: true, bill: 0 },
      { id: 10, name: 'stol vnutri 5', isOccupied: false, outside: false, visible: true, bill: 0 }
    ];

    const products = [
      { id: 1, isTop: true, name: 'Espresso', price: 1.20, code: 23, category: 1},
      { id: 2, isTop: false, name: 'Espresso Lungo', price: 1.20, code: 24, category: 1}
    ];

    const categories = [
      { id: 1,  name: 'Kavy'},
      { id: 2, name: 'Kolace'}
    ];

    const bills = [];
    return {tables, products, bills};
  }
}