import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { Seeder } from "./seeder";

function hash(toHash: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(toHash, salt);
}

export const DefaultSeeder: Seeder = async (prisma: PrismaClient) => {
    const roles = ['Admin', 'Student', 'Lecturer1.1', 'Lecturer1.2', 'Lecturer2'] as const;

    const roleIds: { readonly [role in typeof roles[number]]: number } = roles.reduce((res, role, index) => { 
        res[role] = index + 1; 
        return res; 
    }, {} as { [role in typeof roles[number]]: number });

    await prisma.$transaction([
        prisma.role.createMany({
            data: roles.map(role => { return { name: role }; })
        }),
        prisma.user.createMany({
            data: [
                { 
                    userId: 1, username: 'admin1', password: hash('1234'), 
                    roleId: roleIds['Admin'], email: '1@example.com',
                },
                { 
                    userId: 101, username: 'lecturer1.1', password: hash('lecturer1.1'), 
                    roleId: roleIds['Lecturer1.1'], email: '101@example.com',
                },
                { 
                    userId: 401, username: 'lecturer1.2', password: hash('lecturer1.2'), 
                    roleId: roleIds['Lecturer1.2'], email: '401@example.com',
                },
                { 
                    userId: 701, username: 'lecturer2', password: hash('lecturer2'), 
                    roleId: roleIds['Lecturer2'], email: '701@example.com', 
                },
                { 
                    userId: 10001, username: 'student1', password: hash('student1'), 
                    roleId: roleIds['Student'], email: '10001@example.com',
                    surname: 'Doe', forename: 'John',
                },
                { 
                    userId: 10002, username: 'student2', password: hash('student2'), 
                    roleId: roleIds['Student'], email: '10002@example.com',
                    surname: 'Doe', forename: 'Jane',
                },
            ]
        }),
        prisma.admin.createMany({
            data: [
                { userId: 1, contact: 'ABC City' },
            ]
        }),
        prisma.lecturer.createMany({
            data: [
                { userId: 101, title: 'Dr. A11', bio: 'Sample lecturer1.1' },
                { userId: 401, title: 'Dr. A12', bio: 'Sample lecturer1.2' },
                { userId: 701, title: 'Dr. A2', bio: 'Sample lecturer2' },
            ]
        }),
        prisma.student.createMany({
            data: [
                { userId: 10001, intake: 'CSE2019' },
                { userId: 10002, intake: 'EEIT2019' },
            ]
        }),
        prisma.topic.createMany({
            data: [
                { title: 'Thesis Management System', description: 'Sample topic description' },
            ]
        }),
        prisma.field.createMany({
            data: [
                { title: 'WD', description: 'Web development' },
            ]
        }),
        prisma.thesis.createMany({
            data: [
                { topicId: 1, fieldId: 1, title: 'Thesis Management System: BE' },
                { topicId: 1, fieldId: 1, title: 'Thesis Management System: FE' },
            ]
        }),
        prisma.location.createMany({
            data: [
                { title: 'Admin Room', description: 'Sample location description' },
            ]
        }),
        prisma.bachelorThesisRegistration.createMany({
            data: [
                { 
                    thesisId: 1, studentId: 10001, supervisor1Id: 101, supervisor2Id: 401, adminId: 1,
                    furtherParticipants: 'Jane Doe',
                },
                { 
                    thesisId: 2, studentId: 10002, supervisor1Id: 101, supervisor2Id: 401, adminId: 1,
                    furtherParticipants: 'John Doe',
                },
            ]
        }),
        prisma.oralDefenseRegistration.createMany({
            data: [
                { 
                    thesisId: 1, studentId: 10001, supervisor1Id: 101, supervisor2Id: 401 
                },
                { 
                    thesisId: 2, studentId: 10002, supervisor1Id: 101, supervisor2Id: 401 
                },
            ]
        }),
        prisma.bachelorThesisAssessment.createMany({
            data: [
                { 
                    thesisId: 1, studentId: 10001, supervisor1Id: 101, supervisor2Id: 401,
                    furtherParticipants: 'Jane Doe', 
                    supervisor1Grade: 1, supervisor2Grade: 1,
                },
                { 
                    thesisId: 2, studentId: 10002, supervisor1Id: 101, supervisor2Id: 401,
                    furtherParticipants: 'John Doe',
                    supervisor1Grade: 1, supervisor2Grade: 1,
                }
            ]
        }),
        prisma.oralDefenseAssessment.createMany({
            data: [
                { 
                    thesisId: 1, studentId: 10001, supervisor1Id: 101, supervisor2Id: 401 
                },
                { 
                    thesisId: 2, studentId: 10002, supervisor1Id: 101, supervisor2Id: 401 
                },
            ]
        }),
    ]);
}