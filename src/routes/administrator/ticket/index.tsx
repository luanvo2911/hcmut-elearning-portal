import React from "react";
import AdminService from "../../../services/AdminService";
import { Table, Spin } from "antd";
import TicketData from "../../../types/TicketData";

const Ticket = () => {
  const [ticketList, setTicketList] = React.useState<TicketData[] | undefined>(
    undefined
  );
  React.useEffect(() => {
    AdminService.getTicketList().then(({ data }: { data: TicketData[] }) => {
      data.forEach((d) => {
        const {created_at, process_at} = d;
        d.created_at = (new Date(created_at)).toDateString()
        d.process_at = (new Date(process_at)).toDateString()
      })
      setTicketList(data);
    });
  }, []);

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
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Admin",
      dataIndex: "admin_id",
      key: "admin_id",
    }
  ]

  return (
    <div>
    {
      ticketList ? <Table dataSource = {ticketList} columns = {columns} rowKey={(d)=>{return d.ticket_id}} /> : <Spin  />
    }
    </div>
  )
};

export default Ticket;
