import React from "react";
import { Modal } from "antd";
import AppInput from "../../../../components/UI/Input/AppInput";
import PrimaryButton from "../../../../components/UI/Button/PrimaryButton/PrimaryButton";

function Login(props) {
  const [modal, contextHolder] = Modal.useModal();

  const handleCancel = () => {
    if (props.onClose) {
      props.onClose();
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
        <AppInput
          label="E-Posta Adresi"
          type="text"
          onChange=""
          value=""
          placeholder="Lütfen E-Posta Adresinizi Giriniz..."
        />
        <AppInput 
         type="password"
         onChange=""
         value=""
         label="Parolanız" 
         placeholder="**********" />
         <br /><br />
        <PrimaryButton>Giriş Yap</PrimaryButton>
      </Modal>
    </>
  );
}

export default Login;
