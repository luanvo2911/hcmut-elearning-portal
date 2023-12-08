import React from "react";
import { Table, Spin } from "antd";
import AdminService from "@/services/AdminService";
import { QuizData } from "@/types/db";
import LectureQuiz from "./_quizID"; 

const LectureQuizList = ({
  lecturePath,
  setItems,
}: {
  lecturePath: string;
  setItems: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // L00x Quiz / quiz abc
  let lectureID = lecturePath.split("/")[0];
  lectureID = lectureID.split(" ")[0]; // L00x
  const [quizList, setQuizList] = React.useState<QuizData[] | undefined>(
    undefined
  );

  const columns = [
    {
      title: "Quiz ID",
      dataIndex: "quiz_id",
      key: "quiz_id",
      render: (text: string) => (
        <a
          onClick={() => {
            setItems((prevState) => {
              return prevState + `/${text} Quiz`;
            });
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Num of questions",
      dataIndex: "num_of_questions",
      key: "num_of_questions"
    }
  ];
  React.useEffect(() => {
    AdminService.getQuizList(lectureID).then(
      ({ data }: { data: QuizData[] }) => {
        setQuizList(data);
      }
    );
  }, [lectureID]);

  if(lecturePath.split("/").length > 1){
    return <LectureQuiz quizIDPath = {lecturePath.replace(`${lecturePath.split("/")[0]}/`, "")} />
  }

  return quizList ? (
    <Table dataSource={quizList} columns={columns} />
  ) : (
    <Spin />
  );
};

export default LectureQuizList;
