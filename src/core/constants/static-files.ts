import { templates } from "../../utils/path-helpers";

export const StaticFiles = {
    RegistrationForBachelorThesis: {
        filename: 'Registration for Bachelor Thesis.docx',
        path: templates('Registration for Bachelor Thesis.docx')
    },
    AssessmentOfBachelorThesis: {
        filename: 'Assessment of Bachelor Thesis.pdf',
        path: templates('Assessment of Bachelor Thesis.pdf'),
    },
    AssessmentOfOralDefense: {
        filename: 'Assessment of Oral Defense.pdf',
        path: templates('Assessment of Oral Defense.pdf'),
    },
} as const;