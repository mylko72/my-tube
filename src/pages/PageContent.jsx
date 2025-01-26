import React from 'react';
import { useOutletContext } from 'react-router-dom';
import VideoLists from '../components/VideoLists';

export default function PageContent(){
   const { searchWord, handleSaveVideo } = useOutletContext();
   
   return (
      <div className="px-8 py-5">
         <VideoLists searchWord={searchWord} onSave={handleSaveVideo} />
      </div>
   );
}