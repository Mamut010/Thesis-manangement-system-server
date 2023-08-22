import { 
    Admin, 
    BachelorThesisAssessment, 
    BachelorThesisEvaluation, 
    BachelorThesisRegistration, 
    Field, 
    Lecturer, 
    Location, 
    Notification, 
    OralDefenseAssessment, 
    OralDefenseRegistration, 
    Role, 
    Student, 
    Thesis, 
    Topic, 
    User 
} from "../../core/models"

export type PlainUser = User & {
    role: Role
};

export type PlainNotification = Notification;

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

export type PlainBachelorThesisRegistration = BachelorThesisRegistration & PlainStudentWithThesis & Supervisors;

export type PlainOralDefenseRegistration = OralDefenseRegistration & PlainStudentWithThesis & Supervisors;

export type PlainBachelorThesisAssessment = BachelorThesisAssessment & PlainStudentWithThesis & Supervisors;

export type PlainOralDefenseAssessment = OralDefenseAssessment & PlainStudentWithThesis & Supervisors;

export type PlainBachelorThesisEvaluation = BachelorThesisEvaluation & PlainStudentWithThesis & {
    supervisor: Lecturer
};