import { Card, Input, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from "./form.module.css"
import { UserOutlined } from "@ant-design/icons"
import * as yup from "yup";
import isEmpty from 'lodash.isempty';
const studentSchema = yup.object().shape({
  id:yup.string().required("Vui lòng nhập Mã SV!!!").max(4,"mã sinh viên chỉ có 4 ký tự"),
  fullName:yup.string().required("Vui lòng nhập họ và tên!!!").matches(/^[A-Za-z ]+$/g, "*họ tên phải nhập chữ "),
  phone:yup.string().required("Vui lòng nhập số điện thoại!!!").matches(/^[0-9]+$/g, "nhập đúng kí tự số ")
  .min(10,"số điện thoại cần có 10 số")
  .max(10,"số điện thoại chỉ có 10 số"),
  email:yup.string().required("Vui lòng nhập email!!!").email("vui lòng nhập đúng định dạng email!!!")
});
function Form(props) {
  const [student, setStudent] = useState({
    id: "",
    fullName: "",
    phone: "",
    email: "",
  })
  const [errors,setErrors]=useState([]);
  useEffect(() => {
    if (!props.selectStudent) return;
    if (props.selectStudent.id === student) return;
    setStudent(props.selectStudent);
  }, [props.selectStudent]);//eslint-disable-line
  async function validateForm(){
    const validationErrors={}
    try {
        await studentSchema.validate(student, { abortEarly: false })//không bị bất đồng bộ ,validate bị bất đồng bộ 
    } catch (error) {
        const errObj={...error};
         errObj.inner.forEach((validationError) => {
            if(validationErrors[validationError.path]) return;
            validationErrors[validationError.path]=validationError.message;
         });
        setErrors(validationErrors);
    }
    return isEmpty(validationErrors)

}
  async function handleSubmit(e) {
    e.preventDefault();
    const isValid=await validateForm();
    if(!isValid) return;
    if (props.selectStudent) {
      props.updateStudent(student);
    } else {
      props.createStudent({ ...student });
    }
    setErrors([])
    resetForm();
  }
  function handleChange(e) {
    setStudent({ ...student, [e.target.name]: e.target.value })
  }
  function resetForm(){
    setStudent({
      id: "",
    fullName: "",
    phone: "",
    email: "",
    })
  }
  return (
    <Card
      title="Form Đăng Kí"
      headStyle={{
        backgroundColor: "#000000",
        color: "#fff"
      }}
      style={{
        width: "100%"
      }}

    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Mã SV</label>
          <Input
            value={student.id}
            name='id'
            onChange={handleChange}
            placeholder='Mã SV' prefix={<UserOutlined />}
          />
          <span>{errors.id}</span>
        </div>
        <div className={styles.formGroup}>
          <label>Họ và Tên </label>
          <Input
            value={student.fullName}
            onChange={handleChange}
            name='fullName'
            placeholder='Họ và tên SV' prefix={<UserOutlined />}
          />
          <span>{errors.fullName}</span>
        </div>
        <div className={styles.formGroup}>
          <label>Số Điện Thoại</label>
          <Input
            value={student.phone}
            onChange={handleChange}
            name='phone'
            placeholder='Số điện thoại' prefix={<UserOutlined />}
          />
          <span>{errors.phone}</span>
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <Input
            value={student.email}
            onChange={handleChange}
            name='email'
            placeholder='Email' prefix={<UserOutlined />}
          />
          <span>{errors.email}</span>
        </div>
        <div className={styles.btn}>
          <Button type="primary" htmlType='submit'>Submit</Button>
          <Button onClick={resetForm} type='default'>Reset</Button>
        </div>

      </form>
    </Card>
  )
}

export default Form