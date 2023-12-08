import instance from "@/utils/http-common";
import { DepartmentData, TicketData } from "@/types/db";

const getDepartmentList = () => {
  return instance.post<DepartmentData[]>("/", {
    query: "SELECT * FROM department",
  });
};

const getTicketList = (lecturerID: string | undefined) => {
  return instance.post<TicketData[]>("/", {
    query: `SELECT t.*, user_info.user_name as admin_handler FROM
      (SELECT tic.*, user_info.user_name as author FROM ticket tic 
      JOIN user_information user_info ON tic.user_id = user_info.user_id) t
    JOIN user_information user_info ON t.admin_id = user_info.user_id
    WHERE t.user_id = '${lecturerID}'`,
  });
};

const LecturerService = {
  getDepartmentList,
  getTicketList
}

export default LecturerService;



