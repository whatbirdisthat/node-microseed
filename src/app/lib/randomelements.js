export class RandomElements {

    constructor(numberOfQuestions) {
        this.myVar =
            '10011001001001001001100010'
            .substring(0, numberOfQuestions); // 10 of 26
    }
    select() {
        return this.myVar;
    }

}

