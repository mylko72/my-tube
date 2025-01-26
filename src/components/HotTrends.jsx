import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Video from './Video';

export default function HotTrends({ chart, onSave }){
   const { isLoading, isSuccess, error, data: videos } = useQuery({
      queryKey: ['videos', chart],
      queryFn: async () => {
         console.log('fetching...');
         return fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=${chart}&maxResults=25&regionCode=Kr&key=AIzaSyBUrZ1X5gYTwsv1GtKoRCi_ObLUCor4x-k`).then(res => res.json());
      },
      staleTime: 1000 * 60 * 5,
   });
   
   if(isLoading) return <p>Loading...</p>;
   if(isSuccess){
      onSave(videos);
   }
   if(error) return <p>{error}</p>
   
   return (
      <>
         <div className="hot-trends">
            {
               videos.items.map((item, index) => (
                  <div className='flex flex-col' key={index}>
                     <Video video={item} type='trends' />
                  </div>
               ))
            }
         </div>
      </>
   );
}