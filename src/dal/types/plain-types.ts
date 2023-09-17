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
    ProgramAdminGroup, 
    RefreshToken, 
    Request, 
    RequestData, 
    RequestStakeholder, 
    Role, 
    State, 
    Student, 
    StudentAttempt, 
    StudentAttemptRequest, 
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
    _count: {
        studentAttempts: number
    },
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

export type PlainProgramWithAdminGroup = Program & {
    programAdminGroup: ProgramAdminGroup | null
};

export type PlainStudentAttempt = StudentAttempt & {
    thesis: Thesis,
    bachelorThesisRegistration: Pick<BachelorThesisRegistration, 'id'> | null,
    oralDefenseRegistration: Pick<OralDefenseRegistration, 'id'> | null,
    bachelorThesisAssessment: Pick<BachelorThesisAssessment, 'id'> | null,
    oralDefenseAssessment: Pick<OralDefenseAssessment, 'id'> | null,
    studentAttemptRequest: Pick<StudentAttemptRequest, 'requestId'> | null,
};

export type PlainBachelorThesisRegistration = BachelorThesisRegistration & {
    studentAttempt: StudentAttempt & {
        student: Student,
        thesis: Thesis & {
            creator: Lecturer,
        },
        supervisor2: Lecturer,
    },
};

export type PlainOralDefenseRegistration = OralDefenseRegistration & {
    studentAttempt: StudentAttempt & {
        student: Student,
        thesis: Thesis & {
            creator: Lecturer,
        },
        supervisor2: Lecturer,
    },
};

export type PlainBachelorThesisAssessment = BachelorThesisAssessment & {
    studentAttempt: StudentAttempt & {
        student: Student,
        thesis: Thesis & {
            creator: Lecturer,
        },
        supervisor2: Lecturer,
    },
};

export type PlainOralDefenseAssessment = OralDefenseAssessment & {
    studentAttempt: StudentAttempt & {
        student: Student,
        thesis: Thesis & {
            creator: Lecturer,
        },
        supervisor2: Lecturer,
    },
};

export type PlainBachelorThesisEvaluation = BachelorThesisEvaluation & {
    studentAttempt: StudentAttempt & {
        thesis: Thesis & {
            creator: Lecturer,
        },
        student: Student,
    },
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