export default interface QuestionData {
  question_id: string,
  question_content: string,
  created_at: Date,
  answer_date: Date | null, // answer or not
  student_id: string,
  lecturer_id: string | null, // answer or not
  student_name: string,
  lecturer_name: string | null // answer or not
}