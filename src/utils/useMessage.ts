export const useMessage = (messageId: string): string => {
    const message = require('../../content/messages.json')[messageId];
    return typeof message !== "undefined" ? message : "";
}