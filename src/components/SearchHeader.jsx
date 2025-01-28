import React from 'react';
import { useState, useRef } from 'react';
import { CiSearch } from "react-icons/ci";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { Link } from 'react-router-dom';

export default function SearchHeader({ searchWord, onSubmit }){
    const [keyword, setKeyword] = useState(searchWord);
    const inputRef = useRef(null);
   
    const handleSubmit = (e) => {
      e.preventDefault();
      const keyText = keyword.replace(/^\s+|\s+$/gm, "");
      if(!keyText.length){
         setKeyword('');
         return false;
      }
      inputRef.current.blur();
      onSubmit(keyText);
    }    
   
    return (
        <div className="flex justify-between align-middle py-6 px-8">
            <h1 className="text-3xl text-white font-bold">
                <Link to="/" className='flex items-center '><PiYoutubeLogoLight className='mr-1 text-4xl' /> Youtube</Link>
            </h1>
            <div className="w-2/4 border border-gray-500 rounded-3xl overflow-hidden">
                <form className="search-wrap flex h-full" onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        type="search"
                        value={keyword}
                        className="w-5/6 px-3 py-1.5 bg-transparent outline-none text-white focus:border-none"
                        onFocus={() => inputRef.current.value = ''}
                        onBlur={() => inputRef.current.value = keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" onClick={handleSubmit} className="flex border-l w-1/6 border-gray-500"><CiSearch className="m-auto text-2xl text-white" /></button>
                </form>
            </div>
        </div>
   );
}