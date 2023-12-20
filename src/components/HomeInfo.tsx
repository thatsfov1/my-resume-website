import React from 'react'
import {Link} from "react-router-dom";
import {arrow} from '../assets/icons'

const InfoBox = ({text, link, btnText})=>(
    <div className='info-box'>
        <p className='text-center font-medium sm:text-xl'>{text}</p>
        <Link to={link} className='neo-brutalism-white neo-btn'>
            {btnText}
            <img src={arrow} className='w-4 h-4 object-contain'/>
        </Link>
    </div>
)

const renderInfo = {
    1:(
        <h1 className='sm:text-xl sm:leading-snug text-center
        neo-brutalism-blue py-4 px-8 text-white mx-5'>
            Hi, I am <span className='font-semibold'>Yevhenii</span> 🙌
            <br/>
            A Frontend Developer from Ukraine
        </h1>
        ),
    2:(
        <InfoBox text='Student of Computer Science in Poland' link='/about' btnText='Learn more'/>
    ),
    3:(
        <InfoBox text='Done multiple projects to extand my knowledge of new technologies' link='/projects' btnText='Visit my portfolio'/>
    ),
    4:(
        <InfoBox text="Need a project done or looking for a dev in your company? I'm a few keystrokes away " link='/contacts' btnText="Let's talk"/>
    )
}

const HomeInfo = ({currentStage}) => {
        return renderInfo[currentStage] || null
}

export default HomeInfo
