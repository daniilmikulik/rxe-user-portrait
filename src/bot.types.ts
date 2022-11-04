export enum CallbackType {
    SUBMIT = 'SUBMIT',
}

export type Button = {
    text: string;
    callback_data: string;
};

export type Question = {
    title: string;
    buttons: Array<Button>;
};