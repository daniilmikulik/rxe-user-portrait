export const useAnswers = (): RegExp => {
    const answers = require('../../content/questions.json').reduce((prev, question) => {
        return prev.concat(question.buttons.map((button) => button.text));
    }, []).filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    return new RegExp(`(${answers.join('|')})`);
}