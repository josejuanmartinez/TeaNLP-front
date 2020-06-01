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
  orthColor = '#db62e3';
  linguisticColor = '#1a7bd0';
  statisticalColor = '#eae71e';
  linguisticFeatureColor = '#76b1e5';
  statisticalFeatureColor = '#ffffe0';

  constructor() { }

  ngOnInit(): void {
    this.nodes = [];
    this.links = [];

    this.nodes.push({id: 'WORD', label: this.token.linguistic_features.orth, color: this.wordColor, link: 'WORD'});
    this.nodes.push({id: 'LINGUISTIC_FEATURES', label: 'Linguistic Knowledge', color: this.linguisticColor, link: 'LINGUISTIC_FEATURES'});
    this.nodes.push({id: 'STATISTICAL_FEATURES', label: 'Statistical knowledge', color: this.statisticalColor,
      link: 'STATISTICAL_FEATURES'});

    this.nodes.push({id: 'ORTH', label: this.token.linguistic_features.orth, color: this.orthColor, link: 'ORTH'});
    this.nodes.push({id: 'LOWER', label: this.token.linguistic_features.lower, color: this.linguisticFeatureColor, link: 'LOWER'});
    this.nodes.push({id: 'POS', label: this.token.linguistic_features.pos, color: this.linguisticFeatureColor, link: 'POS'});
    this.nodes.push({id: 'LEMMA', label: this.token.linguistic_features.lemma, color: this.linguisticFeatureColor, link: 'LEMMA'});
    this.nodes.push({id: 'STEM', label: this.token.linguistic_features.stem, color: this.linguisticFeatureColor, link: 'STEM'});
    this.nodes.push({id: 'IS_PUNCT', label: this.token.linguistic_features.is_punct, color: this.linguisticFeatureColor, link: 'IS_PUNCT'});
    this.nodes.push({id: 'IS_SPACE', label: this.token.linguistic_features.is_space,
      color: this.linguisticFeatureColor, link: 'IS_SPACE'});
    this.nodes.push({id: 'IS_NUM', label: this.token.linguistic_features.is_num,
      color: this.linguisticFeatureColor, link: 'IS_NUM'});
    this.nodes.push({id: 'IS_STOP', label: this.token.linguistic_features.is_stop, color: this.linguisticFeatureColor, link: 'IS_STOP'});

    this.links.push({id: 'WORD_LINGUISTIC', source: 'WORD', target: 'LINGUISTIC_FEATURES', label: 'LINGUISTIC_FEATURES'});
    this.links.push({id: 'WORD_STATISTICAL', source: 'WORD', target: 'STATISTICAL_FEATURES', label: 'STATISTICAL_FEATURES'});
    this.links.push({id: 'LINGUISTIC_ORTH', source: 'LINGUISTIC_FEATURES', target: 'ORTH', label: 'ORTH'});
    this.links.push({id: 'LINGUISTIC_LOWER', source: 'LINGUISTIC_FEATURES', target: 'LOWER', label: 'LOWER'});
    this.links.push({id: 'LINGUISTIC_POS', source: 'LINGUISTIC_FEATURES', target: 'POS', label: 'POS'});
    this.links.push({id: 'LINGUISTIC_LEMMA', source: 'LINGUISTIC_FEATURES', target: 'LEMMA', label: 'LEMMA'});
    this.links.push({id: 'LINGUISTIC_STEM', source: 'LINGUISTIC_FEATURES', target: 'STEM', label: 'STEM'});
    this.links.push({id: 'LINGUISTIC_IS_PUNCT', source: 'LINGUISTIC_FEATURES', target: 'IS_PUNCT', label: 'IS_PUNCT'});
    this.links.push({id: 'LINGUISTIC_IS_WHITESPACE', source: 'LINGUISTIC_FEATURES', target: 'IS_SPACE', label: 'IS_SPACE'});
    this.links.push({id: 'LINGUISTIC_IS_NUM', source: 'LINGUISTIC_FEATURES', target: 'IS_NUM', label: 'IS_NUM'});
    this.links.push({id: 'LINGUISTIC_IS_STOP', source: 'LINGUISTIC_FEATURES', target: 'IS_STOP', label: 'IS_STOP'});

    if (this.token.linguistic_features.meaningful_embedding) {
      this.nodes.push({id: 'BERT_ORIGINAL_SUBWORDS', label: this.token.statistical_features.bert_subwords_original.subwords,
        color: this.statisticalFeatureColor, link: 'BERT_ORIGINAL_SUBWORDS'});
      this.nodes.push({id: 'BERT_LOWER_SUBWORDS', label: this.token.statistical_features.bert_subwords_lower.subwords,
        color: this.statisticalFeatureColor, link: 'BERT_LOWER_SUBWORDS'});

      this.links.push({id: 'STATISTICAL_ORIGINAL_SUBWORDS', source: 'STATISTICAL_FEATURES', target: 'BERT_ORIGINAL_SUBWORDS',
        label: 'BERT_ORIGINAL_SUBWORDS'});
      this.links.push({id: 'STATISTICAL_LOWER_SUBWORDS', source: 'STATISTICAL_FEATURES', target: 'BERT_LOWER_SUBWORDS',
        label: 'BERT_LOWER_SUBWORDS'});
    } else {
      this.nodes.push({id: 'MEANINGFUL_EMBEDDINGS', label: this.token.linguistic_features.meaningful_embeddings,
        color: this.statisticalFeatureColor, link: 'MEANINGFUL_EMBEDDINGS'});
      this.links.push({id: 'STATISTICAL_MEANINGFUL', source: 'STATISTICAL_FEATURES', target: 'MEANINGFUL_EMBEDDINGS',
        label: 'MEANINGFUL_EMBEDDINGS'});
    }


  }



}
