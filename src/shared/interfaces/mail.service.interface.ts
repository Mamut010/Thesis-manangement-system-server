import { MailMessage, MailOptions, MailWithoutMessageOptions, MessageInfo } from "../types/mail";

export interface MailServiceInterface {
    sendMail(mailOptions: MailOptions): Promise<MessageInfo>;
    sendTextMail(text: MailMessage, mailOptions: MailWithoutMessageOptions): Promise<MessageInfo>;
    sendHTMLMail(html: MailMessage, mailOptions: MailWithoutMessageOptions): Promise<MessageInfo>;
}