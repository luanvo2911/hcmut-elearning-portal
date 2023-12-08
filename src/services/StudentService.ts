import instance from "@/utils/http-common";
import {
  DepartmentData,
  TicketData,
  CourseData,
  LectureData,
  QuestionData,
  DocumentData,
  QuizData,
  QuizQuestionData,
  AttemptData
} from "@/types/db";

const getDepartmentList = () => {
  return instance.post<DepartmentData[]>("/", {
    query: "SELECT * FROM department",
  });
};

const getTicketList = (studentID: string | undefined) => {
  return instance.post<TicketData[]>("/", {
    query: `SELECT t.*, user_info.user_name as admin_handler FROM
      (SELECT tic.*, user_info.user_name as author FROM ticket tic 
      JOIN user_information user_info ON tic.user_id = user_info.user_id) t
    JOIN user_information user_info ON t.admin_id = user_info.user_id
    WHERE t.user_id = '${studentID}'`,
  });
};

const getCourseList = (student_id: string | undefined) => {
  return instance.post<CourseData[]>("/", {
    query: `SELECT 
      c.*, 
      CASE 
        WHEN EXISTS (SELECT 1 FROM student_takes_course st WHERE st.student_id = '${student_id}' AND st.course_id = c.course_id  )
        THEN true
        ELSE false
      END AS registered
    FROM course c;`,
  });
};

const getLectureList = (courseID: string) => {
  return instance.post<LectureData[]>("/", {
    query: `SELECT * FROM lecture lec WHERE lec.course_id = '${courseID}'`,
  });
};

const getQuestionList = (courseID: string) => {
  return instance.post<QuestionData[]>("/", {
    query: `SELECT * FROM  
      (SELECT f.*, user_info.user_name as lecturer_name FROM
        (SELECT forum.*, user_info.user_name as student_name FROM  
          (SELECT q.*, ans.answer_id, ans.answer_content, ans.answer_date FROM answer ans 
          INNER JOIN question q ON q.question_id = ans.question_id
        ) forum, user_information user_info
        WHERE forum.student_id = user_info.user_id) f, user_information user_info
      WHERE f.lecturer_id = user_info.user_id) q 
    WHERE q.course_id = '${courseID}'`,
  });
};

const getDocumentList = (lectureID: string) => {
  return instance.post<DocumentData[]>("/", {
    query: `SELECT * FROM lecture_document lec_doc WHERE lec_doc.lecture_id = '${lectureID}' `,
  });
};

const getQuizList = (lectureID: string) => {
  return instance.post<QuizData[]>("/", {
    query: `
      SELECT t.quiz_id, t.title, t.description, COUNT(qq.quiz_question_id) AS num_of_questions
      FROM (SELECT q.quiz_id , q.title, q.description
            FROM quiz q
            WHERE q.lecture_id = '${lectureID}') t
      LEFT JOIN quiz_question AS qq ON t.quiz_id = qq.quiz_id
      GROUP BY t.quiz_id, t.title, t.description
    `,
  });
};

const getQuizQuestionList = (quizID: string) => {
  return instance.post<QuizQuestionData[]>("/", {
    query: `
    SELECT * FROM
      (SELECT t.*, mca.multiple_choice_answer, mca.is_correct FROM
      (SELECT qq.quiz_id, qq.quiz_question_id, qq.title, qq.description, qq.max_point, qq.quiz_question_type, sa.correct_answer AS short_answer
      FROM quiz_question qq 
      FULL JOIN correct_answer sa ON sa.quiz_question_id = qq.quiz_question_id) t 
      FULL JOIN multiple_choice_answer mca ON mca.quiz_question_id = t.quiz_question_id) t 
    WHERE t.quiz_id = '${quizID}'
    `,
  });
};

const getAttemptDetail = (quizID: string, studentID: string | undefined) => {
  return instance.post<AttemptData[]>("/", {
    query: `
    SELECT * FROM  
      (SELECT t.*, user_info.user_name FROM
        (SELECT * FROM 
          (SELECT t.*, ad.created_at FROM
            (SELECT a.attempt_detail_id, a.student_id, a.quiz_id, at.attempt_answer_id, at.answer_content FROM attempt a
            FULL JOIN attempt_answer at ON a.attempt_detail_id = at.attempt_detail_id) t
          FULL JOIN attempt_detail ad ON ad.attempt_detail_id = t.attempt_detail_id) t
        WHERE t.quiz_id = '${quizID}') t
      JOIN user_information user_info ON t.student_id = user_info.user_id) t
    WHERE t.student_id = '${studentID}'
    `,
  });
};

const StudentService = {
  getAttemptDetail,
  getDocumentList,
  getDepartmentList,
  getTicketList,
  getCourseList,
  getLectureList,
  getQuestionList,
  getQuizList,
  getQuizQuestionList
};

export default StudentService;
