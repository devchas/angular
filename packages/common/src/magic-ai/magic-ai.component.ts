/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  linkedSignal,
  input,
  computed,
  Type,
  resource,
  output,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {COMPONENT_MAP, COMPONENT_CONTEXT_DATA} from '@angular/core';
import {runFlow} from 'genkit/beta/client';

@Directive({
  selector: '[dynamicAttributes]',
  standalone: true,
})
export class DynamicAttributesDirective implements OnChanges {
  @Input() dynamicAttributes: {[key: string]: string} | undefined;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dynamicAttributes']) {
      this.updateAttributes();
    }
  }

  private updateAttributes(): void {
    if (this.dynamicAttributes) {
      for (const key in this.dynamicAttributes) {
        if (this.dynamicAttributes.hasOwnProperty(key)) {
          this.renderer.setAttribute(
            this.elementRef.nativeElement,
            key,
            this.dynamicAttributes[key],
          );
        }
      }
    }
  }
}

const PLACEHOLDER_ELEMENT: DynamicElementSchema = {
  type: 'elementSchema',
  element: 'placeholder',
};

@Component({
  selector: 'magic-ai-component',
  imports: [CommonModule, DynamicAttributesDirective],
  standalone: true,
  styles: [
    `
    h1 {
      font-size: 22px;
      font-weight: 500;
    }
    .button-container {
      display: flex;
      gap: var(--haven-spacing-2);
      margin-bottom: var(--haven-spacing-3);
    }
    button {
      padding: var(--haven-spacing-2) var(--haven-spacing-3);
      border: none;
      background-color: var(--haven-color-primary);
      color: white;
      border-radius: var(--haven-border-radius-md);
      cursor: pointer;
      font-family: var(--haven-font-family);
      transition: var(--haven-transition-default);
    }
    button:hover {
        background-color: var(--haven-color-primary-dark);
    }
    button:disabled {
        background-color: var(--haven-color-text-muted);
        cursor: not-allowed;
    }
    .component-container {
      display: flex;
    }
  `,
  ],
  template: `
@if (showButtons()) {
  <div class="button-container">
    <button (click)="decrementViewIndex()" [disabled]="!canDecrementViewIndex()">Back</button>
    <button (click)="incrementViewIndex()" [disabled]="!canIncrementViewIndex()">Forward</button>
  </div>
}
@if (!!title() && !componentResource.isLoading()) {
  <h1>{{title()}}</h1>
}
@if (componentResource.isLoading()) {
  <p>Loading...</p>
} @else if (!!componentSchema()) {
  @let s = componentSchema();
  @if (s.type === 'elementSchema') {
    <ng-template #childrenRenderer>
      @for (child of s.children; track $index) {
        <magic-ai-component [appDescription]="appDescription()" [childSchema]="child" />
      }
    </ng-template>
    
      @switch (s.element) {
        @case('main') {
          <main [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </main>
        }
        @case('aside') {
          <aside [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </aside>
        }
        @case('header') {
          <header [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </header>
        }
        @case('div') {
          <div [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </div>
        }
        @case('span') {
          <span [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </span>
        }
        @case('nav') {
          <nav [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </nav>
        }
        @case('section') {
          <section [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </section>
        }
        @case('article') {
          <article [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </article>
        }
        @case('h1') {
          <h1 [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </h1>
        }
        @case('h2') {
          <h2 [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </h2>
        }
        @case('h3') {
          <h3 [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </h3>
        }
        @case('h4') {
          <h4 [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </h4>
        }
        @case('p') {
          <p [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </p>
        }
        @case('a') {
          <a [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </a>
        }
        @case('ul') {
          <ul [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </ul>
        }
        @case('ol') {
          <ol [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </ol>
        }
        @case('li') {
          <li [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </li>
        }
        @case('b') {
          <b [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </b>
        }
        @case('em') {
          <em [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </em>
        }
        @case('button') {
          <button [dynamicAttributes]="s.attributes">
            <ng-container *ngTemplateOutlet="childrenRenderer" />
          </button>
        }
        @case('img') {
          <img [dynamicAttributes]="s.attributes" />
        }
        @default {
          <span>ELEMENT NOT THERE {{s.element}}</span>
        }
      }
  } @else if (s.type === 'componentSchema') {
      <ng-container *ngComponentOutlet="getComponentType(s.name); inputs: s.inputs" />
  } @else if (s.type === 'textSchema') {
    {{s.text.trim()}}
  } @else {
    <span>Invalid type</span>
  }
} @else {
  <p>Something went wrong</p>
}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagicAiComponent {
  private componentMap = inject(COMPONENT_MAP, {optional: true}) || {};
  private componentContextData = inject(COMPONENT_CONTEXT_DATA, {optional: true}) || [];
  placeholder = signal(PLACEHOLDER_ELEMENT);
  appDescription = input.required<string>();
  childSchema = input<DynamicSchema>();
  placeholderText = input<string>();
  prompt = input<Prompt>();
  showDynamicView = linkedSignal<Prompt | undefined, boolean>({
    source: () => this.prompt(),
    computation: (newPrompt, previous) => {
      if (!this.viewInput()) {
        return true;
      } else if (previous?.source && newPrompt) {
        return newPrompt.prompt !== previous.source.prompt;
      } else if (!previous?.source && newPrompt) {
        return true;
      } else {
        return false;
      }
    },
  });
  viewInput = input<ViewSchema>();
  url = input<string>('generateUI');
  componentSchema = computed<DynamicSchema>(() => {
    if (!!this.childSchema()) {
      return this.childSchema() as DynamicSchema;
    } else if (this.componentResource.hasValue()) {
      return this.currentView().dynamicElementSchema;
    } else {
      return {type: 'componentSchema', name: 'error', inputs: {}} as DynamicComponentSchema;
    }
  });
  title = computed(() =>
    !this.views().length ? this.placeholderText() : this.currentView().prompt,
  );
  viewToAdd = computed(() => {
    if (!this.showDynamicView()) {
      return this.viewInput()!.dynamicElementSchema;
    } else {
      return this.componentResource.value()?.componentSchema;
    }
  });
  views = linkedSignal<DynamicElementSchema | DynamicComponentSchema | undefined, ViewSchema[]>({
    source: () => this.viewToAdd(),
    computation: (newView, previous) => {
      if (!newView) {
        return previous?.value ?? [];
      }

      let prompt = this.viewInput()?.prompt ?? '';
      let timestamp = this.viewInput()?.timestamp ?? '';
      if (this.showDynamicView()) {
        prompt = this.prompt()?.prompt ?? '';
        timestamp = this.prompt()?.timestamp ?? '';
      }
      const viewToAdd = {
        timestamp,
        prompt,
        dynamicElementSchema: newView,
      };

      if (!previous || !previous.value[previous.value.length - 1]) {
        return [viewToAdd];
      } else if (previous.value[previous.value.length - 1].prompt === prompt) {
        return previous.value;
      } else {
        return [...previous.value, viewToAdd];
      }
    },
  });
  currentViewIndex = linkedSignal(() => {
    this.viewInput();
    this.prompt();
    if (!this.views()) {
      return 0;
    } else {
      return this.views().length - 1;
    }
  });
  currentView = linkedSignal(() => this.views()[this.currentViewIndex()]);
  canIncrementViewIndex = computed(
    () => this.views().length - 1 > this.currentViewIndex() && !this.componentResource.isLoading(),
  );
  canDecrementViewIndex = computed(
    () => this.currentViewIndex() > 0 && !this.componentResource.isLoading(),
  );
  showButtons = computed(() => {
    if (!this.views()[0]) {
      return false;
    } else {
      const view0Schema = this.views()[0].dynamicElementSchema as DynamicElementSchema;
      return this.views().length > 0 && view0Schema.element !== PLACEHOLDER_ELEMENT.element;
    }
  });
  agentResponse = computed(() => this.componentResource.value()?.agentResponse ?? '');
  agentResponseChange = output<string>();

  incrementViewIndex(): void {
    if (this.canIncrementViewIndex()) {
      this.currentViewIndex.update((index) => index + 1);
    }
  }

  decrementViewIndex(): void {
    if (this.canDecrementViewIndex()) {
      this.currentViewIndex.update((index) => index - 1);
    }
  }

  addView(newView: ViewSchema): void {
    this.views.update((views) => [...views, newView]);
  }

  resourceParam = computed(() => this.prompt()?.prompt);
  componentResource = resource({
    params: () => this.resourceParam(),
    loader: ({params}): Promise<FlowResponse> => {
      return runFlow({
        url: this.url(),
        input: {
          appDescription: this.appDescription(),
          userPrompt: params,
          componentRegistry: this.componentContextData.map((c) => ({
            name: c.name,
            description: c.description,
            inputs: Object.keys(c.inputs).map((key) => ({
              name: key,
              ...c.inputs[key],
            })),
          })),
        },
      });
    },
  });

  constructor() {
    effect(() => {
      console.log(this.prompt());
      this.agentResponseChange.emit(this.agentResponse());
    });
  }

  getComponentType(name: string): Type<any> | null {
    return this.componentMap[name as keyof typeof this.componentMap] || null;
  }
}

export type DynamicSchema = DynamicElementSchema | DynamicComponentSchema | TextSchema;

export interface Prompt {
  timestamp: string;
  prompt: string;
}

export interface ViewSchema {
  timestamp: string;
  prompt: string;
  dynamicElementSchema: DynamicElementSchema | DynamicComponentSchema;
}

interface FlowResponse {
  agentResponse: string;
  componentSchema: DynamicElementSchema;
}

interface TextSchema {
  type: 'textSchema';
  text: string;
}

interface DynamicComponentSchema {
  type: 'componentSchema';
  name: string;
  inputs: {[key: string]: any};
}

interface DynamicElementSchema {
  type: 'elementSchema';
  element: string;
  attributes?: {[key: string]: string};
  children?: (DynamicElementSchema | DynamicComponentSchema | TextSchema)[];
}
