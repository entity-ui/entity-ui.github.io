import { Component, OnInit } from '@angular/core';

import { CodeExamplesData } from '../../data/code-examples-data';

@Component({
  selector: 'app-entity-view-about-container',
  templateUrl: './entity-view-about-container.component.html',
  styleUrls: ['./entity-view-about-container.component.scss']
})
export class EntityViewAboutContainerComponent implements OnInit {
  nodes = CodeExamplesData.nodes;

  constructor() { }

  ngOnInit() {
  }

}
