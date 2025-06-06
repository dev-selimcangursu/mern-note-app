import React from "react";
import { Table, Tag, Button, Space } from "antd";
import Header from "../../../components/Header/Header";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Projects.css";

function openAddProject() {
  window.location.href = "/settings/project/add";
}

const columns = [
  {
    title: "Proje Adı",
    dataIndex: "projectName",
    key: "projectName",
    render: (text) => <strong>{text}</strong>,
  },
  {
    title: "Başlangıç Tarihi",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "Bitiş Tarihi",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Durum",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const color =
        status === "Tamamlandı"
          ? "green"
          : status === "Devam Ediyor"
          ? "blue"
          : "orange";
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Çalışan Sayısı",
    dataIndex: "teamSize",
    key: "teamSize",
  },
  {
    title: "İşlem",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" icon={<EyeOutlined />}>
          Görüntüle
        </Button>
        <Button type="link" danger icon={<DeleteOutlined />}>
          Sil
        </Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    projectName: "CRM Yönetim Sistemi",
    startDate: "2024-01-10",
    endDate: "2024-06-10",
    status: "Tamamlandı",
    teamSize: 8,
    tags: ["React", "Laravel", "API"],
  },
  {
    key: "2",
    projectName: "E-Ticaret Paneli",
    startDate: "2024-03-01",
    endDate: "2024-12-01",
    status: "Devam Ediyor",
    teamSize: 5,
    tags: ["Next.js", "Stripe", "Tailwind"],
  },
  {
    key: "3",
    projectName: "Mobil Görev Takip",
    startDate: "2024-07-01",
    endDate: "2025-01-01",
    status: "Planlandı",
    teamSize: 4,
    tags: ["React Native", "Firebase"],
  },
];

function Projects() {
  return (
    <>
      <Header />
      <div style={{ padding: "24px" }}>
        <div className="table-header">
          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Projeler</h2>
          <Button
            onClick={openAddProject}
            type="primary"
            style={{ marginBottom: "16px" }}
          >
            Yeni Proje Ekle
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={{ pageSize: 5 }}
          scroll={{ x: 1000 }}
        />
      </div>
    </>
  );
}

export default Projects;
