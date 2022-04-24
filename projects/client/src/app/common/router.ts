import { Injectable } from '@angular/core';
import { ChildrenOutletContexts, Data } from '@angular/router';

@Injectable()
export class RouterOutletDataReader {
  constructor(private contexts: ChildrenOutletContexts) {}

  read(): Data | undefined {
    const context = this.contexts.getContext('primary');
    return context?.route?.snapshot.data;
  }
}
