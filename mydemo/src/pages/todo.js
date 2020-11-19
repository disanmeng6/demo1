import React from 'react'
import { Button, Modal, Table,Form, Input,  message ,Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios'
import './todo.css'
const { Column} = Table;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
class Todo extends React.Component{
    constructor(props){
        super(props)
        this.state={
             data : [
              ],
              visible: false ,
              form:[],
              visible1:false,
              query:{},
        }
    }
    addtab= async ()=>{ 
        let {data:res}= await Axios.get('/api/user/tab');
        console.log(res)
        res.data.forEach( (item,index)=>{
          item.key=index+'';
        })
        if(res.status===200){
            this.setState({
                data:res.data
            })
        }
    }
     componentWillMount(){
        // tab
        this.addtab();
     }
    //  显示对话框
     showModal = () => {
        this.setState({
          visible: true,
        });
      };
    //   显示修改的对话框
    showModal1 = (index) => {
        console.log(index);
        // 解决this.setState 异步
        setTimeout( ()=>{
            this.setState({
                visible1: true,
                query:index
                
            });
        },0)
        console.log(this.state.medata);
      };
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
          visible1: false,
        });
      };
// 添加
       onFinish = async values => {
        console.log('Success:', values);
         let {data:res} =await Axios.post('/api/user/add',values) 
         console.log(res);
         if(res.status!==200) return  message.error('添加失败');
         message.success('添加成功');
         this.addtab()
         this.setState({
            visible: false,
          });
      };
      Modify=async (index)=>{
       let {data:res}=await Axios.post(`/api/user/remuser`,{id:index._id})
       console.log(res);
       if(res.status!==200) return  message.error('删除失败')
       message.success('删除成功');
       this.addtab()
      }
    //   修改 
      myonFinish= value=>{
          console.log(value);
      }
        // input事件 实现输入框的双向绑定
      onChange = e => {
        let data=Object.assign({}, this.state.query);
        data.firstName=e.target.value;
        this.setState({
          query:data
        })
      }
      onChange1 = e => {
        let data=Object.assign({}, this.state.query);
        data.age=e.target.value;
        this.setState({
          query:data
        })
      }
      onChange2 = e => {
        let data=Object.assign({}, this.state.query);
        data.race=e.target.value;
        this.setState({
          query:data
        })
      }
// 提交修改
      handleOk= async ()=>{
        let {data:res}=await Axios.post('/api/user/correct',this.state.query);
        if(res.status!==200)  return  message.error('修改失败')
        message.success('修改成功');
        this.addtab();
        this.setState({
          visible1: false,
        });
      }
    render(){
        return(
            <>
                <Button type="primary" icon={<PlusOutlined />} onClick={this.showModal}>
      添加用户
    </Button>
                        <Table dataSource={this.state.data}  >
              <Column title="姓名" dataIndex="firstName"  key="firstName"  />
            <Column title="年龄" dataIndex="age"   key="age" />
            <Column title="race" dataIndex="race"  key="race" />
            <Column
              title="操作"
              dataIndex="tags"
              key="tags"
              render={(tags,index) => (
                <>
                    <Button type="primary" key='1' onClick={this.showModal1.bind(tags,index)}>修改</Button>
                    <Button type="primary" key='2'>查看</Button>
                    <Button type="primary" key='3' danger onClick={this.Modify.bind(tags,index)}>删除</Button>
                </>
              )}
            />
          </Table>
          
          {/* 对话框 */}
          <Modal
          title="添加人物"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
 <Form
      {...layout}
      name="basic"
      onFinish={this.onFinish}
    >
      <Form.Item
        label="姓名"
        name="firstName"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="年龄"
        name="age"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="类型"
        name="race"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          添加
        </Button>
      </Form.Item>
    </Form>
        </Modal>


                  {/* 修改的对话框 */}
                  <Modal
          title="修改人物"
          visible={this.state.visible1}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText='取消'
          okText='确认'
        >

    <Row>
      <Col span={2} offset={2}>姓名</Col>
      <Col span={18}><Input  onInput={this.onChange} value={this.state.query.firstName}/></Col>
    </Row>
    <Row>
      <Col span={2} offset={2}>年龄</Col>
      <Col span={18}><Input  onInput={this.onChange1} value={this.state.query.age} /></Col>
    </Row>
    <Row>
      <Col span={2}offset={2}>类型</Col>
      <Col span={18}><Input  onInput={this.onChange2} value={this.state.query.race} /></Col>
    </Row>
             </Modal>
          </>
        )
    }

}

export default Todo;

