import React, {useEffect} from "react";
import {Card, Col, Row} from 'antd';
import {useAppDispatch} from "../store";
import {useSelector} from "react-redux";
import {getNewsList} from "../store/newsSelectors";
import {setNewsList} from "../store/newsSlice";
import {NavLink} from "react-router-dom";
import dayjs from 'dayjs';

const serverPort = process.env.REACT_APP_SERVER_PORT
const serverAddress = `//localhost:${serverPort}`

export default function CustomNewPage() {
    const dispatch = useAppDispatch();

    const news = useSelector(getNewsList)

    useEffect(() => {
        fetch(`${serverAddress}/custom-news`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(setNewsList(data))
            })

    }, [dispatch]);

    return (
        <>
            <h1>Мои статьи</h1>
            <Row gutter={16}>
                {!news.length && 
                    <p>Напишите свою <NavLink to="/write-news">первую статью</NavLink></p>
                }
                {
                        news && !!news.length &&
                        news.map((newItem) => {
                            return <Col span={6}>
                                <Card style={{ marginTop: 16 }} bordered={false} hoverable title={newItem.title}>
                                    <p>Автор: {newItem.author}</p>
                                    <p>Дата: {dayjs(newItem.published_at).format('DD/MM/YYYY')}</p>
                                    <p>
                                        <img
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            alt="Пример"
                                            width="200" style={{float: 'left', margin: '0 0.5em 0.5em 0'}}
                                        />
                                    </p>
                                    <p>{newItem.content}</p>
                                </Card>
                            </Col>
                        })
                    }
            </Row>
        </>
    );
}