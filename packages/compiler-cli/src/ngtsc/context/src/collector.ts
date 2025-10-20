/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import ts from 'typescript';

export interface ComponentContextInfo {
  name: string;
  description: string;
  type: 'dynamicComponent';
  inputs: {[key: string]: {type: string; description: string; required?: boolean}};
  node: ts.Node;
}

export class ComponentContextCollector {
  private collectedContexts: ComponentContextInfo[] = [];

  add(info: ComponentContextInfo): void {
    this.collectedContexts.push(info);
  }

  get getAll(): ComponentContextInfo[] {
    return this.collectedContexts;
  }
}
