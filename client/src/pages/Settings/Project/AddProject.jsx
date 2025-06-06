import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Modal,
} from "antd";
import Header from "../../../components/Header/Header";
import dayjs from "dayjs";
import "./AddProject.css";
import { submitAddProject } from "../../../redux/slices/projectSlice";
import { useDispatch } from "react-redux";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function AddProject() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const onFinish = (values) => {
    const payload = {
      ...values,
      start_date: values.start_date.toISOString(),
      end_date: values.end_date.toISOString(),
    };
    console.log("Form Values:", payload);

    dispatch(submitAddProject(payload))
      .unwrap()
      .then(() => {
        setIsModalVisible(true);
      })
      .catch((error) => {
        Modal.error({
          title: "Hata",
          content: error.message || "Proje kaydedilirken bir hata oluştu.",
        });
      });
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/settings/projects");
  };

  return (
    <>
      <Header />
      <div className="add-project-container">
        <Card className="project-card">
          <div className="card-header">
            <Title level={3}>Yeni Proje Oluştur</Title>
            <Text type="secondary">Proje detaylarını aşağıdan doldurun</Text>
          </div>

          <Divider />

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              status: true,
              priority: "medium",
              start_date: dayjs(),
              end_date: dayjs().add(1, "month"),
            }}
          >
            {/* Form alanları... */}
            <Form.Item
              label="Proje Adı"
              name="name"
              rules={[{ required: true, message: "Proje adı gerekli" }]}
            >
              <Input placeholder="Proje adı giriniz" />
            </Form.Item>

            <Form.Item
              label="Slug"
              name="slug"
              rules={[{ required: true, message: "Slug gerekli" }]}
            >
              <Input placeholder="URL dostu isim (ör: proje-adi)" />
            </Form.Item>

            <Form.Item
              label="Açıklama"
              name="description"
              rules={[{ required: true, message: "Açıklama gerekli" }]}
            >
              <TextArea
                rows={4}
                placeholder="Proje hakkında detaylar"
                showCount
                maxLength={500}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Başlangıç Tarihi"
                  name="start_date"
                  rules={[
                    { required: true, message: "Başlangıç tarihi gerekli" },
                  ]}
                >
                  <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Bitiş Tarihi"
                  name="end_date"
                  rules={[{ required: true, message: "Bitiş tarihi gerekli" }]}
                >
                  <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Öncelik"
              name="priority"
              rules={[{ required: true, message: "Öncelik seçiniz" }]}
            >
              <Select placeholder="Öncelik seçin">
                <Option value="low">Düşük</Option>
                <Option value="medium">Orta</Option>
                <Option value="high">Yüksek</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Projeyi Kaydet
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      <Modal
        title="Başarılı"
        visible={isModalVisible}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>Proje başarıyla kaydedildi.</p>
      </Modal>
    </>
  );
}

export default AddProject;
