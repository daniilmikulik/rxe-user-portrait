import {SurveyManager} from "../SurveyManager";

export const useSurveyManager = (surveyManagers, id) => {
    const surveyManager = surveyManagers.find((item) => {
        return item.id === id;
    });

    if (surveyManager) return surveyManager;

    const newSurveyManager = new SurveyManager(id);
    surveyManagers.push(newSurveyManager);
    return newSurveyManager;
}