const LectureQuiz = ({ lectureID }: { lectureID: string }) => {
  lectureID = lectureID.split(' ')[0];
  
  return <div> This is Lecture quiz {lectureID} </div>;
};

export default LectureQuiz;
