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
  lowerColor = '#db62e3';
  featColor = '#76b1e5';
  embeddingsColor = '#e5e376';

  constructor() { }

  ngOnInit(): void {
    this.nodes = [];
    this.nodes.push({id: 'ORTH', label: this.token.ORTH, color: this.wordColor, link: 'ORTH'});
    this.nodes.push({id: 'LOWER', label: this.token.LOWER, color: this.lowerColor, link: 'LOWER'});
    this.nodes.push({id: 'HAS_EMBEDDINGS', label: this.token.HAS_EMBEDDINGS, color: this.embeddingsColor, link: 'HAS_EMBEDDINGS'});
    this.nodes.push({id: 'BERT_SUBWORDS', label: this.token.BERT_SUBWORDS, color: this.embeddingsColor, link: 'BERT_SUBWORDS'});
    this.links = [];
    this.links.push({id: 'ORTH_BERT_SUBWORD', source: 'ORTH', target: 'BERT_SUBWORDS', label: 'BERT_SUBWORDS'});
    this.links.push({id: 'ORTH_EMBEDDINGS', source: 'BERT_SUBWORDS', target: 'HAS_EMBEDDINGS', label: 'HAS_EMBEDDINGS'});
    this.links.push({id: 'ORTH_LOWER', source: 'ORTH', target: 'LOWER', label: 'LOWER'});
    for (const key in this.token) {
      if (key in this.token) {
        if (this.token.hasOwnProperty(key)) {
          if (key === 'LOWER' || key === 'ORTH' || key === 'HAS_EMBEDDINGS' || key === 'ORDER_IN_SENTENCE' || key.indexOf('SUBWORDS') > -1
            || key === 'SENTENCE') {
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
            } else if (key === 'STEM' || key === 'LEMMA' || key === 'IS_STOP') {
              this.nodes.push({id: key, label: value, color: this.featColor, link: key});
              this.links.push({id: 'LOWER_' + key, source: 'LOWER', target: key, label: key});
            } else {
              this.nodes.push({id: key, label: value, color: this.featColor, link: key});
              this.links.push({id: 'ORTH_' + key, source: 'ORTH', target: key, label: key});
            }
          }
        }
      }
    }
  }



}
