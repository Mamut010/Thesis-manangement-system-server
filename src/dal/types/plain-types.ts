import { 
    Admin, 
    BachelorThesisAssessment, 
    BachelorThesisEvaluation, 
    BachelorThesisRegistration, 
    Field, 
    Group, 
    Lecturer, 
    Location, 
    Notification, 
    OralDefenseAssessment, 
    OralDefenseRegistration, 
    Process, 
    Program, 
    RefreshToken, 
    Request, 
    RequestData, 
    RequestStakeholder, 
    Role, 
    State, 
    Student, 
    Thesis, 
    Topic, 
    User, 
    WorkflowStaticType
} from "../../core/models"

export type PlainUser = User & {
    role: Role
};

export type PlainRefreshToken = RefreshToken;

export type PlainNotification = Notification;

export type PlainAdmin = Admin & {
    user: User,
};

export type PlainStudent = Student & {
    user: User,
    program: Program | null,
};

export type PlainLecturer = Lecturer & {
    user: User & {
        role: Role
    },
};

export type PlainRole = Role;

export type PlainProgram = Program;

export type PlainField = Field;

export type PlainTopic = Topic;

export type PlainLocation = Location;

export type PlainThesis = Thesis & {
    creator: Lecturer,
    topic: Topic | null,
    field: Field | null,
}

export type Supervisors = {
    supervisor1: Lecturer | null,
    supervisor2: Lecturer | null,
};

export type PlainStudentWithThesis = {
    student: Student,
    thesis: Thesis,
}

export type PlainBachelorThesisRegistration = BachelorThesisRegistration & PlainStudentWithThesis & Supervisors & {
    admin: Admin | null
};

export type PlainOralDefenseRegistration = OralDefenseRegistration & PlainStudentWithThesis & Supervisors;

export type PlainBachelorThesisAssessment = BachelorThesisAssessment & PlainStudentWithThesis & Supervisors;

export type PlainOralDefenseAssessment = OralDefenseAssessment & PlainStudentWithThesis & Supervisors;

export type PlainBachelorThesisEvaluation = BachelorThesisEvaluation & PlainStudentWithThesis & {
    supervisor: Lecturer
};

export type WithUserId = Pick<User, 'userId'>; 

export type PlainProcess = Process;

export type PlainRequestStakeholder = Omit<RequestStakeholder, 'requestId'> & {
    group: PlainGroup | null,
};

export type PlainGroup = Group & {
    users: WithUserId[]
}

export type PlainRequest = Request & {
    state: State & {
        stateType: WorkflowStaticType
    },
    requestStakeholders: RequestStakeholder[],
};

export type PlainRequestData = RequestData;