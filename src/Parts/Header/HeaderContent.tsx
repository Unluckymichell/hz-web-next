import React from 'react'
import TitleText from '../../Components/TitleText'
import Divider from '../../Components/Divider'
import { FaHeart } from 'react-icons/fa'

function HeaderContent() {
    return <div className='h-full flex flex-col gap-6 justify-center items-center font-(family-name:--font-lobster)'>
        <TitleText className="sm:text-4xl text-3xl text-center">
            Corinna und Michael
        </TitleText>
        <div className="flex items-center gap-2 w-[70%]">
            <Divider />
            <FaHeart aria-label='Heart Icon' className="text-lg text-pink-400 drop-shadow-[0px_0px_4px_var(--color-pink-500)]" />
            <FaHeart aria-label='Heart Icon' className="text-2xl text-pink-400 drop-shadow-[0px_0px_5px_var(--color-pink-500)]" />
            <FaHeart aria-label='Heart Icon' className="text-lg text-pink-400 drop-shadow-[0px_0px_4px_var(--color-pink-500)]" />
            <Divider />
        </div>
        <TitleText className="sm:text-3xl text-2xl text-center">
            Sind seit 07.06.2025 glücklich verheiratet!
        </TitleText>
    </div>
}

export default HeaderContent