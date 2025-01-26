import React, { useEffect, useState } from 'react';
import HotTrends from '../components/HotTrends';
import { TbArrowBack } from "react-icons/tb";
import { useParams, useSearchParams, Link, useOutletContext } from 'react-router-dom';

export default function VideoDetail(){
    const { videoId } = useParams();
    const { videoData } = useOutletContext();
    const [trendData, setTrendData ] = useState([]);
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');

    useEffect(() => {
      window.scrollTo(0, 0);
    });

    console.log('type', type);
    console.log('videoData', videoData);

    const filteredData = () => {
       const fetchData = type === 'default' ? videoData : trendData;
       return fetchData.items.filter(item => {
          const itemType = item.id.kind?.split('#')[1];
          const itemId = type === 'default' ? item.id[`${itemType}Id`] : item.id;
          return itemId === videoId;
       });
    }
    
    const videoItem = filteredData();
    const handleSaveTrends = (videos) => {
       setTrendData(videos);
    }
    const { title, description, channelTitle } = videoItem[0].snippet;
   
    return (
        <div className='video-detail px-8'>
            <div className='mb-3'><Link to="/video" className='flex items-center text-lg text-white'><TbArrowBack className='mr-1' /> 뒤로 가기</Link></div>
            <div className='flex justify-between flex-col lg:flex-row gap-x-4'>
               <div className='w-full lg:w-3/4'>
                  <div className="video-player">
                     <iframe width="100%" height="540" src={`http://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <div className="video-detail__info text-white py-5">
                     <div className='max-h-16 my-4 text-2xl line-clamp-2'>{title}</div>
                     <div className='flex flex-col'>
                        <p className='inline-flex py-0.5 text-lg'>{channelTitle}</p>
                        <p className='inline-flex py-4 text-md'>{description}</p>                
                     </div>
                  </div>
               </div>
               <div className="w-full lg:w-1/4">
                  <HotTrends chart='mostPopular' onSave={handleSaveTrends} />
               </div>
            </div>
        </div>
    )
}