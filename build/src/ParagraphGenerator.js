var Gender;
(function(Gender2) {
  Gender2[Gender2["Male"] = 0] = "Male";
  Gender2[Gender2["Female"] = 1] = "Female";
  Gender2[Gender2["Other"] = 2] = "Other";
})(Gender || (Gender = {}));
class ParagraphGenerator {
  constructor(name, gender) {
    this.name = "";
    this.gender = 0;
    this.sentences = [];
    this.problems = {};
    this.name = name;
    this.gender = gender;
  }
  generateParagraph(problem1 = "", problem2 = "") {
    if (problem1 == "" && problem2 == "") {
      problem1 = this.getRandom(this.getProblemTypes());
      problem2 = this.getRandom(this.getProblemTypes());
      while (problem1 == problem2) {
        problem2 = this.getRandom(this.getProblemTypes());
      }
    }
    if (problem1 == "") {
      problem1 = this.getRandom(this.getProblemTypes());
    }
    if (problem2 == "") {
      problem2 = this.getRandom(this.getProblemTypes());
    }
    let paragraph = "";
    let problemTreatment1 = this.generateProblemTreatment(problem1);
    let problemTreatment2 = this.generateProblemTreatment(problem2);
    while (problemTreatment1 == problemTreatment2) {
      problemTreatment2 = this.generateProblemTreatment(problem2);
    }
    paragraph += this.convertSentence(this.getRandom(this.sentences[0]) + " ");
    paragraph += this.convertSentence(this.getRandom(this.sentences[1]) + " ");
    paragraph += this.convertSentence(this.getRandom(this.sentences[2]) + " ");
    paragraph += "However, ";
    paragraph += this.convertSentence(problemTreatment1 + " ");
    paragraph += "Also, ";
    paragraph += this.convertSentence(problemTreatment2 + " ");
    paragraph += this.convertSentence(this.getRandom(this.sentences[3]) + " ");
    paragraph += this.convertSentence(this.getRandom(this.sentences[4]) + " ");
    return paragraph;
  }
  getProblemTypes() {
    let problemTypes = [];
    for (let problemType in this.problems) {
      problemTypes.push(problemType);
    }
    return problemTypes;
  }
  loadSentences(url) {
    return $.getJSON(url, (data) => {
      this.sentences = data;
    });
  }
  loadProblemTreatments(url) {
    return $.getJSON(url, (data) => {
      this.problems = data;
    });
  }
  updateName(name) {
    this.name = name;
  }
  updateGender(gender) {
    this.gender = gender;
  }
  generateProblemTreatment(problemType) {
    let sentence = "";
    let problem = this.getRandom(this.problems[problemType]["problems"]);
    let treatment = this.getRandom(this.problems[problemType]["treatments"]);
    sentence = problem + " " + treatment;
    return sentence;
  }
  getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  convertSentence(sentence) {
    sentence = sentence.replace(/_/g, this.name);
    let personalPronounsLower = /\bhe\b|\bshe\b|\bthey\b/g;
    let personalPronounsUpper = /\bHe\b|\bShe\b|\bThey\b/g;
    let possesivePronounsLower = /\bhis\b|\bher\b|\btheir\b/g;
    let possesivePronounsUpper = /\bHis\b|\bHer\b|\bTheir\b/g;
    let objectPronounsLower = /\bhim\b|\bher\b|\bthem\b/g;
    let objectPronounsUpper = /\bHim\b|\bHer\b|\bThem\b/g;
    switch (this.gender) {
      case 0:
        sentence = sentence.replace(personalPronounsLower, "he");
        sentence = sentence.replace(personalPronounsUpper, "He");
        sentence = sentence.replace(possesivePronounsLower, "his");
        sentence = sentence.replace(possesivePronounsUpper, "His");
        sentence = sentence.replace(objectPronounsLower, "him");
        sentence = sentence.replace(objectPronounsUpper, "Him");
        break;
      case 1:
        sentence = sentence.replace(personalPronounsLower, "she");
        sentence = sentence.replace(personalPronounsUpper, "She");
        sentence = sentence.replace(possesivePronounsLower, "her");
        sentence = sentence.replace(possesivePronounsUpper, "Her");
        sentence = sentence.replace(objectPronounsLower, "her");
        sentence = sentence.replace(objectPronounsUpper, "Her");
        break;
      default:
        sentence = sentence.replace(personalPronounsLower, "they");
        sentence = sentence.replace(personalPronounsUpper, "They");
        sentence = sentence.replace(possesivePronounsLower, "their");
        sentence = sentence.replace(possesivePronounsUpper, "Their");
        sentence = sentence.replace(objectPronounsLower, "them");
        sentence = sentence.replace(objectPronounsUpper, "Them");
        break;
    }
    return sentence;
  }
}
