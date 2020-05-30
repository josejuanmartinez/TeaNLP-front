import {Component, Input, OnInit} from '@angular/core';
import {NgxGraphModule} from '@swimlane/ngx-graph';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input() token: any;
  nodes: any[] = [];
  links: any[] = [];
  wordColor = '#e5ace9';
  featColor = '#76b1e5';
  embeddingsColor = '#e5e376';
  constructor() { }

  ngOnInit(): void {
    this.nodes = [];
    this.nodes.push({id: 'ORTH', label: this.token.ORTH, color: this.wordColor},
      {id: 'EMBEDDINGS', label: 'Embeddings', color: this.embeddingsColor});
    this.links = [];
    for (const key in this.token) {
      if (key in this.token) {
        if (key === 'ORTH' || key === 'ORDER') {
          continue;
        }
        if (this.token.hasOwnProperty(key)) {
          const value = this.token[key];
          if (key === 'HYPERNYM' || key === 'SYNONYM' || key === 'ANTONYM') {
            if (value.length > 0) {
              let i = 0;
              for (const item of value) {
                this.nodes.push({id: key + '_' + item, label: item, color: this.wordColor, link: key});
                this.links.push({id: 'ORTH_' + key + '_' + (i++), source: 'ORTH', target: key + '_' + item, label: key});
              }
            }
          } else {
            this.nodes.push({id: key, label: value, color: this.featColor, link: key});
            this.links.push({id: 'ORTH_' + key, source: 'ORTH', target: key, label: key});
          }
        }
      }
    }
  }



}
