import React, { useState } from "react";
import { Modal, Divider } from "antd";
import Swal from "sweetalert2";
import AppInput from "../../../../components/UI/Input/AppInput";
import PrimaryButton from "../../../../components/UI/Button/PrimaryButton/PrimaryButton";
import { useDispatch } from "react-redux";
import { submitAuthInfo } from "../../../../redux/slices/authSlice";

function Register({ onRegisterModel, onRegisterClose }) {
  const dispatch = useDispatch();
  const [modal, contextHolder] = Modal.useModal();

  const [step, setStep] = useState(1); // 1: kayıt, 2: kod

  // İnputtan Gelen Verilerin Depolanması
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
    code: "",
  });
  // İnput Değerleri Alma
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Formu Submit Edilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(submitAuthInfo(formData)).unwrap();

      if (result.status === "code_sent") {
        modal.success({
          title: "Doğrulama Kodu Gönderildi",
          text: "Doğrulama kodu e-posta adresinize gönderildi.",
        });

        setStep(2); // doğrulama adımına geç
      } else if (result.status === "success") {
        modal.success({
          title: "Başarılı",
          content: "Giriş işleminiz başarılı.",
        });
        setStep(1);
        setFormData({
          fullName: "",
          companyName: "",
          email: "",
          password: "",
          code: "",
        });
        onRegisterClose();
      } else if (result.status === "invalid_code") {
        modal.error({
          title: "Hata",
          content: "Doğrulama kodu geçersiz.",
        });
      } else {
        modal.error({
          title: "Hata",
          content: result.message || "Beklenmedik Bir Hata!",
        });
      }
    } catch (error) {
      modal.error({
        title: "Sunucu Hatası",
        content: "Lütfen daha sonra tekrar deneyiniz.",
      });
      console.log(error);
    }
  };

  return (
    <Modal
      open={onRegisterModel}
      title="Demo Talebinde Bulun"
      onCancel={onRegisterClose}
      footer={null}
      centered
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {step === 1 && (
            <>
              <AppInput
                label="İsim Soyisim"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Lütfen İsim Soyisminizi Giriniz..."
              />
              <AppInput
                label="Firma Adı"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Firma Adı"
              />
              <AppInput
                label="E-Posta"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-posta adresiniz"
              />
              <AppInput
                label="Parola"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="******"
              />
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

          <Divider style={{ margin: "16px 0" }} />
          <PrimaryButton htmlType="submit" style={{ width: "100%" }}>
            {step === 1 ? "Doğrulama Kodu Gönder" : "Kaydı Tamamla"}
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}

export default Register;
