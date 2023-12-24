import React, {useRef, Suspense, useState} from 'react'
import emailjs from '@emailjs/browser'
import {Canvas} from "@react-three/fiber";
import Loader from "../components/Loader";
import Fox from "../models/Fox";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";

const Contacts = () => {
    const [form, setForm] = useState({name: '', email: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState('idle');
    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }
    const {alert, showAlert, hideAlert } = useAlert()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setCurrentAnimation('hit')
        try {
           await emailjs.send(
               import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
               import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                {
                    from_name:form.name,
                    to_name:'Yevhenii',
                    from_email:form.email,
                    to_email:'evgkulikovskyy@gmail.com',
                    message:form.message
                },
               import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            )
            setIsLoading(false)
            showAlert({show:true, type:'success', text:'Message sent successfully'})
            setTimeout(()=>{
                hideAlert()
                setForm({name:'', email:'', message: ''})
                setCurrentAnimation('idle')
            },[3000])
        }catch (e) {
            setCurrentAnimation('idle')
            setIsLoading(false)
            console.log(e)
            showAlert({show:true, type:'danger', text: "I didn't receive your message"})
        }
    }

    const handleFocus = () => {
        setCurrentAnimation('walk')
    }
    const handleBlur = () => {
        setCurrentAnimation('idle')
    }

    return (
    <section className='relative flex lg:flex-row flex-col max-container h-[100vh]'>
        {alert.show && <Alert {...alert}/>}
        <div className='flex-1 min-w-[50%] flex flex-col'>
            <h1 className='head-text'>Get in Touch</h1>
            <form
                className='w-full flex flex-col gap-7 mt-14' onSubmit={handleSubmit}
            >
                <label className='text-black-500 font-semibold'>
                    Name
                    <input
                        type='text'
                        name='name'
                        className='input'
                        required
                        placeholder='John'
                        value={form.name}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </label>
                <label className='text-black-500 font-semibold'>
                    Email
                    <input
                        type='email'
                        name='email'
                        className='input'
                        required
                        placeholder='john@gmail.com'
                        value={form.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </label>
                <label className='text-black-500 font-semibold'>
                    Your message
                    <textarea
                        name='message'
                        className='input'
                        required
                        placeholder='Please let me know how can I help you'
                        value={form.message}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </label>
                <button
                    type='submit'
                    className='btn'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send message'}
                </button>
            </form>
        </div>
        <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
            <Canvas
                camera={{
                    position: [0,0,5],
                    fov: 75,
                    near: 0.1,
                    far: 1000
                }}
            >
                <directionalLight intensity={2.5} position={[0,0,1]} />
                <ambientLight intensity={0.5}/>
                <Suspense fallback={<Loader/>}>
                    <Fox
                        position={[0.5,0.35,0]}
                        rotation={[12.6,-0.6,0]}
                        scale={[0.5,0.5,0.5]}
                        currentAnimation={currentAnimation}
                    />
                </Suspense>
            </Canvas>
        </div>
    </section>
  )
}

export default Contacts
