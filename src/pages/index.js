import styles from './index.css';
import { connect } from 'dva';
import { Layout, Breadcrumb } from 'antd';
import SniffsTree from '../components/SniffsTree';
import Sniff from '../components/Sniff';

const { Content, Sider } = Layout;

const Index = ({ dispatch, sniffs, selectedSniff }) => {
  const handleSelect = keys => {
    dispatch({
      type: 'sniffs/select',
      payload: keys,
    });
  }

  const handleOnActionChange = action => {
    dispatch({
      type: 'sniffs/actionChange',
      payload: action,
    });
  }

  let content;
  let breadcrumbItems = [];

  if(selectedSniff) {
    content = <Sniff sniff={selectedSniff} onActionChange={handleOnActionChange}/>;
    selectedSniff.key.split('.').forEach(standard =>{
      breadcrumbItems.push(<Breadcrumb.Item key={standard}>{standard}</Breadcrumb.Item>)
    })
  }

  return (
    <>
      <Sider width={500} className={styles.leftSider}>
        <h2>Sniffs</h2>
        <SniffsTree onSelect={handleSelect} sniffs={sniffs} />
      </Sider>
      <Layout className={styles.innerLayout}>
        <Breadcrumb className={styles.breadcrumb}>
          {breadcrumbItems}
        </Breadcrumb>
        <Content className={styles.mainContent}>
          {content}
        </Content>
      </Layout>
    </>
  );
}

export default connect(state => {
  return {
    sniffs: state.sniffs.list,
    selectedSniff: state.sniffs.selected
  }
})(Index);
