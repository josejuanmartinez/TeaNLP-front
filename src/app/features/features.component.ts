import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  @Input() token: any;

  selectedPOS = '';

  POS = ['CC: coordinating conjunction',
    'CD: cardinal digit (one, two, 1)',
    'DT: determiner (the, a, this)',
    'EX: existential there (there is/are)',
    'FW: foreign word',
    'IN: preposition/conjunction',
    'JJ: adjective ‘big’',
    'JJR: adjective, comparative ‘bigger’',
    'JJS: adjective, superlative ‘biggest’',
    'LS: list marker 1)',
    'MD: modal could, will',
    'NN: noun, singular ‘desk’',
    'NNS: noun plural ‘desks’',
    'NNP: proper noun, singular ‘Harrison’',
    'NNPS: proper noun, plural ‘Americans’',
    'PDT: predeterminer ‘all the kids’',
    'POS: possessive ending parent’s',
    'PRP: personal pronoun I, he, she',
    'PRP:$ possessive pronoun my, his, hers',
    'RB :adverb very, silently,',
    'RBR: adverb, comparative better',
    'RBS: adverb, superlative best',
    'RP: particle give up',
    'TO: to go ‘to’ the store.',
    'UH: interjection, errrrrrrrm',
    'VB: verb, base form take',
    'VBD: verb, past tense took',
    'VBG: verb, gerund/present participle taking',
    'VBN: verb, past participle taken',
    'VBP: verb, sing. present, non-3d take',
    'VBZ: verb, 3rd person sing. present takes',
    'WDT: wh-determiner which',
    'WP: wh-pronoun who, what',
    'WP$: possessive wh-pronoun whose',
    'WRB: wh-abverb where, when',
    'NO: no POS'];
  constructor() { }
  ngOnInit(): void {
    for (const item of this.POS) {
      if (item.split(':')[0] === this.token.POS) {
        this.selectedPOS = item;
      }
    }
  }
}
