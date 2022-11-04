import {CallbackType, Question} from "../bot.types";
import {CallbackButton, Key} from "telegram-keyboard";

export const useQuestion = (questionIdx: number): Question => {
    return require('../../content/questions.json')[questionIdx];
}

export const useQuestionButtons = (questionIdx: number): Array<CallbackButton>  => {
    const buttons = require('../../content/questions.json')[questionIdx].buttons;
    return buttons.map((button) => Key.callback(button.text, `${CallbackType.SUBMIT}:${questionIdx}:${button.callback_data}`))
}

export const useQuestionAnswers = (questionIdx: number): Array<string> => {
    return require('../../content/questions.json')[questionIdx]?.buttons?.map((item) => item.callback_data);
}