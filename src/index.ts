import { Telegraf } from 'telegraf';
import { Keyboard } from 'telegram-keyboard';
import {useMessage, useQuestionButtons, useSurveyManager} from "./utils";
import { SurveyManager } from "./SurveyManager";

const bot = new Telegraf(process.env.BOT_TOKEN || '');

const surveyManagers = [];

bot.command('start', async (ctx) => {
    try {
        await ctx.reply(useMessage('startMessage'));
    } catch (err) {
        console.error(err);
    }
});

bot.command('survey', async (ctx) => {
    try {
        const surveyManager = useSurveyManager(surveyManagers, ctx.chat.id);

        const { question, state } = surveyManager.showNextQuestion();

        if (typeof question === "undefined") {
            await ctx.reply(useMessage('endSurveyMessage'));
            return;
        }

        const keyboard = Keyboard.make(useQuestionButtons(state));
        await ctx.reply(question.title, keyboard.inline());
    } catch (err) {
        console.error(err);
    }
});

bot.on('callback_query', async (ctx) => {
    try {
        const surveyManager = useSurveyManager(surveyManagers, ctx?.chat?.id);

        surveyManager.storeAnswer(ctx.update.callback_query.data || '');

        const { question, state } = surveyManager.showNextQuestion();

        if (typeof question === "undefined") {
            surveyManager.endSurvey();
            await ctx.reply(useMessage('endSurveyMessage'));
            return ctx.answerCbQuery(useMessage('answerSuccessMessage'));
        }

        const keyboard = Keyboard.make(useQuestionButtons(state));
        await ctx.reply(question.title, keyboard.inline());
        return ctx.answerCbQuery(useMessage('answerSuccessMessage'));
    } catch (err) {
        console.error(err);
    }
})

bot.command('quit', async (ctx) => {
    try{
        const surveyManager = useSurveyManager(surveyManagers, ctx.chat.id);
        surveyManager.reset();
        await ctx.reply(useMessage('quitMessage'));
    } catch (err) {
        console.error(err);
    }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));