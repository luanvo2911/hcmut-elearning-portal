import React from "react";
import AdminService from "@services/AdminService";
import { Table, Spin, Button, Typography } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { CourseData } from "@/types/db";
import CourseLecture from "./_courseID";

const Course = ({
  setItems,
  coursePath,
}: {
  setItems: React.Dispatch<React.SetStateAction<string>>;
  coursePath: string;
}) => {
  const [courseList, setCourseList] = React.useState<CourseData[] | undefined>(
    undefined
  );
  React.useEffect(() => {
    AdminService.getCourseList().then(({ data }: { data: CourseData[] }) => {
      data.forEach((d) => {
        const { modified_at } = d;
        d.modified_at = new Date(modified_at).toDateString();
      });
      setCourseList(data);
    });
  }, [courseList]);
  if (coursePath.split("/").length > 1) {
    return (
      <CourseLecture
        coursePath={coursePath.replace("Course/", "")}
        setItems={setItems}
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
          {text}
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
      title: "Lecturer ID",
      dataIndex: "lecturer_id",
      key: "lecturer_id",
    },
    {
      title: "Modified at",
      dataIndex: "modified_at",
      key: "modified_at",
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Title level={2}>All available courses</Typography.Title>
        <Button
          type="primary"
          onClick={() => {
            setCourseList(undefined);
          }}
        >
          <UndoOutlined />
        </Button>
      </div>
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
