/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {isIos} from '@angular/docs';

@Component({
  selector: 'adev-home-landing',
  imports: [RouterLink],
  templateUrl: './home-animation.component.html',
  styleUrl: './home-animation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HomeLandingComponent {
  readonly isUwu = input.required<boolean>();
  readonly ready = output<boolean>();

  readonly isIos = isIos;

  constructor() {
    this.ready.emit(true);
  }
}
