import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import SearchHeader from '../components/SearchHeader'

const queryClient = new QueryClient();

export default function Root(){
    const navigate = useNavigate();
    const [searchWord, setSearchWord] = useState('베스트 뮤직비디오');
    const [videoData, setVideoData] = useState([]);

    const handleSubmit = (keyword) => {
        setSearchWord(keyword);
        navigate("/video");
    };
    const handleSaveVideo = (videos) => {
        setVideoData(videos);
    }
   
    return (
        <QueryClientProvider client={queryClient}>
            <div className="w-full mx-auto">
                <SearchHeader
                    searchWord={searchWord}
                    onSubmit={(keyword) => handleSubmit(keyword)}
                />
                <Outlet context={{ searchWord, videoData, handleSaveVideo }} />
            </div>
        </QueryClientProvider>
   );
}