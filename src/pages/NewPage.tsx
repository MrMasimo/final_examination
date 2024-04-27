import {Card, Spin , Col, Row} from 'antd';
import {useFetch} from "../customHooks/useFetch";

export default function NewPage() {
    const { Meta } = Card;
    const {newsData, isLoading} = useFetch('https://newsapi.org/v2/top-headlines');

    return (
        <>
            <h1>Новости</h1>
            <Row gutter={16}>
                {isLoading && <Spin size="large"/>}
                {
                        !isLoading && newsData && newsData.status === 'ok' &&
                        newsData.articles.map((article) => {
                            return <Col span={4}>
                                <Card style={{ marginTop: 16 }} bordered={false} hoverable
                                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" 
                                />}
                                >
                                <Meta title={article.title} description={article.author} />
                                </Card>
                            </Col>
                        })
                    }
            </Row>
        </>
    );
}
