import {Outlet} from "react-router-dom";
import MyHeader from "../MyHeader/MyHeader";
import './App.css'

import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

function App() {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header><MyHeader/></Header>
            <Content><Outlet/></Content>
            <Footer style={{color: 'rgba(255, 255, 255, 0.65)', background: '#001529'}}>
                *Выполнено в рамках ученического проекта, {new Date().getFullYear()}г.
            </Footer>
        </Layout>
    );
}

export default App;
