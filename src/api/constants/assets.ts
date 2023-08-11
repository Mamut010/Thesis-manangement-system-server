import { templates } from "../../utils/path-helpers";

export const ASSETS = {
    Templates: {
        BachelorThesisRegistration: {
            filename: 'Registration for Bachelor Thesis.pdf',
            path: templates('Registration for Bachelor Thesis.pdf')
        },
        BachelorThesisAssessment: {
            filename: 'Assessment of Bachelor Thesis.pdf',
            path: templates('Assessment of Bachelor Thesis.pdf'),
        },
        OralDefenseAssessment: {
            filename: 'Assessment of Oral Defense.pdf',
            path: templates('Assessment of Oral Defense.pdf'),
        },
    }
} as const;