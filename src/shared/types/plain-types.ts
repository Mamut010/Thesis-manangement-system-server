import { 
    Admin, 
    BachelorThesisAssessment, 
    BachelorThesisEvaluation, 
    BachelorThesisRegistration, 
    Field, 
    Lecturer, 
    Location, 
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

export type PlainTopic = Topic;

export type PlainLocation = Location;

export type PlainThesis = Thesis & {
    topic: Topic | null,
    field: Field | null,
}

export type Supervisors = {
    supervisor1: Lecturer | null,
    supervisor2: Lecturer | null,
};

export type PlainStudentWithThesis = {
    student: PlainStudent,
    thesis: Thesis,
}

export type PlainBachelorThesisRegistration = BachelorThesisRegistration & Supervisors & PlainStudentWithThesis;

export type PlainOralDefenseRegistration = OralDefenseRegistration & Supervisors & PlainStudentWithThesis;

export type PlainBachelorThesisAssessment = BachelorThesisAssessment & Supervisors & PlainStudentWithThesis;

export type PlainOralDefenseAssessment = OralDefenseAssessment & Supervisors & PlainStudentWithThesis;

export type PlainBachelorThesisEvaluation = BachelorThesisEvaluation & PlainStudentWithThesis;