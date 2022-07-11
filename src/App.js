import './App.css';
import { Row, Col, Select, Button, Input, Checkbox, Typography, Card, Table } from 'antd';
import { useState, useEffect } from 'react';
import { getTables, getRegionColumns, getCitiesColumns, getDistrictsColumns, getStatesColumns } from './services';

const { Title } = Typography;

function App() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [columns, setColumns] = useState([]);
  const [filters, setFilters] = useState([]);
  const [params, setParams] = useState({});
  const [linhas, setLinhas] = useState(20);
  const [filteredKeys, setFilteredKeys] = useState([])
  const [data, setData] = useState([])

  const findParams = async () => {
    console.log(params);
    if (selectedTable === 'regioes') {
      const query = await getRegionColumns(filteredKeys, params, linhas);

      setData(query.data);
    }
    if (selectedTable === 'municipios') {
      const query = await getCitiesColumns(filteredKeys, params, linhas);

      setData(query.data);
    }
    if (selectedTable === 'estados') {
      const query = await getStatesColumns(filteredKeys, params, linhas);

      setData(query.data);
    }
    if (selectedTable === 'distritos') {
      const query = await getDistrictsColumns(filteredKeys, params, linhas);

      setData(query.data);
    }
  }

  const filterParam = (e) => {
    const newParam = {};
    newParam[e.target.id] = e.target.value;

    setParams((old) => ({ ...old, ...newParam }));
  }

  const getFilters = (filts) => {
    return (
      <Col span={24}>
        <Title level={3}>Filtrar Valores</Title>
        {
          filts.map((name) => (
            <Row gutter={8} style={{ marginTop: 10 }}>
              <Col>
                <Input
                  id={name}
                  onChange={filterParam}
                  placeholder={`digite um valor para ${name}`}
                  style={{ width: 300 }}
                  addonBefore={`${name}:`}
                />
              </Col>
            </Row>
          ))
        }
      </Col>
    )
  }

  const onSelectColumns = (c) => {
    setFilteredKeys(c);
  }

  const getColumns = (cols) => {
    return (
      <Col>
        <Row justify='space-between' gutter={8}>
          <Title level={3}>Filtrar Colunas</Title>
          <Checkbox.Group
            style={{
              width: '100%',
            }}
            onChange={onSelectColumns}
          >
            {
              cols.map((value) => (
                <Col>
                  <Checkbox value={value}>{value}</Checkbox>
                </Col>
              ))
            }

          </Checkbox.Group >
        </Row>
      </Col>
    )
  }

  const onSelectTable = (table) => {
    setSelectedTable(table);
    setParams({});
    setColumns(getColumns(tables[table].columns));
    setFilters(getFilters(tables[table].columns));
  }

  const loadTables = async () => {
    const tableRequest = await getTables();
    if (tableRequest.data) {
      setTables(tableRequest.data);
    }
  }

  useEffect(() => {
    loadTables();
  }, []);

  return (
    <div style={{ margin: '3rem' }}>
      <Row gutter={8}>
        <Col span={8}>
          <Card
            title={<Title level={3}>Consulta - Base de Dados IBGE</Title>}
            bodyStyle={{ boxShadow: '0 1px 2px rgba(0,0,0,.1)' }}
            extra={
              <Button onClick={findParams}>
                Buscar
              </Button>
            }
          >
            <Row gutter={8} >
              <Col>
                <Title level={3}>Selecionar Tabela</Title>
              </Col>
              <Col>
                <Select onChange={onSelectTable} style={{ width: '300px' }}>
                  {
                    Object.entries(tables).map(([key, value], index) => (
                      <Select.Option key={index} value={key}>
                        {key}
                      </Select.Option>
                    ))
                  }
                </Select>
              </Col>
            </Row >
            <Row style={{ marginTop: 20 }} gutter={8}>
              <Col span={24}>
                {columns}
              </Col>
            </Row >
            <Row style={{ marginTop: 10 }} gutter={8}>
              {filters}
            </Row>
            <Row style={{ marginTop: 20 }} gutter={8}>
              <Col>
                <Title level={3}>Quantidade de linhas</Title>
              </Col>
              <Col>
                <Input
                  onChange={(e) => setLinhas(e.target.value)}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col style={{ marginLeft: 30 }}>
          <Card
            title={<Title level={3}>Resultado da Busca</Title>}
            bodyStyle={{ boxShadow: '0 1px 2px rgba(0,0,0,.1)' }}
          >
            <Table
              bordered={true}
              pagination={false}
              columns={
                filteredKeys.map((v, i) => ({
                  title: v,
                  key: i,
                  render: (_, record) => (record[v])
                }))
              }
              dataSource={data}
            />
          </Card>
        </Col>
      </Row>
    </div >
  );
}

export default App;
