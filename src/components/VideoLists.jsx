import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Video from './Video';

export default function VideoLists({ searchWord, onSave }) {
   const { isLoading, isSuccess, error, data: videos } = useQuery({
      queryKey: ['videos', searchWord],
      queryFn: async () => {
         console.log('fetching...');
         return fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchWord}&regionCode=Kr&key=AIzaSyBUrZ1X5gYTwsv1GtKoRCi_ObLUCor4x-k`).then(res => res.json());         
      },
      staleTime: 1000 * 60 * 5,
   });
   
   if(isLoading) return <p>Loading...</p>;
   if(isSuccess){
        console.log('fetch success..')
        onSave(videos);
   }
   if(error) return <p>{ error }</p>
   
   return (
      <>
         <div className="video-lists flex flex-wrap">
            {
                videos.items.map((item, index) => (
                    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5' key={index}>
                        <Video video={item} />
                    </div>
                ))
            }
         </div>
      </>
   );
}