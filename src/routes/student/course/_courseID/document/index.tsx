import React from "react";
import { DocumentData } from "@/types/db";
import AdminService from "@/services/AdminService";
import { Table, Typography, Spin } from "antd";

const LectureDocument = ({ lectureID }: { lectureID: string }) => {
  lectureID = lectureID.split(" ")[0]; // split to get real lectureID from string
  const [documentList, setDocumentList] = React.useState<
    DocumentData[] | undefined
  >(undefined);
  React.useEffect(() => {
    AdminService.getDocumentList(lectureID).then(
      ({ data }: { data: DocumentData[] }) => {
        setDocumentList(data);
      }
    );
  }, [lectureID]);

  const columns = [
    {
      title: "Document ID",
      dataIndex: "document_id",
      key: "document_id",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
  ];

  return (
    <div>
      <Typography.Title level={2}>
        Document of lecture {lectureID}
      </Typography.Title>
      {documentList ? (
        <Table dataSource={documentList} columns={columns} />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default LectureDocument;
