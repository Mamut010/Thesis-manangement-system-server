import { MailOptions, MessageInfo } from "../types/mail";

export interface MailServiceInterface {
    sendMail(mailOptions: MailOptions): Promise<MessageInfo>;
}