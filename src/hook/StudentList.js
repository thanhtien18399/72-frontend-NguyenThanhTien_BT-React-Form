import React, { useEffect, useState } from 'react'
import { Card, Table,Button } from 'antd'
function StudentList(props) {
  const [students,setStudents]=useState([]);
  useEffect(()=>{
    if(props.studentList){
      setStudents(props.studentList);
    }
  },[props.studentList])
  useEffect(()=>{
    if(props.search){
      setStudents(props.search)
    }
    
  },[props.search])
  const columns = [
    {
      title: "Id",
      dataIndex: "id"
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      render: (_, student) => {
        return <>
          <h4>{student.fullName}</h4>
        </>
      }
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Số điện Thoại",
      dataIndex: "phone"
    },
    {
      title: "",
      key: "action",
      render: (_, student) => {
        return (
          <>
            <Button onClick={()=>props.getUpdateStudent(student)} type="primary">chỉnh sửa</Button>
            <Button onClick={()=>props.deleteStudent(student.id)}>Xóa</Button>
          </>

        )
      }
    }
  ]
  return (
    <Card
      title="Danh Sách Sinh Viên"
      headStyle={{
        backgroundColor: "#000000",
        color: "#fff"
      }}
    >
      <Table dataSource={students.map((student) => {
        return { ...student, key: student.id }
      })} columns={columns}>

      </Table>
    </Card>
  )
}

export default StudentList