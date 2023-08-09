import { injectable } from "inversify";
import * as nodemailer from 'nodemailer';
import { env } from "../../env";
import { MailMessage, MailOptions, MailWithoutMessageOptions, MessageInfo } from "../types/mail";
import { MailServiceInterface } from "../interfaces";

@injectable()
export class SMTPMailService implements MailServiceInterface {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            secure: env.mail.secured,
            service: env.mail.service,
            auth: {
                user: env.mail.user,
                pass: env.mail.pass,
            }
        })
    }

    sendMail(mailOptions: MailOptions): Promise<MessageInfo> {
        return this.transporter.sendMail(mailOptions);
    }

    sendTextMail(text: MailMessage, mailOptions: MailWithoutMessageOptions): Promise<MessageInfo> {
        return this.sendMail({...mailOptions, text});
    }

    sendHTMLMail(html: MailMessage, mailOptions: MailWithoutMessageOptions): Promise<MessageInfo> {
        return this.sendMail({...mailOptions, html});
    }
}