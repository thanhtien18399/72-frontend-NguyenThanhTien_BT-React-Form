import React, { useState } from 'react'
import Form from './Form'
import StudentList from './StudentList'
import {  Input } from 'antd';
const { Search } = Input;
function Home() {
  const [studentList, setStudentList] = useState([]);
  const [selectStudent, setSelectStudent] = useState(null);
  const [search,setSearch]=useState(null)
  const createStudent = (stu) => {
    const foundStudent = studentList.find((item) => {
      return item.id === stu.id;
    });
    if (foundStudent) {
      return alert("Mã SV đã tồn tại");
    }
    setStudentList([...studentList, stu])
  }
  function deleteStudent(id) {
    const cloneStudentList = [...studentList];
    const index = cloneStudentList.findIndex((item) => item.id === id)
    if (index === -1) return;
    cloneStudentList.splice(index, 1);
    setStudentList(cloneStudentList);
  }
  function getUpdateStudent(stu) {
    setSelectStudent(stu)
  }
  function updateStudent(stu) {
    const cloneStudentList = [...studentList];
    const index = cloneStudentList.findIndex((item) => item.id === stu.id)
    if (index === -1) return;
    cloneStudentList[index] = stu;
    setStudentList(cloneStudentList);
    setSelectStudent(null);
  }
  function onSearch(e) {
    const keywork=e.target.value.toLowerCase().trim();
      const listOnSearch =[];
       studentList?.map((item)=>{
          if(item.fullName===keywork||item.fullName.toLowerCase().includes(keywork)){
            listOnSearch.push(item); 
          }
          return 0;
        })
      setSearch(listOnSearch);
  }
  return (
    <div>
      <h1 style={{textAlign:"center"}}>Quản Lý Sinh Viên</h1>
     
      <Form
        createStudent={createStudent}
        updateStudent={updateStudent}
        selectStudent={selectStudent}
        
      />
        <Search
          placeholder="input search text"
          onChange={onSearch}
          enterButton="Search"
          style={{
            width: "100%",
            padding: "20px 30px",
          }}
        />
    
      <StudentList
        getUpdateStudent={getUpdateStudent}
        studentList={studentList}
        search={search}
        deleteStudent={deleteStudent}
      />
    </div>
  )
}

export default Home