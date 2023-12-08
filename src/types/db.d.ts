export interface AdminData {
  account_type: string; // not use in table
  address: string; // not use in table
  birthday: string; // not use in table
  country: string; // not use in table
  department_name: string;
  description: string;
  email: string;
  first_name: string;
  last_name: string;
  sex: string;
  user_id: string;
  user_name: string;
}

export interface CourseData {
  course_id: string;
  course_name: string;
  course_description: string;
  lecturer_id: string;
  modified_at: string;
  registered: boolean;
}

export interface DepartmentData {
  department_id: string;
  email: string;
  address: string;
  description: string;
  department_name: string;
}

export interface DocumentData {
  document_id: string;
  author: string;
  title: string;
  subject: string;
}

export interface LectureData {
  lecture_id: string;
  lecture_name: string;
  lecture_content: string; // change to description
}

export interface LecturerData {
  user_id: string;
  department_name: string;
  lecturer_degree: string;
  lecturer_specialty: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  country: string;
}

export interface QuestionData {
  question_id: string;
  question_content: string;
  created_at: Date;
  answer_date: Date | null; // answer or not
  student_id: string;
  lecturer_id: string | null; // answer or not
  student_name: string;
  lecturer_name: string | null; // answer or not
}

export interface StudentData {
  user_id: string;
  department_id: string;
  student_status: string;
  student_class: string;
  student_degree: string;
  student_program: string;
  student_major: string;
  email: string;
  user_name: string;
  address: string;
  first_name: string;
  last_name: string;
  birthday: string;
  sex: string;
  description: string;
  country: string;
  department_name: string;
  date_of_enrollment: Date;
}

export interface TicketData {
  ticket_id: string;
  ticket_type: string;
  created_at: string;
  process_at: string;
  description: string;
  status: string;
  user_id: string;
  admin_id: string;
  author: string;
  admin_handler: string;
}

export interface QuizData {
  quiz_id: string;
  title: string;
  description: string;
  num_of_questions: number;
}

export interface QuizQuestionData {
  quiz_question_id: string;
  title: string;
  description: string;
  max_point: string;
  quiz_question_type: string;
  short_answer: string | null;
  multiple_choice_answer: string | null;
  is_correct: boolean | null;
}

export interface AttemptData {
  attempt_detail_id: string;
  user_name: string;
  quiz_id: string;
  answer_content: string | null ;
  created_at: Date;
}
