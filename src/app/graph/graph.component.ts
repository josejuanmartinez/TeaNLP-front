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
  selectedWordColor = '#d13ddb';
  wordColor = '#e5ace9';
  linguisticColor = '#1a7bd0';
  statisticalColor = '#eae71e';
  linguisticFeatureColor = '#76b1e5';
  statisticalFeatureColor = '#ffffe0';

  constructor() { }

  ngOnInit(): void {
    this.nodes = [];
    this.links = [];

    this.nodes.push({id: 'WORD', label: this.token.linguistic_features.orth, color: this.selectedWordColor, link: 'WORD'});
    this.nodes.push({id: 'LINGUISTIC_FEATURES', label: 'Linguistic Knowledge', color: this.linguisticColor, link: 'LINGUISTIC_FEATURES'});
    this.nodes.push({id: 'STATISTICAL_FEATURES', label: 'Statistical knowledge', color: this.statisticalColor,
      link: 'STATISTICAL_FEATURES'});

    this.nodes.push({id: 'ORTH', label: this.token.linguistic_features.orth, color: this.wordColor, link: 'ORTH'});
    this.nodes.push({id: 'LOWER', label: this.token.linguistic_features.lower, color: this.linguisticFeatureColor, link: 'LOWER'});
    this.nodes.push({id: 'POS', label: this.token.linguistic_features.pos, color: this.linguisticFeatureColor, link: 'POS'});
    this.nodes.push({id: 'LEMMA', label: this.token.linguistic_features.lemma, color: this.linguisticFeatureColor, link: 'LEMMA'});
    this.nodes.push({id: 'STEM', label: this.token.linguistic_features.stem, color: this.linguisticFeatureColor, link: 'STEM'});
    this.nodes.push({id: 'IS_ALPHA', label: this.token.linguistic_features.is_alpha, color: this.linguisticFeatureColor, link: 'IS_ALPJA'});
    this.nodes.push({id: 'IS_PUNCT', label: this.token.linguistic_features.is_punct, color: this.linguisticFeatureColor, link: 'IS_PUNCT'});
    this.nodes.push({id: 'IS_SPACE', label: this.token.linguistic_features.is_space,
      color: this.linguisticFeatureColor, link: 'IS_SPACE'});
    this.nodes.push({id: 'IS_NUM', label: this.token.linguistic_features.is_num,
      color: this.linguisticFeatureColor, link: 'IS_NUM'});
    this.nodes.push({id: 'IS_STOP', label: this.token.linguistic_features.is_stop, color: this.linguisticFeatureColor, link: 'IS_STOP'});

    if (this.token.linguistic_features.tessaurus.synonyms.length > 0) {
      this.nodes.push({id: 'SYNONYMS', label: 'SYNONYMS', color: this.linguisticColor, link: 'SYNONYMS'});
      this.links.push({id: 'LEMMA->SYNONYMS', source: 'LEMMA', target: 'SYNONYMS', label: 'HAS_SYNONYMS'});
      for (const word of this.token.linguistic_features.tessaurus.synonyms) {
        this.nodes.push({id: 'SYNONYM_' + word, label: word, color: this.wordColor, link: word});
        this.links.push({id: 'SYNONYMS->' + word, source: 'SYNONYMS', target: 'SYNONYM_' + word, label: 'HAS_SYNONYM'});
      }
    }
    if (this.token.linguistic_features.tessaurus.antonyms.length > 0) {
      this.nodes.push({id: 'ANTONYMS', label: 'ANTONYMS', color: this.linguisticColor, link: 'ANTONYMS'});
      this.links.push({id: 'LEMMA->ANTONYMS', source: 'LEMMA', target: 'ANTONYMS', label: 'HAS_ANTONYMS'});
      for (const word of this.token.linguistic_features.tessaurus.antonyms) {
        this.nodes.push({id: 'ANTONYM_' + word, label: word, color: this.wordColor, link: word});
        this.links.push({id: 'ANTONYMS->' + word, source: 'ANTONYMS', target: 'ANTONYM_' + word, label: 'HAS_ANTONYM'});
      }
    }
    if (this.token.linguistic_features.tessaurus.hypernyms.length > 0) {
      this.nodes.push({id: 'HYPERNYMS', label: 'HYPERNYMS', color: this.linguisticColor, link: 'HYPERNYMS'});
      this.links.push({id: 'LEMMA->HYPERNYMS', source: 'LEMMA', target: 'HYPERNYMS', label: 'HAS_HYPERNYMS'});
      for (const word of this.token.linguistic_features.tessaurus.hypernyms) {
        this.nodes.push({id: 'HYPERNYM_' + word, label: word, color: this.wordColor, link: word});
        this.links.push({id: 'HYPERNYMS->' + word, source: 'HYPERNYMS', target: 'HYPERNYM_' + word, label: 'HAS_HYPERNYM'});
      }
    }
    this.links.push({id: 'WORD->LINGUISTIC', source: 'WORD', target: 'LINGUISTIC_FEATURES', label: 'HAS_LINGUISTIC_FEAT'});
    this.links.push({id: 'WORD->STATISTICAL', source: 'WORD', target: 'STATISTICAL_FEATURES', label: 'HAS_STATISTICAL_FEAT'});
    this.links.push({id: 'LINGUISTIC->ORTH', source: 'LINGUISTIC_FEATURES', target: 'ORTH', label: 'HAS_ORTH'});
    this.links.push({id: 'LINGUISTIC->LOWER', source: 'LINGUISTIC_FEATURES', target: 'LOWER', label: 'HAS_LOWER'});
    this.links.push({id: 'LINGUISTIC->POS', source: 'LINGUISTIC_FEATURES', target: 'POS', label: 'HAS_POS'});
    this.links.push({id: 'LINGUISTIC->LEMMA', source: 'LINGUISTIC_FEATURES', target: 'LEMMA', label: 'HAS_LEMMA'});
    this.links.push({id: 'LINGUISTIC->STEM', source: 'LINGUISTIC_FEATURES', target: 'STEM', label: 'HAS_STEM'});
    this.links.push({id: 'LINGUISTIC->IS_ALPHA', source: 'LINGUISTIC_FEATURES', target: 'IS_ALPHA', label: 'IS_ALPHABETIC'});
    this.links.push({id: 'LINGUISTIC->IS_PUNCT', source: 'LINGUISTIC_FEATURES', target: 'IS_PUNCT', label: 'IS_PUNCTUATION'});
    this.links.push({id: 'LINGUISTIC->IS_WHITESPACE', source: 'LINGUISTIC_FEATURES', target: 'IS_SPACE', label: 'IS_WHITESPACE'});
    this.links.push({id: 'LINGUISTIC->IS_NUM', source: 'LINGUISTIC_FEATURES', target: 'IS_NUM', label: 'IS_NUMBER'});
    this.links.push({id: 'LINGUISTIC->IS_STOP', source: 'LINGUISTIC_FEATURES', target: 'IS_STOP', label: 'IS_STOPWORD'});
    this.nodes.push({id: 'TEXT_EMBEDDING', label: '[0 0 1 ...]',
      color: this.statisticalFeatureColor, link: 'TEXT EMBEDDING'});
    this.nodes.push({id: 'SENTENCE_EMBEDDING', label: '[0 0 1 ...]',
      color: this.statisticalFeatureColor, link: 'SENTENCE EMBEDDING'});
    this.links.push({id: 'STATISTICAL->TEXT_EMBEDDING', source: 'STATISTICAL_FEATURES', target: 'TEXT_EMBEDDING',
      label: 'HAS_TEXT_EMBEDDING'});
    this.links.push({id: 'STATISTICAL->SENTENCE_EMBEDDING', source: 'STATISTICAL_FEATURES', target: 'SENTENCE_EMBEDDING',
      label: 'HAS_SENTENCE_EMBEDDING'});

    if (this.token.statistical_features.similar_words.length > 0){
      this.nodes.push({id: 'SIMILARITY', label: 'SIMILARITY', color: this.statisticalColor, link: 'SIMILARITY'});
      this.links.push({id: 'STATISTICAL->SIMILARITY', source: 'STATISTICAL_FEATURES', target: 'SIMILARITY', label: 'HAS_SIMILARITY'});
      for (const word of this.token.statistical_features.similar_words) {
        this.nodes.push({id: 'SIMILAR_' + word, label: word, color: this.wordColor, link: word});
        this.links.push({id: 'SIMILARITY->' + word, source: 'SIMILARITY', target: 'SIMILAR_' + word, label: 'IS_SIMILAR'});
      }
    }

    if (this.token.linguistic_features.meaningful_embedding) {

      if (this.token.statistical_features.bert_subwords_original.meaningful_embedding) {
        this.nodes.push({id: 'BERT_CASED', label: 'BERT_CASED',
          color: this.statisticalColor, link: 'BERT_CASED'});
        this.nodes.push({id: 'BERT_CASED_TOKEN', label: this.token.statistical_features.bert_subwords_original.subwords,
          color: this.statisticalColor, link: 'BERT_CASED_TOKEN'});
        this.nodes.push({id: 'BERT_CASED_TOKEN_ROOT', label: this.token.statistical_features.bert_subwords_original.root,
          color: this.wordColor, link: 'BERT_CASED_TOKEN_ROOT'});
        this.nodes.push({id: 'BERT_CASED_TOKEN_LENGTH', label: this.token.statistical_features.bert_subwords_original.length,
          color: this.statisticalFeatureColor, link: 'BERT_CASED_TOKEN_LENGTH'});
        this.nodes.push({id: 'BERT_CASED_TOKEN_EMBEDDING', label:  '[0 0 1 ...]',
          color: this.statisticalFeatureColor, link: 'BERT_CASED_TOKEN_EMBEDDING'});
        this.links.push({id: 'STATISTICAL->BERT_CASED', source: 'STATISTICAL_FEATURES', target: 'BERT_CASED',
          label: 'HAS_BERT_CASED'});
        this.links.push({id: 'BERT_CASED->BERT_CASED_TOKEN', source: 'BERT_CASED', target: 'BERT_CASED_TOKEN',
          label: 'HAS_SUBWORDS'});
        this.links.push({id: 'BERT_CASED_TOKEN->BERT_CASED_TOKEN_ROOT', source: 'BERT_CASED_TOKEN', target: 'BERT_CASED_TOKEN_ROOT',
          label: 'HAS_ROOT'});
        this.links.push({id: 'BERT_CASED_TOKEN->BERT_CASED_TOKEN_LENGTH', source: 'BERT_CASED_TOKEN', target: 'BERT_CASED_TOKEN_LENGTH',
          label: 'HAS_LENGTH'});
        this.links.push({id: 'BERT_CASED_TOKEN_ROOT->BERT_CASED_TOKEN_EMBEDDING', source: 'BERT_CASED_TOKEN_ROOT',
          target: 'BERT_CASED_TOKEN_EMBEDDING', label: 'HAS_WORD_EMBEDDING'});
      } else {
        this.nodes.push({id: 'BERT_CASED', label: 'NO BERT (CASED)',  color: this.statisticalColor, link: 'BERT_CASED'});
        this.links.push({id: 'STATISTICAL->BERT_CASED', source: 'STATISTICAL_FEATURES',
          target: 'BERT_CASED', label: 'HAS_BERT_CASED'});
      }


      if (this.token.statistical_features.bert_subwords_lower.meaningful_embedding) {
        this.nodes.push({id: 'BERT_UNCASED', label: 'BERT_UNCASED',
          color: this.statisticalColor, link: 'BERT_UNCASED'});
        this.nodes.push({id: 'BERT_UNCASED_TOKEN', label: this.token.statistical_features.bert_subwords_lower.subwords,
          color: this.statisticalColor, link: 'BERT_UNCASED_TOKEN'});
        this.nodes.push({id: 'BERT_UNCASED_TOKEN_ROOT', label: this.token.statistical_features.bert_subwords_lower.root,
          color: this.wordColor, link: 'BERT_UNCASED_TOKEN_ROOT'});
        this.nodes.push({id: 'BERT_UNCASED_TOKEN_LENGTH', label: this.token.statistical_features.bert_subwords_lower.length,
          color: this.statisticalFeatureColor, link: 'BERT_UNCASED_TOKEN_LENGTH'});
        this.nodes.push({id: 'BERT_UNCASED_TOKEN_EMBEDDING', label:  '[0 0 1 ...]',
          color: this.statisticalFeatureColor, link: 'BERT_UNCASED_TOKEN_EMBEDDING'});
        this.links.push({id: 'STATISTICAL->BERT_UNCASED', source: 'STATISTICAL_FEATURES', target: 'BERT_UNCASED',
          label: 'HAS_BERT_UNCASED'});
        this.links.push({id: 'BERT_UNCASED->BERT_UNCASED_TOKEN', source: 'BERT_UNCASED', target: 'BERT_UNCASED_TOKEN',
          label: 'HAS_SUBWORDS'});
        this.links.push({id: 'BERT_UNCASED_TOKEN->BERT_UNCASED_TOKEN_ROOT', source: 'BERT_UNCASED_TOKEN', target: 'BERT_UNCASED_TOKEN_ROOT',
          label: 'HAS_ROOT'});
        this.links.push({id: 'BERT_UNCASED_TOKEN->BERT_UNCASED_TOKEN_LENGTH', source: 'BERT_UNCASED_TOKEN', target: 'BERT_UNCASED_TOKEN_LENGTH',
          label: 'HAS_LENGTH'});
        this.links.push({id: 'BERT_UNCASED_TOKEN_ROOT->BERT_UNCASED_TOKEN_EMBEDDING', source: 'BERT_UNCASED_TOKEN_ROOT', target: 'BERT_UNCASED_TOKEN_EMBEDDING',
          label: 'HAS_WORD_EMBEDDING'});
      } else {
        this.nodes.push({id: 'BERT_UNCASED', label: 'NO BERT (UNCASED)',  color: this.statisticalColor, link: 'BERT_UNCASED'});
        this.links.push({id: 'STATISTICAL->BERT_UNCASED', source: 'STATISTICAL_FEATURES',
          target: 'BERT_UNCASED', label: 'HAS_BERT_UNCASED'});
      }

    } else {
      this.nodes.push({id: 'MEANINGFUL_EMBEDDING', label: 'NO EMBEDDINGS',
        color: this.statisticalColor, link: 'MEANINGFUL_EMBEDDING'});
      this.links.push({id: 'STATISTICAL->MEANINGFUL_EMBEDDING', source: 'STATISTICAL_FEATURES', target: 'MEANINGFUL_EMBEDDING',
        label: 'HAS_BERT'});
    }


  }



}
