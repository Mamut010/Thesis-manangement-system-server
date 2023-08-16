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
    BachelorThesisAssessment: {
        TitleOfBachelorThesis: 'Title of bachelor thesis',
        FutherParticipants: 'Further participants',
        Surname: 'Surname',
        FirstExaminerName: '1st Examiner Name',
        SecondExaminerName: '2nd Examiner Name',
        AssessmentDate: 'Date',
        OverallGrade: 'Overall grade',
        Forename: 'Forename',
        MatriculationNo: 'Matriculation Number',
        IndividualOrGroupStudy: {
            Name: 'Study',
            Options: {
                Individual: 'Individual study',
                Group: 'Group study'
            },
        },
        FirstExaminerGrade: '1st Examiner Grade',
        SecondExaminerGrade: '2nd Examiner Grade',
        Signature1stExaminer: 'Signature 1st Examiner',
        Signature2ndExaminer: 'Signature 2nd Examiner',
        AssessmentOfTheBachelorThesis: 'Assessment of the bachelor thesis',
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
    },
    OralDefenseRegistration: {
        DateReceived: 'Date received',
        DateOfAdmission: 'Date of admission',
        Surname: 'Surname',
        MatriculationNo: 'Matriculation Number',
        FirstExaminerName: '1st Examiner Name',
        SecondExaminerName: '2nd Examiner Name',
        Date: 'Date',
        Weekday: 'Weekday',
        Time: 'Time',
        Room: 'Room',
        Forename: 'Forename',
        FirstExaminerSignature: '1st Examiner Signature',
        SecondExaminerSignature: '2nd Examiner Signature',
        AreSpectatorsAllowed: {
            Name: 'Are spectators allowed',
            Options: {
                Yes: 'Yes',
                No: 'No',
            }
        },
        ConcernedAgreed: {
            Name: 'Concerned agreed',
            Options: {
                Yes: 'Yes',
                No: 'No',
            }
        }
    },
    OralDefenseAssessment: {
        Record: 'Record',
        Surname: 'Surname',
        Date: 'Date',
        Start: 'Start',
        FirstExaminerName: '1st Examiner Name',
        SecondExaminerName: '2nd Examiner Name',
        OverallGrade: 'Overall grade',
        Forename: 'Forename',
        MatriculationNo: 'Matriculation Number',
        Place: 'Place',
        Finish: 'Finish',
        SufficientStateOfHealth: {
            Name: 'Sufficient state of health',
            Options: {
                Yes: 'Yes',
                No: 'No',
            }
        },
        FirstExaminerGrade: '1st Examiner Grade',
        SecondExaminerGrade: '2nd Examiner Grade',
        AssessmentDate: 'Assessment date',
        Signature1stExaminer: 'Signature 1st Examiner',
        Signature2ndExaminer: 'Signature 2nd Examiner',
    }
} as const