import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  SYNONYMS = 'synonyms';
  ANTONYMS = 'antonyms';
  HYPERNYMS = 'hypernyms';
  SIMILAR = 'similar_words';
  NOENT = 'O-NOENT';
  @Input() token: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();

  selectedPOS = '';
  cleansed = '';
  isNum = false;
  isAlpha = false;
  lemma = '';
  stem = '';
  confirmedNers = [];
  confirmedSentences = [];

  iconNewNerClass = 'va-tbottom';
  newNerClass = 'd-none';
  validNer = false;
  invalidNerMessage = 'Min. 5 chars';
  isEnteringNer = false;
  nerValue = '';


  generatedVocabulary = [];

  generatedSentences = [];
  page = 1;

  position = undefined;

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
      if (item.split(':')[0] === this.token.linguistic_features.pos) {
        this.selectedPOS = item;
      }
    }
    this.generatedVocabulary.push(this.token.linguistic_features.orth);
    this.generatedVocabulary.push(this.token.linguistic_features.lemma);
    this.generatedVocabulary.push(this.token.linguistic_features.lower);


    this.cleansed = this.token.linguistic_features.orth;
    this.isNum = this.token.linguistic_features.is_num;
    this.isAlpha = this.token.linguistic_features.is_alpha;
    this.lemma = this.token.linguistic_features.lemma;
    this.stem = this.token.linguistic_features.stem;

    this.generateSentences();
  }
  generateSentences() {
    this.position = parseInt(this.token.linguistic_features.offset.order_in_sentence, 10);
    this.generatedSentences = [];
    const tessaurus = [this.SYNONYMS, this.ANTONYMS, this.HYPERNYMS];
    for (const group of tessaurus) {
      for (const word of this.token.linguistic_features.tessaurus[group]) {
        if (this.generatedVocabulary.indexOf(word) !== -1) {
          continue;
        }
        const sentenceToks = [...this.token.original_sentence_tokens];
        sentenceToks[this.position] = word;
        this.generatedSentences.push({sentenceTokens: sentenceToks, tessaurusGroup: group});
        this.generatedVocabulary.push(word);
      }
    }
    for (const sim of this.token.statistical_features.similar_words) {
      if (this.generatedVocabulary.indexOf(sim) !== -1) {
        continue;
      }
      const sentenceToks = [...this.token.original_sentence_tokens];
      sentenceToks[this.position] = sim;
      this.generatedSentences.push({sentenceTokens: sentenceToks, tessaurusGroup: this.SIMILAR});
      this.generatedVocabulary.push(sim);
    }
  }
  setCorrect(tessGroup: string, s: number, isCorrect: boolean) {
    const tokenWord = this.generatedSentences[s][this.position];
    if (!this.confirmedSentences.hasOwnProperty(tessGroup)) {
      this.confirmedSentences.push({id: tessGroup, values: []});
    }
    this.confirmedSentences.filter(t => t.id === tessGroup)[0][`values`].
    push({word: tokenWord, sentence: this.generatedSentences[s], correct: isCorrect});
    this.generatedSentences.splice(s, 1);
  }
  showNewNER() {
    this.isEnteringNer = true;
    this.newNerClass = '';
    this.iconNewNerClass = 'va-tbottom d-none';
    this.nerValue = '';
    this.validateNER(this.nerValue);
  }
  getClassName(index: number) {
    if (this.position > index + 5 || this.position < index - 5) {
      return 'd-none';
    } else {
      return index === this.position ? 'marked' : '';
    }
  }

  hideNewNER() {
    this.isEnteringNer = false;
    this.newNerClass = 'd-none';
    this.iconNewNerClass = 'va-tbottom';
    this.nerValue = '';
  }


  validateNER(newValue: string) {
    this.nerValue = newValue;
    const pattern = '^[A-Z]+$';
    this.validNer = false;
    if (newValue.length >= 5) {
      if (newValue.match(pattern) != null && newValue.match(pattern).length > 0) {
        if (this.token.linguistic_features.tessaurus.hypernyms.filter(t => t.toUpperCase() === newValue.toUpperCase()).length > 0) {
          this.invalidNerMessage = 'Duplicated NER';
        } else {
          this.validNer = true;
          this.invalidNerMessage = 'Invalid NER';
        }
      } else {
        this.invalidNerMessage = 'Only chars allowed';
      }
    } else {
      this.invalidNerMessage = 'Min. 5 chars';
    }
  }

  saveNER(newValue: string) {
    this.validateNER(newValue);
    if (this.validNer) {
      this.token.linguistic_features.tessaurus.hypernyms.push(newValue);
      this.hideNewNER();
    }
  }

  getText(i: number, word: string) {
    if (i === this.position - 5) {
      return '... ' + word;
    } else if (i === this.position + 5) {
      return word + ' ...';
    } else {
      return word + ' ';
    }
  }
  saveChanges() {
    this.token.linguistic_features.pos = this.selectedPOS.split(':')[0];
    this.token.linguistic_features.lemma = this.lemma;
    this.token.linguistic_features.stem = this.stem;
    this.token.linguistic_features.is_num = this.isNum;
    this.token.linguistic_features.is_alpha = this.isAlpha;
    this.token.linguistic_features.cleansed = this.cleansed;
    this.token.linguistic_features.tessaurus.synonyms = this.confirmedSentences[this.SYNONYMS];
    this.token.linguistic_features.tessaurus.antonyms = this.confirmedSentences[this.ANTONYMS];
    this.token.linguistic_features.tessaurus.hypernyms = this.confirmedSentences[this.HYPERNYMS];
    this.token.statistical_features.similar_words = this.confirmedSentences[this.SIMILAR];
    this.token.statistical_features.bert_subwords_original.ner = this.confirmedNers.length > 0 ? this.confirmedNers : [this.NOENT];
    console.log(this.token);
    this.save.emit(this.token);
  }
  cancelChanges() {
    this.cancel.emit();
  }
}
