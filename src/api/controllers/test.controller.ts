/* eslint-disable */

import { Container, inject, injectable } from "inversify";
import { Controller, CurrentUser, Delete, Get, HttpCode, JsonController, OnUndefined, Param, Post, Req, Res } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { 
    AutoQueryCreatable,
    DateListFilter,
    EmailFilter,
    NullableStringFilter,
    NumberFilter,
    NumberListFilter, 
    OrderBy, 
    Pagination, 
    PrismaQueryCreatorInterface, 
    StringFilter
} from '../../lib/query';
import { prettyJSON } from "../../utils/string-helpers";
import { LoggerInterface } from "../../lib/logger";
import { logger } from "../../decorators";
import { StudentsQueryRequest } from "../../contracts/requests";
import { PlainTransformerInterface } from "../../dal/utils/plain-transfomer";
import { compareObjectByEntries, defaultOrGiven } from "../../utils/object-helpers";
import { MailServiceInterface, NotificationServiceInterface } from "../../shared/interfaces";
import { Attachment, MailMessage, MailOptions, MailWithoutMessageOptions } from "../../shared/types/mail";
import path from "path";
import { Request, Response } from 'express';
import { ASSETS } from "../constants/assets";
import { FormFillRequest, FormFillerInterface, RadioButtonField, TextField } from "../../lib/form-filler";
import { temp, templates, views } from "../../utils/path-helpers";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import { createReadStream, unlinkSync } from "fs";
import { v4 as uuidv4 } from 'uuid';
import { promisify } from "util";
import * as stream from 'stream';
import { rimraf } from 'rimraf';
import { PDFDocument, PDFRadioGroup } from "pdf-lib";
import { createDir, deleteDir } from "../../utils/dir-helpers";
import { PdfFormGeneratorInterface } from "../utils/pdf-form-generator";
import { NotificationsQueryRequest } from "../../contracts/requests";
import { BachelorThesisEvaluationService } from "../services";
import { AuthorizedUser } from "../../core/auth-checkers";
import { 
    BachelorThesisAssessmentServiceInterface, 
    BachelorThesisEvaluationServiceInterface, 
    OralDefenseAssessmentServiceInterface, 
    OralDefenseRegistrationServiceInterface 
} from "../interfaces";
import { IO_NAMESPACES } from "../../ws/constants/io-namespaces";
import { 
    BachelorThesisAssessmentRepoInterface, 
    BachelorThesisEvaluationRepoInterface, 
    OralDefenseAssessmentRepoInterface, 
    OralDefenseRegistrationRepoInterface 
} from "../../dal/interfaces";

@JsonController('test')
//@Authorized(ROLES.Admin)
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class TestController {
    @logger(__filename)
    private logger!: LoggerInterface;

    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface,
        @inject(INJECTION_TOKENS.MailService) private mailService: MailServiceInterface,
        @inject(INJECTION_TOKENS.PdfFormFiller) private pdfFormFiller: FormFillerInterface,
        @inject(INJECTION_TOKENS.PdfFormGenerator) private pdfFormGenerator: PdfFormGeneratorInterface,
        @inject(INJECTION_TOKENS.NotificationService) private notificationService: NotificationServiceInterface,
        @inject(INJECTION_TOKENS.DIContainer) private container: Container) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/plain')
    testPlain(@Req() req: Request, @Res() res: Response) {
        return res.send('Hello Wordl!');
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/query')
    async testQuery() {
        const studentsQuery = new StudentsQueryRequest();

        const studentIdFilter1 = new NumberFilter();
        studentIdFilter1.value = 10002;
        studentIdFilter1.operator = 'gte';
        const studentIdFilter2 = new NumberFilter();
        studentIdFilter2.value = 10001;
        studentIdFilter2.operator = 'lte';
        (studentsQuery as any).studentIdFilter = [studentIdFilter1]; 
        //(studentsQuery as any).studentIdFilter = [studentIdFilter1, studentIdFilter2];

        const signatureFilter1 = new NullableStringFilter();
        signatureFilter1.operator = 'isNull';
        const signatureFilter2 = new StringFilter();
        signatureFilter2.value = 'FOO';
        (studentsQuery as any).signatureFilter = [signatureFilter1];
        //(studentsQuery as any).signatureFilter = [signatureFilter1, signatureFilter2];

        const emailFilter1 = new EmailFilter();
        emailFilter1.value = '001';
        const emailFilter2 = new EmailFilter();
        emailFilter2.value = '002';
        //(studentsQuery as any).emailFilter = [emailFilter1];
        (studentsQuery as any).emailFilter = [emailFilter1, emailFilter2];

        const forenameFilter1 = new StringFilter();
        forenameFilter1.value = 'Janey';
        forenameFilter1.operator = 'ncontains';
        const forenameFilter2 = new StringFilter();
        forenameFilter2.value = 'Johny';
        forenameFilter2.operator = 'ncontains';
        (studentsQuery as any).forenameFilter = [forenameFilter1];
        //(studentsQuery as any).forenameFilter = [forenameFilter1, forenameFilter2];

        const intakeFilter = new StringFilter();
        intakeFilter.value = '2019';
        studentsQuery.intakeFilter = [intakeFilter];

        studentsQuery.pagination = new Pagination();

        const emailOrderBy = new OrderBy();
        emailOrderBy.field = 'email';
        emailOrderBy.dir = 'desc';
        const intakeSorter = new OrderBy();
        intakeSorter.field = 'intake';
        intakeSorter.dir = 'desc';
        studentsQuery.orderBy = [emailOrderBy, intakeSorter];

        const model = {
            userId: true,
            surname: true,
            forename: true,
            intake: true,
            ects: true,
            user: {
                username: true,
                email: true,
            }
        };

        const queryObject = this.queryCreator.createQueryObject(model, studentsQuery, { fieldNameMap: { studentId: 'userId' } });
        this.logger.debug(prettyJSON(queryObject));
        const students = await this.prisma.student.findMany({ 
            ...queryObject, 
            include: { 
                user: true
            } 
        });

        return students.map(item => this.plainTransformer.toStudentInfo(item));
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/mail')
    async testMail() {
        const attachments: Attachment[] = [
            {
                ...ASSETS.Templates.BachelorThesisRegistration,
            }
        ]

        const html: MailMessage = { path: views('email-notification-test.html') };

        const mailOptions: MailWithoutMessageOptions = {
            from: '"Fred 👻" <noreply@gmail.com>',
            to: 'victoryroar0013@gmail.com,phucthinh0013@gmail.com',
            subject: 'Test Message',
            attachments: attachments
        };

        const msgInfo = await this.mailService.sendHTMLMail(html, mailOptions);
        return msgInfo.response;
    }

    @HttpCode(HTTP_CODES.Created)
    @Post('/pdf')
    async createPdf(@CurrentUser() user: AuthorizedUser, @Req() req: Request, @Res() res: Response) {
        const { filename, path } = ASSETS.Templates.BachelorThesisRegistration;
        const record = await this.prisma.bachelorThesisRegistration.findUniqueOrThrow(
            { 
                where: { 
                    id: 1 
                },
                include: {
                    student: true,
                    supervisor1: true,
                    supervisor2: true,
                    thesis: {
                        include: {
                            field: true
                        }
                    },
                    admin: true
                } 
            }
        );
        const dto1 = this.plainTransformer.toBachelorThesisRegistration(record);
        dto1.dateOfBirth = new Date('2001-06-13');
        dto1.studentDate = new Date('2023-08-06');
        const pdfBuffer1 = await this.pdfFormGenerator.generateBachelorThesisRegistration(dto1);
        
        ////////////
        const btaRepo = this.container.get(INJECTION_TOKENS.BachelorThesisAssessmentRepo) as 
            BachelorThesisAssessmentRepoInterface;
        const dto2 = (await btaRepo.findOneById(1))!;
        dto2.assessmentDate = new Date();
        dto2.assessmentDescription = 'Lorem ipsum '.repeat(40);
        const pdfBuffer2 = await this.pdfFormGenerator.generateBachelorThesisAssessment(dto2);
        ////////////
        const bteRepo = this.container.get(INJECTION_TOKENS.BachelorThesisEvaluationRepo) as 
            BachelorThesisEvaluationRepoInterface;
        const dto3 = (await bteRepo.findOneById(1))!;
        const pdfBuffer3 = await this.pdfFormGenerator.generateBachelorThesisEvaluation(dto3);
        ////////////
        const odrRepo = this.container.get(INJECTION_TOKENS.OralDefenseRegistrationRepo) as 
            OralDefenseRegistrationRepoInterface;
        const dto4 = (await odrRepo.findOneById(1))!;
        dto4.proposedDate = new Date();
        const admissionDate = new Date();
        const dateReceived = new Date();
        dateReceived.setDate(dateReceived.getDate() - 2);
        admissionDate.setDate(admissionDate.getDate() - 1);
        dto4.dateReceived = dateReceived;
        dto4.admissionDate = admissionDate;
        const pdfBuffer4 = await this.pdfFormGenerator.generateOralDefenseRegistration(dto4);
        ////////////
        const odaRepo = this.container.get(INJECTION_TOKENS.OralDefenseAssessmentRepo) as 
            OralDefenseAssessmentRepoInterface;
        const dto5 = (await odaRepo.findOneById(1))!;
        dto5.placeDefense = 'ABC Building';
        dto5.supervisor1Grade = 2.3;
        dto5.supervisor2Grade = 3;
        dto5.overallGrade = (2.3 + 3) / 2;
        dto5.assessmentDate = new Date();
        dto5.record = 'Lorem ipsum '.repeat(50);
        const pdfBuffer5 = await this.pdfFormGenerator.generateOralDefenseAssessment(dto5);
        ////////////
        
        const name1 = uuidv4();
        const tempPath1 = temp(name1);
        const name2 = uuidv4();
        const tempPath2 = temp(name2);
        const name3 = uuidv4();
        const tempPath3 = temp(name3);
        const name4 = uuidv4();
        const tempPath4 = temp(name4);
        const name5 = uuidv4();
        const tempPath5 = temp(name5);

        await mkdir(temp(), { recursive: true });
        await writeFile(tempPath1, pdfBuffer1);
        await writeFile(tempPath2, pdfBuffer2);
        await writeFile(tempPath3, pdfBuffer3);
        await writeFile(tempPath4, pdfBuffer4);
        await writeFile(tempPath5, pdfBuffer5);

        return {
            bachelorThesisRegistration: name1,
            bachelorThesisAssessment: name2,
            bachelorThesisEvaluation: name3,
            oralDefenseRegistration: name4,
            oralDefenseAssessment: name5,
        };
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/pdf/:filename')
    @OpenAPI({
        description: 'Test downloading pdf file',
        responses: {
            [`${HTTP_CODES.Ok}`]: {
                content: {
                    ['*/*']: {}
                }
            },
        },
    })
    async downloadPdf(@Req() req: Request, @Res() res: Response, @Param('filename') tempFileName: string) {
        const fileName = tempFileName + '.pdf';
        const tempPath = temp(tempFileName);

        // const cleanup = (err?: Error) => {
        //     if (err) {
        //         // this.logger.error(`Error sending file <${tempFileName}>`);
        //         // this.logger.error(err.message);
        //     }
        //     else {
        //         this.logger.info(`File <${tempFileName}> sent successfully`);
        //         //unlinkSync(tempPath);
        //     }
        // };
        
        //res.download(tempPath, fileName, cleanup);
        // await promisify(() => { return res.download(tempPath, fileName, cleanup); })();
        await promisify(() => { return res.download(tempPath, fileName); })();
        return res;
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/pdf-delete/:filename')
    @OpenAPI({
        description: 'Test downloading and deleting pdf file',
        responses: {
            [`${HTTP_CODES.Ok}`]: {
                content: {
                    ['*/*']: {}
                }
            },
        },
    })
    async downloadDeletePdf(@Req() req: Request, @Res() res: Response, @Param('filename') tempFileName: string) {
        const filename = tempFileName + '.pdf';
        const tempPath = temp(tempFileName);

        const pdfMimeType = 'application/pdf';

        const cleanup = (err?: Error) => {
            if (err) {
                this.logger.error(`Error sending file <${tempFileName}>`);
                this.logger.error(err.message);
            }
            else {
                this.logger.info(`File <${tempFileName}> sent successfully`);
                unlinkSync(tempPath);
            }
        };

        res.set({
            'Content-disposition': `attachment; filename=${Date.now().toString() + '_' + filename}`,
            'Content-type': pdfMimeType
        });
        
        //await promisify(() => { return res.download(tempPath, fileName); })();
        return res.sendFile(tempPath, cleanup);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Delete('/temp')
    async deleteTemp() {
        return deleteDir(temp());
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/pdf-stream')
    @OpenAPI({
        description: 'Test creating and downloading pdf file consecutively',
        responses: {
            [`${HTTP_CODES.Ok}`]: {
                content: {
                    ['*/*']: {}
                }
            },
        },
    })
    async createAndDownloadPdfStream(@Req() req: Request, @Res() res: Response) {
        const { filename, path } = ASSETS.Templates.BachelorThesisAssessment;
        const formFillRequest: FormFillRequest = {
            foo: new TextField('fu', 'fuu'),
            bar: new RadioButtonField('baz', 'bazz'),
        };
        const pdfBuffer = await this.pdfFormFiller.fill(path, formFillRequest);
        const pdfMimeType = 'application/pdf';

        const readStream = new stream.PassThrough();
        res.set({
            'Content-disposition': `attachment; filename=${Date.now().toString() + '_' + filename}`,
            'Content-type': pdfMimeType
        });
        res.status(HTTP_CODES.Ok);
        
        readStream.pipe(res);
        readStream.end(pdfBuffer);
        
        return res;
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/pdf-send')
    @OpenAPI({
        description: 'Test creating and downloading pdf file consecutively',
        responses: {
            [`${HTTP_CODES.Ok}`]: {
                content: {
                    ['*/*']: {}
                }
            },
        },
    })
    async createAndDownloadPdfSend(@Req() req: Request, @Res() res: Response) {
        const { filename, path } = ASSETS.Templates.BachelorThesisAssessment;
        const formFillRequest: FormFillRequest = {
            foo: new TextField('fu', 'fuu'),
            bar: new RadioButtonField('baz', 'bazz'),
        };
        const pdfBuffer = await this.pdfFormFiller.fill(path, formFillRequest);
        const pdfMimeType = 'application/pdf';

        res.set({
            'Content-disposition': `attachment; filename=${Date.now().toString() + '_' + filename}`,
            'Content-type': pdfMimeType
        });

        return res.send(pdfBuffer);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/pdf-promise')
    @OpenAPI({
        description: 'Test creating and downloading pdf file consecutively',
        responses: {
            [`${HTTP_CODES.Ok}`]: {
                content: {
                    ['*/*']: {}
                }
            },
        },
    })
    async createAndDownloadPdfPromise(@Req() req: Request, @Res() res: Response) {
        const { filename, path } = ASSETS.Templates.BachelorThesisAssessment;
        const formFillRequest: FormFillRequest = {
            foo: new TextField('fu', 'fuu'),
            bar: new RadioButtonField('baz', 'bazz'),
        };
        const pdfBuffer = await this.pdfFormFiller.fill(path, formFillRequest);
        
        const tempFileName = uuidv4();
        const tempPath = temp(tempFileName);
        await createDir(temp());
        await writeFile(tempPath, pdfBuffer);

        const fileName = Date.now().toString() + '_' + filename;

        const cleanup = async (err: Error) => {
            if (err) {
                //this.logger.error(`Error sending file <${tempFileName}>`);
                //this.logger.error(err.message);
            }
            else {
                this.logger.info(`File <${tempFileName}> sent successfully`);
                await unlink(tempPath);
            }
        };
        
        //const fn = bindTrailingArgs(res, res.download, [tempPath, filename, cleanup], 1);
        //await promisify(fn)();
        //res.download(tempPath, fileName, cleanup);
        await promisify(() => { res.download(tempPath, fileName, cleanup); })();

        return res.end();
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/pdf-info')
    async introPdf(@Req() req: Request, @Res() res: Response) {
        const { filename, path } = ASSETS.Templates.OralDefenseRegistration;
        const buffer = await readFile(path);
        const pdfDoc = await PDFDocument.load(buffer);
        const form = pdfDoc.getForm();

        const output: string[] = [];
        let i = 1;
        for(const field of form.getFields()) {
            let description = 
            `#${i++}`.padEnd(10)
            +   `Field name: ${field.getName()}`.padEnd(40)
            +   `Field type: ${field.constructor.name}`.padEnd(40);
            if (field instanceof PDFRadioGroup) {
                description += '  Options:[' + field.getOptions().join(', ') + ']'; 
            }
            output.push(description);
        }

        this.logger.info('\n' + output.join('\n'));

        return output;
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/received-notification')
    async testReceivedNotification() {
        const userId = '10001';
        const queryRequest = new NotificationsQueryRequest();

        return await this.notificationService.getReceivedNotifications(userId, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Post('/send-notification/:to-id')
    async testSendNotification(@Param('to-id') toId: string) {
        const fromId = undefined;
        toId = toId ?? 1;

        const msg = await this.notificationService.sendNotification({
            senderId: fromId,
            receiverId: toId,
            title: 'Test System Message',
            content: 'This is a system message',
        });
        
        return 'Success';
    }
}