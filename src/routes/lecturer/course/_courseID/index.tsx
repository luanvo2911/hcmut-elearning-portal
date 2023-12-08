import LecturerService from "@services/LecturerService";
import { LectureData, QuestionData } from "@/types/db";
import React from "react";
import { Table, Typography, Tag, Spin } from "antd";
import LectureDocument from "./document";
import LectureQuizList from "./quiz";

const CourseLecture = ({
  coursePath,
  setItems,
  lecturerID
}: {
  coursePath: string;
  setItems: React.Dispatch<React.SetStateAction<string>>;
  lecturerID: string | undefined;
}) => {
  const [lectureList, setLectureList] = React.useState<
    LectureData[] | undefined
  >(undefined);
  const [questionList, setQuestionList] = React.useState<
    QuestionData[] | undefined
  >(undefined);
  React.useEffect(() => {
    const courseID = coursePath.split("/")[0];

    LecturerService.getLectureList(courseID).then(
      ({ data }: { data: LectureData[] }) => {
        setLectureList(data);
      }
    );
    LecturerService.getQuestionList(courseID).then(
      ({ data }: { data: QuestionData[] }) => {
        setQuestionList(data);
      }
    );
  }, [coursePath]);

  if (coursePath.split("/").length > 1) {
    const insidePath = coursePath.split("/")[1];
    const docOrQuiz = insidePath.split(" ")[1];
    return docOrQuiz == "Documents" ? (
      <LectureDocument lectureID={coursePath.split("/")[1]} />
    ) : (
      <LectureQuizList lecturePath={coursePath.replace(`${coursePath.split("/")[0]}/`, "")} setItems = {setItems} lecturerID = {lecturerID}/>
    );
  }

  const columnsLecture = [
    {
      title: "Lecture ID",
      dataIndex: "lecture_id",
      key: "lecture_id",
    },
    {
      title: "Lecture Name",
      dataIndex: "lecture_name",
      key: "lecture_name",
    },
    {
      title: "Lecture Content",
      dataIndex: "lecture_content",
      key: "lecture_content",
    },
    {
      title: "Documents",
      dataIndex: "lecture_id",
      key: "lecture_id",
      render: (d: string) => {
        return (
          <a
            onClick={() => {
              setItems((prevState) => {
                return prevState + `/${d} Documents`;
              });
            }}
          >
            Documents of {d}
          </a>
        );
      },
    },
    {
      title: "Quizzes",
      dataIndex: "lecture_id",
      key: "lecture_id",
      render: (d: string) => {
        return (
          <a
            onClick={() => {
              setItems((prevState) => {
                return prevState + `/${d} Quizzes`;
              });
            }}
          >
            Quizzes of {d}
          </a>
        );
      },
    },
  ];

  const columnsQuestion = [
    {
      title: "Question ID",
      dataIndex: "question_id",
      key: "question_id",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (d: Date) => {
        return <div>{new Date(d).toDateString()}</div>;
      },
    },
    {
      title: "Question content",
      dataIndex: "question_content",
      key: "question_content",
    },
    {
      title: "Created by",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Answer date",
      dataIndex: "answer_date",
      key: "answer_date",
      render: (d: Date) => {
        return <div>{new Date(d).toDateString()}</div>;
      },
    },
    {
      title: "Answer Content",
      dataIndex: "answer_content",
      key: "answer_content",
    },
    {
      title: "Answered by",
      dataIndex: "lecturer_name",
      key: "lecturer_name",
    },
    {
      title: "Status",
      dataIndex: "lecturer_id",
      key: "status",
      render: (d: string) => {
        return d ? (
          <Tag color="green" key={d}>
            Complete
          </Tag>
        ) : (
          <Tag color="volcano" key={d}>
            In progress
          </Tag>
        );
      },
    },
  ];
  return (
    <div>
      <Typography.Title level={2}>
        Course Lecture of {coursePath}
      </Typography.Title>
      {lectureList ? (
        <Table dataSource={lectureList} columns={columnsLecture} />
      ) : (
        <Spin />
      )}
      <Typography.Title level={2}>
        Course Forum of {coursePath}
      </Typography.Title>
      {lectureList ? (
        <Table dataSource={questionList} columns={columnsQuestion} />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default CourseLecture;
