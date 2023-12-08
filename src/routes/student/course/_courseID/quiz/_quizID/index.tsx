import React from "react";
import { Table, Typography, Spin } from "antd";
import StudentService from "@/services/StudentService";
import { QuizQuestionData, AttemptData } from "@/types/db";

const LectureQuiz = ({ quizIDPath, studentID }: { quizIDPath: string, studentID: string | undefined }) => {
  const quizID = quizIDPath.split(" ")[0];

  const [quizQuestionList, setQuizQuestionList] = React.useState<
    QuizQuestionData[] | undefined
  >(undefined);

  const [attemptList, setAttemptList] = React.useState<
    AttemptData[] | undefined
  >(undefined);

  React.useEffect(() => {
    StudentService.getQuizQuestionList(quizID).then(
      ({ data }: { data: QuizQuestionData[] }) => {
        setQuizQuestionList(data);
      }
    );
    StudentService.getAttemptDetail(quizID, studentID).then(
      ({ data }: { data: AttemptData[] }) => {
        setAttemptList(data);
      }
    );
  }, [quizID, studentID]);

  const columnsQuestion = [
    {
      title: "Question ID",
      dataIndex: "quiz_question_id",
      key: "quiz_question_id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "Max point",
      dataIndex: "max_point",
      key: "max_point",
    },
    {
      title: "Type",
      dataIndex: "quiz_question_type",
      key: "quiz_question_type",
    },
    // {
    //   title: "Short answer",
    //   dataIndex: "short_answer",
    //   key: "short_answer",
    // },
    // {
    //   title: "MCQ answer",
    //   dataIndex: "multiple_choice_answer",
    //   key: "multiple_choice_answer",
    // },
    // {
    //   title: "Is correct",
    //   dataIndex: "is_correct",
    //   key: "is_correct",
    //   render: (text: boolean) =>
    //     text ? (
    //       <Tag color="#108ee9">True</Tag>
    //     ) : text == undefined ? (
    //       ""
    //     ) : (
    //       <Tag color="#f50">False</Tag>
    //     ),
    // },
  ];

  const columnsAttempt = [
    {
      title: "Attempt ID",
      dataIndex: "attempt_detail_id",
      key: "attempt_detail_id"
    },
    {
      title: "Student Name",
      dataIndex: "user_name",
      key: "user_name"
    },
    {
      title: "Quiz ID",
      dataIndex: "quiz_id",
      key: "quiz_id"
    },
    {
      title: "Answer Content",
      dataIndex: "answer_content",
      key: "answer_content"
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: Date) => (
        (new Date(text)).toDateString()
      )
    }
  ]

  return (
    <div>
      <Typography.Title> All questions in quiz {quizID} </Typography.Title>
      {quizQuestionList ? (
        <Table dataSource={quizQuestionList} columns={columnsQuestion} />
      ) : (
        <Spin />
      )}
      <Typography.Title> Attempts of all registered students </Typography.Title>
      {attemptList ? (
        <Table dataSource={attemptList} columns={columnsAttempt} />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default LectureQuiz;
