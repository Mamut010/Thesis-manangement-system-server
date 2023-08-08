import Mail from "nodemailer/lib/mailer";

export type MailOptions = Mail.Options;
export type Attachment = Mail.Attachment;
export type MailAddress = Mail.Address;

export interface MessageInfo {
    messageId: string;
    accepted: Array<string | MailAddress>;
    rejected: Array<string | MailAddress>;
    pending: Array<string | MailAddress>;
    response: string;
}