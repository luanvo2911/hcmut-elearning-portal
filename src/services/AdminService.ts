import instance from "../utils/http-common";
import AdminData from "../types/AdminData";
import LecturerData from "../types/LecturerData";
import StudentData from "../types/StudentData";
import TicketData from "../types/TicketData";
import CourseData from "../types/CourseData";
import DepartmentData from "../types/DepartmentData";

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
      "SELECT * FROM ticket"
  })
}

const getCourseList = () => {
  return instance.post<CourseData[]>("/", {
    query:
      "SELECT * FROM course"
  })
}

const getDepartmentList = () => {
  return instance.post<DepartmentData[]>("/", {
    query:
      "SELECT * FROM department"
  })
}

const AdminService = {
  getAdminList,
  getLecturerList,
  getStudentList,
  getTicketList,
  getCourseList,
  getDepartmentList
};

export default AdminService;
