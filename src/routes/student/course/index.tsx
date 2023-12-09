import React from "react";
import StudentService from "@services/StudentService";
import { Table, Spin, Typography } from "antd";
import { CourseData } from "@/types/db";
import CourseLecture from "./_courseID";

const Course = ({
  setItems,
  coursePath,
  studentID,
}: {
  setItems: React.Dispatch<React.SetStateAction<string>>;
  coursePath: string;
  studentID: string | undefined;
}) => {
  const [courseList, setCourseList] = React.useState<CourseData[] | undefined>(
    undefined
  );
  React.useEffect(() => {
    StudentService.getCourseList(studentID).then(
      ({ data }: { data: CourseData[] }) => {
        data.forEach((d) => {
          const { modified_at } = d;
          d.modified_at = new Date(modified_at).toDateString();
        });
        setCourseList(data);
      }
    );
  }, [studentID]);
  if (coursePath.split("/").length > 1) {
    return (
      <CourseLecture
        coursePath={coursePath.replace("Course/", "")}
        setItems={setItems}
        studentID={studentID}
      />
    );
  }
  const columns = [
    {
      title: "Course ID",
      dataIndex: "course_id",
      key: "course_id",
      render: (text: string, record: CourseData) =>
        record.registered ? (
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setItems(`Course/${text}`);
            }}
            title={text}
          >
            {text}{" "}
          </a>
        ) : (
          <div>{text}</div>
        ),
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Course Description",
      dataIndex: "course_description",
      key: "course_description",
    },
    {
      title: "Lecturer ID",
      dataIndex: "lecturer_id",
      key: "lecturer_id",
    },
    {
      title: "",
      dataIndex: "registered",
      key: "registered",
      render: (d: boolean, record: CourseData) => (
        <div>
          {d ? (
            "In-class"
          ) : (
            <a
              onClick={(e) => {
                e.preventDefault(); // Handle confirm box
                const payload = {
                  student_id: studentID,
                  course_id: record.course_id,
                  date_of_enrollment: new Date(),
                };
                StudentService.postStudentTakesCourse(payload)
                  .then(() => {
                    console.log("Register successful!");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Register
            </a>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={2}>All available courses</Typography.Title>
      {courseList ? (
        <Table
          dataSource={courseList}
          columns={columns}
          rowKey={(d) => {
            return d.course_id;
          }}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default Course;
