export const TEMPLATE_FIELDS = {
    BachelorThesisRegistration: {
        TitleOfBachelorThesis: [
            'Title of Bachelor Thesis1', 
            'Title of Bachelor Thesis2', 
            'Title of Bachelor Thesis3',
            'Title of Bachelor Thesis4'
        ],
        FurtherParticipants: 'further participants',
        Assessor: 'Assessor',
        CoAssessor: 'Co-Assessor',
        Surname: 'Surname',
        Forename: 'Forename',
        MatriculationNo: 'Matriculation Number',
        DateOfBirth: 'Date of birth',
        PlaceOfBirth: 'Place of birth',
        Issued: 'Issued',
        DeadlineCopy: 'Deadline copy',
        ExtensionGrantedUntil: 'Extension granted until',
        Signature: 'Signature',
        AssessorSignature: 'Assessor Signature',
        CoAssessorSignature: 'Co-Assessor Signature',
        AuthorSignature: 'Author Signature',
        ChairmanOfExamination: 'Chairman of examination',
        DateOfIssue: 'Date of Issue',
        IndividualOrGroupStudy: {
            Name: 'Study',
            Options: {
                Individual: 'individual study',
                Group: 'group study'
            },
        },
        AssessorDate: 'Assessor Date',
        CoAssessorDate: 'Co-Assessor Date',
        AuthorDate: 'Author Date',
    },
    BachelorThesisEvaluation: {
        MrOrMs: {
            Name: 'Title',
            Options: {
                Mr: 'Mr',
                Ms: 'Ms',
            }
        },
        Surname: 'Surname',
        Forename: 'Forename',
        MatriculationNo: 'Matriculation Number',
        ThesisTitle: 'Thesis Title',
        Date: 'Date',
        Signature1stExaminer: 'Signature 1st Examiner',
    }
} as const