import instance from "@utils/http-common";

import {
  AdminData,
  LecturerData,
  LectureData,
  StudentData,
  TicketData,
  CourseData,
  DepartmentData,
  QuestionData,
  DocumentData,
} from "@/types/db";

const getAdminList = () => {
  return instance.post<AdminData[]>("/", {
    query:
      "SELECT uni_admin.*, user_info.*, d.department_name \
      FROM administrator uni_admin, user_information user_info, department d \
      WHERE uni_admin.user_id = user_info.user_id and uni_admin.department_id=d.department_id \
      ORDER BY uni_admin.user_id ASC",
  });
};

const getLecturerList = () => {
  return instance.post<LecturerData[]>("/", {
    query:
      "SELECT uni_lecturer.*, user_info.*, d.department_name \
      FROM lecturer uni_lecturer, user_information user_info, department d \
      WHERE uni_lecturer.user_id = user_info.user_id and uni_lecturer.department_id = d.department_id \
      ORDER BY uni_lecturer.user_id ASC",
  });
};

const getStudentList = () => {
  return instance.post<StudentData[]>("/", {
    query:
      "SELECT uni_student.*, user_info.*, d.department_name \
      FROM student uni_student, user_information user_info, department d \
      WHERE uni_student.user_id = user_info.user_id and uni_student.department_id = d.department_id \
      ORDER BY uni_student.user_id ASC",
  });
};

const getTicketList = () => {
  return instance.post<TicketData[]>("/", {
    query: 
    `SELECT t.*, user_info.user_name as admin_handler FROM
      (SELECT tic.*, user_info.user_name as author FROM ticket tic 
      JOIN user_information user_info ON tic.user_id = user_info.user_id) t
    JOIN user_information user_info ON t.admin_id = user_info.user_id`,
  });
};

const getCourseList = () => {
  return instance.post<CourseData[]>("/", {
    query: "SELECT * FROM course",
  });
};

const getDepartmentList = () => {
  return instance.post<DepartmentData[]>("/", {
    query: "SELECT * FROM department",
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

const getRegisteredStudentInCourse = (courseID: string) => {
  return instance.post<StudentData[]>("/", {
    query: `SELECT t.*, stu.student_degree, stu.student_major, stu.student_program, stu.department_id FROM
      (SELECT user_info.*, reg.date_of_enrollment 
      FROM user_information user_info JOIN student_takes_course reg on reg.student_id = user_info.user_id
    WHERE reg.course_id = '${courseID}') t, student stu WHERE stu.user_id = t.user_id`,
  });
};

const AdminService = {
  getAdminList,
  getLecturerList,
  getLectureList,
  getStudentList,
  getTicketList,
  getCourseList,
  getDepartmentList,
  getQuestionList,
  getDocumentList,
  getRegisteredStudentInCourse,
};

export default AdminService;
