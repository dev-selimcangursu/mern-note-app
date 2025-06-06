import React, { useState } from "react";
import { Modal } from "antd";
import AppInput from "../../../../components/UI/Input/AppInput";
import PrimaryButton from "../../../../components/UI/Button/PrimaryButton/PrimaryButton";
import { useDispatch } from "react-redux";
import { submitLogin } from "../../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  const changeSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(submitLogin(formData)).unwrap();

      if (result.status === "code_sent") {
        setStep(2);
      } else if (result.success === true && result.token) {
        // JWT token'ı kaydet
        localStorage.setItem("token", result.token);

        modal.success({
          title: "Başarılı",
          content: "Giriş işleminiz başarılı. Yönlendiriliyorsunuz...",
          onOk: () => {
            handleCancel();
            navigate("/dashboard");
          },
        });
      } else if (result.status === "invalid_code") {
        modal.error({
          title: "Hata",
          content: "Doğrulama kodu geçersiz.",
        });
      } else {
        modal.error({
          title: "Hata",
          content: result.message || "Giriş işlemi başarısız.",
        });
      }
    } catch (error) {
      modal.error({
        title: "Hata",
        content: "Sunucudan cevap alınamadı.",
      });
      console.error("Hata:", error);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Hesabına Giriş Yap"
        open={props.modalStatus}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={changeSubmit}>
          {step === 1 && (
            <>
              <AppInput
                label="E-Posta Adresi"
                name="email"
                type="text"
                onChange={handleChange}
                value={formData.email}
                placeholder="Lütfen E-Posta Adresinizi Giriniz..."
              />
              <AppInput
                name="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
                label="Parolanız"
                placeholder="**********"
              />
              <br />
              <br />
            </>
          )}
          {step === 2 && (
            <AppInput
              label="Doğrulama Kodu"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Mailinize gelen 6 haneli kod"
            />
          )}
          <br /> <br />
          <PrimaryButton>Giriş Yap</PrimaryButton>
        </form>
      </Modal>
    </>
  );
}

export default Login;
