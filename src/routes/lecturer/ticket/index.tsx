import React from "react";
import LecturerService from "@services/LecturerService";
import { Table, Spin, Typography, Button } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { TicketData } from "@/types/db";

const Ticket = ({ lecturerID }: { lecturerID: string | undefined }) => {
  const [ticketList, setTicketList] = React.useState<TicketData[] | undefined>(
    undefined
  );
  React.useEffect(() => {
    LecturerService.getTicketList(lecturerID).then(
      ({ data }: { data: TicketData[] }) => {
        data.forEach((d) => {
          const { created_at, process_at } = d;
          d.created_at = new Date(created_at).toDateString();
          d.process_at = new Date(process_at).toDateString();
        });
        setTicketList(data);
      }
    );
  }, [lecturerID, ticketList]);

  const columns = [
    {
      title: "Ticket ID",
      dataIndex: "ticket_id",
      key: "ticket_id",
    },
    {
      title: "Ticket Type",
      dataIndex: "ticket_type",
      key: "ticket_type",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Process at",
      dataIndex: "process_at",
      key: "process_at",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created by",
      dataIndex: "author",
      key: "author",
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
        <Typography.Title level={2}>Your current tickets</Typography.Title>
        <Button
          type="primary"
          onClick={() => {
            setTicketList(undefined);
          }}
        >
          <UndoOutlined />
        </Button>
      </div>
      {ticketList ? (
        <Table
          dataSource={ticketList}
          columns={columns}
          rowKey={(d) => {
            return d.ticket_id;
          }}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default Ticket;
