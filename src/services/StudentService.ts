import instance from "@/utils/http-common";
import { DepartmentData, TicketData, CourseData } from "@/types/db";

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

const StudentService = {
  getDepartmentList,
  getTicketList,
  getCourseList,
};

export default StudentService;
