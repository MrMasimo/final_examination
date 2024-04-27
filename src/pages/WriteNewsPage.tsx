import {addNew} from "../store/newsSlice";
import {useAppDispatch} from "../store";
import {NewType} from "../types/newType";
import dayjs from 'dayjs';
import {Button, Form, Input, FormProps} from "antd";
import React, {useState, useEffect} from "react";

type NewFormType = {
    author: string,
    title: string,
    description: string,
    content: string,
}

export default function WriteNewsPage () {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const values = Form.useWatch([], form);

    useEffect(() => {
        form
            .validateFields({validateOnly: true})
            .then(() => setSubmitDisabled(false))
            .catch(() => setSubmitDisabled(true));
    }, [form, values]);

    const submitHandler:FormProps<NewFormType>["onFinish"] = async (formData: NewFormType) => {
        const newNew = {
            id:undefined,
            created_at: dayjs().toISOString(),
            author: formData.author,
            title: formData.title,
            description: formData.description,
            published_at: dayjs().toISOString(),
            content: formData.content,
        } as NewType

        dispatch(addNew(newNew))
        form.resetFields()
    }

    return (
        <>
            <h1>Новая статья</h1>
            <Form
            form={form}
            layout={'horizontal'}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={submitHandler}
        >
            <Form.Item
                label="Автор"
                name="author"
                rules={[
                    { required: true, message: 'Введите автора' }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Название"
                name="title"
                rules={[
                    { required: true, message: 'Введите заголовок статьи' }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item 
                label="Описание статьи"
                name="description"
                rules={[
                { required: true, message: 'Введите заголовок статьи' }
                ]}
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item 
                label="Текст статьи"
                name="content"
                rules={[
                { required: true, message: 'Введите текст статьи' }
                ]}
            >
                <TextArea rows={12} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={submitDisabled}
                >Опубликовать</Button>
            </Form.Item>
        </Form>
        </>
    );
}
