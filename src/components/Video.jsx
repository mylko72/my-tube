import React from 'react';
import { Link } from 'react-router-dom';

export default function Video({ video, type='default' }) {
    const { thumbnails, title, description, channelTitle } = video.snippet;
    const videoType = video.id.kind?.split('#')[1];
    const videoId = videoType ? `${videoType}Id` : video.id;
    const videoUrl = type === 'default' ? `/video/${video.id[videoId]}?type=${type}` : `/video/${video.id}?type=${type}`;

    const started = new Date(video.snippet.publishedAt);
    const today = new Date();
    const relativeFormatter = new Intl.RelativeTimeFormat("ko", {
        numeric: "always",
      });
    const daysPassed = Math.ceil(
        (started.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
    const daysAgo = relativeFormatter.format(daysPassed, "day");
   
    return (
        <div className={type === 'default' ? 'video-items mx-2 my-7' : 'video-items mb-3'}>
            <div className='video-items__wrap'>
                <div className='video-items__thumbnail h-60 md:h-52 border border-slate-800 rounded-xl overflow-hidden'>
                    <Link to={videoUrl}><img className="object-contain h-full" src={thumbnails.medium.url} alt={description} /></Link>
                </div>
                <div className='video-items__details text-white'>
                    <div className={type === 'default' ? 'max-h-12 my-2 text-md line-clamp-2' : 'text-sm line-clamp-2'}>{title}</div>
                    <div className='flex flex-col'>
                        <p className={type === 'default' ? 'inline-flex py-0.5 text-sm line-clamp-1' : 'mt-2 text-xs line-clamp-1'}>{channelTitle}</p>
                        <p className={type === 'default' ? 'py-1 text-sm' : 'mt-2 text-xs'}>{daysAgo}</p>
                    </div>
                </div>
            </div>
        </div>
   )
}