import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { Seeder } from "./seeder";

function hash(toHash: string): string {
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
            data: roles.map(role => { return { name: role, description: `The ${role}` }; })
        }),
        prisma.user.createMany({
            data: [
                { 
                    userId: '1', username: 'admin1', password: hash('1234'), 
                    roleId: roleIds['Admin'],
                },
                { 
                    userId: '2', username: 'admin2', password: hash('1234'), 
                    roleId: roleIds['Admin'],
                },
                { 
                    userId: '101', username: 'lecturer1.1', password: hash('lecturer1.1'), 
                    roleId: roleIds['Lecturer1.1'],
                },
                { 
                    userId: '401', username: 'lecturer1.2', password: hash('lecturer1.2'), 
                    roleId: roleIds['Lecturer1.2'],
                },
                { 
                    userId: '701', username: 'lecturer2', password: hash('lecturer2'), 
                    roleId: roleIds['Lecturer2'],
                },
                { 
                    userId: '10001', username: 'student1', password: hash('student1'), 
                    roleId: roleIds['Student'],
                },
                { 
                    userId: '10002', username: 'student2', password: hash('student2'), 
                    roleId: roleIds['Student'],
                },
                { 
                    userId: '10003', username: 'student3', password: hash('student3'), 
                    roleId: roleIds['Student'],
                },
            ]
        }),
        prisma.admin.createMany({
            data: [
                { userId: '1', title: 'CSE Program', contact: 'ABC City' },
                { userId: '2', title: 'Mr. Fred', contact: 'HCM City' },
            ]
        }),
        prisma.lecturer.createMany({
            data: [
                { userId: '101', title: 'Dr. A11', bio: 'Sample lecturer1.1' },
                { userId: '401', title: 'Dr. A12', bio: 'Sample lecturer1.2' },
                { userId: '701', title: 'Dr. A2', bio: 'Sample lecturer2' },
            ]
        }),
        prisma.program.createMany({
            data: [
                { title: 'CSE', description: 'Computer Science Engineering' },
                { title: 'MEN', description: 'Mechanical Engineering' },
            ]
        }),
        prisma.student.createMany({
            data: [
                { userId: '10001', programId: 1, intake: 2019, surname: 'Doe', forename: 'John' },
                { userId: '10002', programId: 1, intake: 2019, surname: 'Doe', forename: 'Jane' },
                { userId: '10003', programId: 2, intake: 2021, surname: 'Doe', forename: 'Mary' },
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
                { title: 'Admin Room', description: 'Sample location description 1' },
                { title: 'Academic Cluster', description: 'Sample location description 2' },
            ]
        }),
        prisma.bachelorThesisRegistration.createMany({
            data: [
                { 
                    thesisId: 1, studentId: '10001', supervisor1Id: '101', supervisor2Id: '401', adminId: '1',
                    furtherParticipants: 'Jane Doe', 
                    supervisor1Confirmed: true
                },
                { 
                    thesisId: 2, studentId: '10002', supervisor1Id: '101', supervisor2Id: '401', adminId: '1',
                    furtherParticipants: 'John Doe',
                    supervisor1Confirmed: true, supervisor2Confirmed: false
                },
            ]
        }),
        prisma.oralDefenseRegistration.createMany({
            data: [
                { 
                    thesisId: 1, studentId: '10001', supervisor1Id: '101', supervisor2Id: '401' 
                },
                { 
                    thesisId: 2, studentId: '10002', supervisor1Id: '101', supervisor2Id: '401' 
                },
            ]
        }),
        prisma.bachelorThesisAssessment.createMany({
            data: [
                { 
                    thesisId: 1, studentId: '10001', supervisor1Id: '101', supervisor2Id: '401',
                    furtherParticipants: 'Jane Doe', 
                    supervisor1Grade: 1, supervisor2Grade: 1,
                },
                { 
                    thesisId: 2, studentId: '10002', supervisor1Id: '101', supervisor2Id: '401',
                    furtherParticipants: 'John Doe',
                    supervisor1Grade: 1, supervisor2Grade: 1,
                }
            ]
        }),
        prisma.oralDefenseAssessment.createMany({
            data: [
                { 
                    thesisId: 1, studentId: '10001', supervisor1Id: '101', supervisor2Id: '401' 
                },
                { 
                    thesisId: 2, studentId: '10002', supervisor1Id: '101', supervisor2Id: '401' 
                },
            ]
        }),
        prisma.bachelorThesisEvaluation.createMany({
            data: [
                {
                    thesisId: 1, studentId: '10001', supervisorId: '101',
                    title: 'Mr', date: new Date(), supervisorConfirmed: true
                },
                {
                    thesisId: 2, studentId: '10002', supervisorId: '401',
                    title: 'Ms'
                }
            ]
        }),
    ]);
}