import { useAuth } from "context/auth-context";
import React, { useState } from "react";
import { ProjectListScreen } from "screens/projests";
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg'
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { Dropdown, Menu, Button } from "antd";
import { Routes, Route, redirect, Navigate } from 'react-router-dom'
import { ProjectScreen } from "screens/Project";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/Project-Popover";
export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false)

   return (
    // <Container>
    //   <Header>
    //     <HeaderLeft>
    //         <h3>Logo</h3>
    //         <h3>项目</h3>
    //         <h3>用户</h3>
    //     </HeaderLeft>
    //     <HeaderRight> <button onClick={logout}>登出</button> </HeaderRight>
    //   </Header>
    //   <Nav>nav</Nav>
    //   <Main>
    //     <ProjectListScreen />
    //   </Main>
    //   <Aside>aside</Aside>
    //   <Footer>footer</Footer>
    // </Container>
    <Container>
      {/* <PageHeader setProjectModalOpen={setProjectModalOpen}/> */}
      <PageHeader  projectButton={<ButtonNoPadding 
      type={'link'} onClick={()=> setProjectModalOpen(true)}>创建项目</ButtonNoPadding>}
      />
      {/* <Button onClick={() => setProjectModalOpen(true)}>打开</Button> */}
      {/* {value.notExist} */}
    
    <Main>
      {/* <ProjectListScreen /> */}
      <Routes>
        {/* <Route path={'/projects'} element={<ProjectListScreen setProjectModalOpen={setProjectModalOpen}/>} /> */}
        <Route path={'/projects'} element={<ProjectListScreen projectButton={<ButtonNoPadding 
      type={'link'} onClick={()=> setProjectModalOpen(true)}>创建项目</ButtonNoPadding>} />} 
      />
        <Route path={'/projects/:projectId/*'} element={<ProjectScreen/>} />
        <Route index path={'/'} element={<Navigate to={'/projects'}/>} />
      </Routes>
    </Main>
    <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
  </Container>
    // <div>
    //   <PageHeader>
    //     <button onClick={logout}>登出</button>
    //   </PageHeader>
    //   <Main>
    //     <ProjectListScreen />
    //   </Main>
    // </div>
  );
};

const HeaderItem = styled.h3`
  margin-right: 3rem;

`

// const PageHeader = styled.header`
// background-color: gray;
//   height: 6rem;
// `;

 
// const PageHeader = (props:{setProjectModalOpen: (isOpen:boolean)=> void}) => {
const PageHeader = (props:{projectButton: JSX.Element}) => {
  return <Header between={true}>
  <HeaderLeft gap={true}>
    <ButtonNoPadding style={{padding:0}} type={'link'} onClick={resetRoute}>
    <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
    </ButtonNoPadding>
    {/*  <ProjectPopover setProjectModalOpen={props.setProjectModalOpen}/> */}
    <ProjectPopover {...props}/>
      {/* <h2>项目</h2> */}
      <span>用户</span>
      <HeaderItem as={'div'}>another</HeaderItem>
  </HeaderLeft>
  <HeaderRight> 
   <User />
    {/* <Dropdown overlay={<Menu>
      <Menu.Item key={'logout'}><a onClick={logout}>登出</a></Menu.Item>
    </Menu>}>
      <a onClick={e => e.preventDefault()}>Hi, {user?.name}</a>
    </Dropdown> */}
     </HeaderRight>
</Header>
}
 
const User = () => {
  const { logout, user } = useAuth();
  const items = [{label: <span onClick={logout}>登出</span>, key: 'logout'}]
 return <Dropdown menu={{ items }} >
  <Button type={"link"}>登出</Button>
    {/* <a  onClick={e => e.preventDefault()}>Hi, {user?.name}</a> */}
  </Dropdown>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div``

const Main = styled.main``


const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
z-index: 1;
`


// const Container = styled.div`
//     display: grid;
//     grid-template-rows: 6rem calc(100vh - 6rem) 6rem;
//     grid-template-columns: 20rem 1fr 20rem;
//     grid-template-areas: 
//     "header header header"
//     "nav main aside"
//     "footer footer footer"
//     ;
//     height: 100vh;
// `



// const Container = styled.div`
//     display: grid;
//     grid-template-rows: 6rem 1fr 6rem;
//     grid-template-columns: 20rem 1fr 20rem;
//     grid-template-areas: 
//     "header header header"
//     "nav main aside"
//     "footer footer footer"
//     ;
// height: 100vh;
// grid-gap: 10rem;
// `

// const Header = styled.header`
// grid-area:header;
// display: flex;
// flex-direction: row;
// align-items: center;
// justify-content: space-between;
// `

// const Header = styled.header`
// grid-area:header;
// display: flex;
// flex-direction: row;
// align-items: center;
// justify-content: space-between;
// `


// const Main = styled.main`grid-area:main` 
// const Nav = styled.nav`grid-area:nav`
// const Aside = styled.aside`grid-area:aside`
// const Footer = styled.footer`grid-area:footer`


// const Main = styled.main`
//   height: calc(100vh - 6rem);
// `;
