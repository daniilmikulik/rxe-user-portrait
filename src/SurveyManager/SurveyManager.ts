import {useQuestion, useQuestionButtons} from "../utils";
import {Question} from "../bot.types";

export type Answer = {
  questionIdx: number;
  answer: string;
};

export class SurveyManager {
    private state: number = 0;
    private maxState: number = 8;
    private answers: Array<Answer> = [];

    constructor() {};

    showNextQuestion(): { state: number; question: Question | undefined }  {
        if (this.isSurveyEnded()) {
            return { state: this.state, question: undefined };
        }

        const state = this.state;
        const question = useQuestion(this.state++);

        return { state, question};
    }

    storeAnswer(data: string): void {
        const [type, questionIdx, answerText] = data.split(":");
        const answer: Answer = {
            questionIdx: +questionIdx,
            answer: answerText,
        };

        this.answers.push(answer);
    }

    endSurvey(): void {
        console.log(this.answers);
        this.reset();
    }

    isSurveyEnded(): boolean {
        return this.state > this.maxState;
    }

    reset(): void {
        this.state = 0;
        this.answers = [];
    }
}