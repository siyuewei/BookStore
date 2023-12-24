import React, {useState } from 'react';
import {Button, List, Modal} from "antd";
import {getHotWords} from "../../Service/BookService";
const HotWords = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hotWords, setHotWords] = useState(["Loading..."]);

    const showModal = () => {
        setIsModalOpen(true);
        getHotWords().then((res) => {
            if (res.status === 0) {
                const wordsArray = [];
                for (const key in res.data) {
                    if (res.data.hasOwnProperty(key)) {
                        const wordString = `${key}: ${res.data[key]}`;
                        wordsArray.push(wordString);
                    }
                }
                setHotWords(wordsArray);
            }
        });
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                查看热词
            </Button>
            <Modal title="Hot Words" open={isModalOpen} onOk={handleOk} >
                <List dataSource={hotWords}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                />
            </Modal>
        </>
    );
}
export default HotWords;