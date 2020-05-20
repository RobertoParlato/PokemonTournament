import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {getHexColor} from '../utils/Colors';
import 'antd/dist/antd.css';
import { Typography, Input, Button, List, Avatar, Tag, PageHeader, Modal, Result,notification } from 'antd';
import { CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useSWR, { mutate, trigger } from 'swr';

const { Title } = Typography;

const INITIAL_STATE = {name: '', pokemon: [], loading: false, visible: false, title: ''};

const openNotificationWithIcon = (type,title,description) => {
  notification[type]({
    message: title,
    description:
      description,
    duration: 3,
    placement: 'bottomRight'
  });
};

function TeamPage({ match }) {
  const [team,setTeam] = useState(INITIAL_STATE);

  const {data} = useSWR('/api/teams', 
    (path) => axios.get(path).then(res => res.data),
    {dedupingInterval: 5000}
  );

  useEffect(() => {
    retrieveTeam();
  }, [])

  function retrieveTeam(){
    if(match.params.teamId){
      axios.get(`/api/teams/${match.params.teamId}`)
      .then(res => setTeam(prevState => ({...prevState, name: res.data.name, pokemon: res.data.pokemon})))
      .catch(err => console.log("Somethings gone wrong!"));
    }
  }

  function handleButton(){
    if(team.pokemon.length < 6){
      setTeam(prevState => ({...prevState, loading: true}));
      axios.get("/api/pokemon/random").then(res => res.data)
      .then(pok => setTeam(prevState => ({...prevState, pokemon: [...prevState.pokemon, pok], loading: false})))
      .catch(err => console.log("somethings gone wront with fetching random pokemon!"));
    }else{
      openNotificationWithIcon('error', 'You reach the max team size', 'the maximum size of team for a pokemon trainer is 6 pokemon!');
    }
  }

  function handleSubmit(){
    if(team.name.length < 3){
      openNotificationWithIcon('error', 'Missing name of the team', 'You should choose a name for a team before submit! (min 3 char)');
    }else if(team.pokemon.length === 0){
      openNotificationWithIcon('error', 'You must have some pokemon in team!', "Press the button \"Gotta catch 'em all\" for pick a random pokemon!");
    }else{
      let request = {name: team.name, pokemon: []}
      request.pokemon = team.pokemon.map((x, i) => ({
          name: x.name, 
          base_experience: x.base_experience, 
          abilities: x.abilities,
          types: x.types,
          sprite: x.sprite
        }));
      if(match.params.teamId){
        const changes = data.map((x) => {
          if(x._id !== match.params.teamId)
            return x;
          else
            return ({...x, name: request.name, pokemon: request.pokemon});
        })
        axios.put(`/api/teams/${match.params.teamId}`, request)
        .then(res => {
          if(res.data.code && res.data.code === 11000){
            openNotificationWithIcon('error', 'Team name already taken!', "Team name already exists take another one!");
          }else{
            mutate('/api/teams', changes, false);
            setTeam({...INITIAL_STATE, visible: true, title: "Team Saved Successfuly!"});
            trigger('/api/teams');
          }
        })
        .catch(err => console.log(err));
      }else{
        axios.post('/api/teams', request)
        .then(res => {
          if(res.data.code && res.data.code === 11000){
            openNotificationWithIcon('error', 'Team name already taken!', "Team name already exists take another one!");
          }else{
            mutate('/api/teams', [request, ...data], false);
            setTeam({...INITIAL_STATE, visible: true, title: "Team Created Successfuly!"});
            trigger('/api/teams');
          }
        })
        .catch(err => console.log(err));
      }
    }
  }

  function removePokemon(index){
    let pokemon = team.pokemon;
    const old = pokemon.splice(index, 1);
    setTeam(prevState => ({...prevState, pokemon: pokemon}));
    openNotificationWithIcon('success', 'Removed successfuly', `You removed ${old[0].name} from the team!`)
  }

  function setTeamName(name){
    setTeam(prevState => ({...prevState, name: name}));
  }

  return (
    <>
      <PageHeader
        className="site-page-header"
        backIcon={<Link to="/team/list"><ArrowLeftOutlined /></Link>}
        onBack={() => {}}
        title={match.params.teamId ? (<Title level={3}>Edit team</Title>) : (<Title level={3}>Create new Team</Title>)}
        extra={[
          <Button key="2" color="green" onClick={() => handleSubmit()}>Save Team</Button>,
          <Button key="1" loading={team.loading} onClick={() => handleButton()} type="primary">Gotta catch 'em all</Button>
        ]}
      />
      <div className="site-layout-content">
        Name of team: <Input style={{ width: 300 }} value={team.name} onChange={e => setTeamName(e.target.value)} placeholder="ex. Blinders" /><br/><br/>
        <Title level={4}>Pokemon List</Title>
        <div>
          {team.pokemon.length > 0 && (
            <>
              <List
                itemLayout="horizontal"
                loading={team.loading}
                bordered
                size="small"
                dataSource={team.pokemon}
                renderItem={(item, i) => (
                  <List.Item 
                    actions={[<Button danger shape="circle" icon={<CloseOutlined />} onClick={() => removePokemon(i)}></Button>]}
                    key={item.id}
                  >
                    <List.Item.Meta
                      avatar={<Avatar shape="square" size={100} src={item.sprite} />}
                      title={<><b style={{fontSize: '15pt'}}>{item.name} </b>{item.types.map((x,i) => <Tag key={i} color={getHexColor(x.name.toUpperCase())}>{x.name.toUpperCase()}</Tag>)}</>}
                      description={<><span style={{fontSize: '10pt'}}><b>Base Experience: </b>{item.base_experience}</span><br/><span style={{fontSize: '10pt'}}><b>Abilities: </b></span>{item.abilities.map((x,i) => <Tag key={i} >{x.name}</Tag>)}</>}
                    />
                  </List.Item>
                )}
              />
            </>
          )}
        </div>
      </div>
      <Modal
        visible={team.visible}
        title=''
        onOk={() => {}}
        onCancel={() => {setTeam(prevState => ({...prevState, visible: false}))}}
        footer={[]}
      >
          <Result
            status="success"
            title={team.title}
            extra={[
              <Link key="listpage" to="/team/list"><Button type="primary">
                Go to List Page
              </Button></Link>,
              <Button key="close" onClick={() => {setTeam(prevState => ({...prevState, visible: false}))}}>Create another team!</Button>,
            ]}
          />
      </Modal>
    </>
  );
}

export default TeamPage;
