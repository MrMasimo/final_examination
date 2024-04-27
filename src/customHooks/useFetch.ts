import {useEffect, useState} from "react";
import { NewsResponseType } from '../types/newsResponse';

const newApiKey = process.env.REACT_APP_NEWS_API_KEY

export const useFetch = (url:String) => {
    const [newsData, setData] = useState<NewsResponseType>();
    const [isLoading, setIsLoading] = useState<Boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(url+'?' + new URLSearchParams({
            apiKey: newApiKey || '',
            country: 'ru'
        }))
        .then((res) => res.json())
        .then((data) => {
            setData(() => data)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [url]);

    return { newsData, isLoading}
}