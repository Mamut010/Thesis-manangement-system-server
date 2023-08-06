import { 
    Admin, 
    BachelorThesisAssessment, 
    BachelorThesisRegistration, 
    Field, 
    Lecturer, 
    OralDefenseAssessment, 
    OralDefenseRegistration, 
    Role, 
    Student, 
    Thesis, 
    Topic, 
    User 
} from "../../core/models"

export type PlainAdmin = Admin & {
    user: User,
};

export type PlainStudent = Student & {
    user: User,
};

export type PlainLecturer = Lecturer & {
    user: User & {
        role: Role
    },
};

export type PlainRole = Role;

export type PlainField = Field;

export type PlainThesis = Thesis & {
    topic: Topic | null,
    field: Field | null,
}

export type PlainThesisWithOptionalField = Thesis & {
    field: Field | null
};

export type Supervisors = {
    supervisor1: Lecturer | null,
    supervisor2: Lecturer | null,
};

export type PlainBachelorThesisRegistration = BachelorThesisRegistration & Supervisors & {
    student: PlainStudent,
    thesis: PlainThesisWithOptionalField,
};

export type PlainOralDefenseRegistration = OralDefenseRegistration & Supervisors & {
    student: PlainStudent,
};

export type PlainBachelorThesisAssessment = BachelorThesisAssessment & Supervisors & {
    student: PlainStudent,
    thesis: PlainThesisWithOptionalField,
};

export type PlainOralDefenseAssessment = OralDefenseAssessment & Supervisors & {
    student: PlainStudent,
};