import React from "react";
import LecturerService from "@services/LecturerService";
import { Table, Spin, Typography, Tag } from "antd";
import { CourseData } from "@/types/db";
import CourseLecture from "./_courseID";

const Course = ({
  setItems,
  coursePath,
  lecturerID,
}: {
  setItems: React.Dispatch<React.SetStateAction<string>>;
  coursePath: string;
  lecturerID: string | undefined;
}) => {
  const [courseList, setCourseList] = React.useState<CourseData[] | undefined>(
    undefined
  );
  React.useEffect(() => {
    LecturerService.getCourseList(lecturerID).then(
      ({ data }: { data: CourseData[] }) => {
        data.forEach((d) => {
          const { modified_at } = d;
          d.modified_at = new Date(modified_at).toDateString();
        });
        setCourseList(data);
      }
    );
  }, [lecturerID]);
  if (coursePath.split("/").length > 1) {
    return (
      <CourseLecture
        coursePath={coursePath.replace("Course/", "")}
        setItems={setItems}
        lecturerID={lecturerID}
      />
    );
  }
  const columns = [
    {
      title: "Course ID",
      dataIndex: "course_id",
      key: "course_id",
      render: (text: string) => (
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
      title: "Available",
      render: () => (
        <Tag color="#87d068" >Active</Tag>
      )
    },
    {
      title: "Role",
      render: () => (
        <div>In-class lecturer</div>
      )
    }
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
