import './app.css'
import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Axios from 'axios'
import Todo from './pages/todo.js'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
// import Meun from './component/meun/meun.js';
class App extends Component  {
	
	    constructor(props){
	        super()
			this.state={
				list:[]
			}
	    }
		
		async componentWillMount(){
			let {data:res}= await Axios.post('/api/user/list');
			if(res.status===200){
				this.setState({
					list:res.data
				})
			}
		 }
  render() {
    return(<div className="App">
		 <Layout>
		    <Header className="header">
		      <div className="logo" />
		      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
		        <Menu.Item key="1">nav 1</Menu.Item>
		        <Menu.Item key="2">nav 2</Menu.Item>
		        <Menu.Item key="3">nav 3</Menu.Item>
		      </Menu>
		    </Header>
		    <Layout>
		      <Sider width={200} className="site-layout-background">
		        <Menu
		          mode="inline"
		          defaultSelectedKeys={['1']}
		          defaultOpenKeys={['sub1']}
		          style={{ height: '100%', borderRight: 0 }}
		        >
				{
					this.state.list.map((item,index)=>{
						return 	 <SubMenu key={index} icon={<UserOutlined />} title={item.list}>
								<Menu.Item key={index}>{item.user}</Menu.Item>
					  </SubMenu>
					})
				}

		        </Menu>
		      </Sider>
		      <Layout style={{ padding: '0 24px 24px' }}>
		        <Breadcrumb style={{ margin: '16px 0' }}>
		          <Breadcrumb.Item>Home</Breadcrumb.Item>
		          <Breadcrumb.Item>List</Breadcrumb.Item>
		          <Breadcrumb.Item>App</Breadcrumb.Item>
		        </Breadcrumb>
		        <Content
		          className="site-layout-background"
		          style={{
		            padding: 24,
		            margin: 0,
		            minHeight: 280,
		          }}
		        >
		          
				<Todo></Todo>
		        </Content>
		      </Layout>
		    </Layout>
		  </Layout>,
    </div>)
  };
}

export default App;
