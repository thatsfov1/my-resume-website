import React from 'react'
import {skills} from '../constants/index'
import CTA from "../components/CTA";

const About = () => {
  return (
    <section className='max-container'>
        <h1 className='head-text'>
            Hi, I'm {' '}
            <span className='blue-gradient_text font-semibold drop-shadow'>
                Yevhenii
            </span>{' '}
            👋
        </h1>

        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
            <p>Frontend Developer from Ukraine, currently studying Computer Science in
                Częstochowa University of Technology. Specializing in building Web Applications
                using React and other tools.</p>
        </div>

        <div className='py-10 flex flex-col'>
            <h3 className='subhead-text'>My Skills</h3>
            <div className="mt-16 flex gap-12 flex-wrap">
                {skills.map((skill)=>(
                    <div className='block-container w-20 h-20' key={skill.name}>
                        <div className='btn-back rounded-xl' />
                        <div className='btn-front rounded-xl flex justify-center items-center'>
                            <img alt={skill.name}
                                 src={skill.imageUrl}
                                 className='w-1/2 h-1/2 object-contain'
                            />

                        </div>
                    </div>
                ))}
            </div>
        </div>

        <hr className='border-slate-200'/>

        <CTA />
    </section>
  )
}

export default About
