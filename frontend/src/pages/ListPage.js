import React, {useState} from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { ALL_TYPES, getHexColor }from '../utils/Colors';
import { Typography, Button, PageHeader, List, Tag, notification } from 'antd';
import { CloseOutlined, EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useSWR, { mutate, trigger } from 'swr';

const { Title } = Typography;

const INITIAL_STATE = {query: 'ALL'}

const openNotificationWithIcon = (type,title,description) => {
  notification[type]({
    message: title,
    description:
      description,
    duration: 3,
    placement: 'bottomRight'
  });
};

function ListPage() {
  const {data} = useSWR('/api/teams', 
    (path) => axios.get(path).then(res => res.data),
    {dedupingInterval: 5000}
  );

  const [options, setOptions] = useState(INITIAL_STATE);


  function removeTeam(id,index){
    mutate('/api/teams', data.filter((elem, i) => i !== index), false);
    axios.delete(`/api/teams/${id}`).then(res => {
      openNotificationWithIcon('success', 'Team removed successfuly!', '');
      trigger('/api/teams');
    })
    .catch(err => console.log("Somethings gone wrong with deletion!"));
  }

  function getAllTypes(pokemon){
    return [...new Set(pokemon.reduce((accumulator,{types}) => [...accumulator, ...types.map(({name}) => name)], []))];
  }

  function filterByType(){
    if(options.query !== 'ALL'){
      return data.filter((x) => getAllTypes(x.pokemon).includes(options.query.toLowerCase()));
    }else{
      return data;
    }    
  }

  function changeQuery(type){
    setOptions({query: type});
  }


  return (
    <>
      <PageHeader
        className="site-page-header"
        title={<Title level={3}>List of Teams</Title>}
        extra={[
          <Link key="1" to="/team/create"><Button type="primary">Create new Team</Button></Link>
        ]}
      />
      <Title level={4}>Filter by: </Title>
      <>{ALL_TYPES.map((x,i) => <Tag key={i} onClick={() => changeQuery(x)} style={(options.query === x) ? ({border: '3px solid black'}) : ('') } color={getHexColor(x)}>{x}</Tag>)}</>
      <br/><br/>
      {data && (
          <List
            itemLayout="horizontal"
            /* loading={filter.loading} */
            bordered
            dataSource={filterByType()}
            renderItem={(item, i) => (
              <List.Item 
                actions={ item._id ?
                    ([
                      <Link to={`/team/${item._id}/edit`}><Button danger shape="circle" icon={<EditFilled />}></Button></Link>,
                      <Button danger shape="circle" icon={<CloseOutlined />} onClick={() => removeTeam(item._id, i)}></Button>
                    ]) : ([])}
                key={item.id}
              >
                <List.Item.Meta
                  title={<><b style={{fontSize: '15pt'}}>{item.name} </b>{getAllTypes(item.pokemon).map((x,i) => <Tag key={i} color={getHexColor(x.toUpperCase())}>{x.toUpperCase()}</Tag>)}</>}
                  description={<><span style={{fontSize: '10pt'}}><b>Total Experience: </b>{item.pokemon.reduce((sum,{base_experience}) => sum + base_experience,0)}</span><br/><span style={{fontSize: '10pt'}}><b>Pokemon: </b></span><br/>{item.pokemon.map( ({sprite,name},i) => <img key={i} alt={name} src={sprite} />)}</>}
                />
              </List.Item>
            )}
          />
        
      )}
    </>
  );
}

export default ListPage;
