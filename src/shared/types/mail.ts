import Mail from "nodemailer/lib/mailer";
import { Readable } from "stream";

export type MailOptions = Mail.Options;
export type MailMessage = string | Buffer | Readable | Mail.AttachmentLike;
export type MailWithoutMessageOptions = Omit<MailOptions, 'text' | 'html' | 'watchHtml' | 'amp' | 'icalEvent'>;
export type Attachment = Mail.Attachment;
export type MailAddress = Mail.Address;

export interface MessageInfo {
    messageId: string;
    accepted: Array<string | MailAddress>;
    rejected: Array<string | MailAddress>;
    pending: Array<string | MailAddress>;
    response: string;
}