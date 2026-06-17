
import React from 'react'
import Navbar from '../components/navbar/Navbar'

const AppDetail = () => {
    return (
        <div className='bg-full-gray' >
            <Navbar />
            <div className='text-center text-2xl text-white bg-gray-700' >About App</div>
            <br></br>
            <div className='text-white-900 text-2xl text-italic '><u>Ai Resume Generator App</u></div>
            <br></br>
            <p className='' >The proposed project is an AI Resume Generator Web Application
                that helps users create professional resumes quickly and easily.
                Many students and job seekers face difficulties in designing resumes
                and writing professional content. This project solves these problems by
                providing a platform where users can enter their information, select 
                templates, and generate resumes instantly.
                The application will include features like multiple resume
                templates, AI-based suggestions, and PDF download options.
                The project will be developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js).
                The main goal is to build a simple, fast, and user-friendly
                resume generator. This project will also improve practical web
                development skills and provide a useful tool for students and professionals.
            </p><br></br>

            <div>
               <img src="flowchart.png"/>
            </div><br></br>

            <div className='text-2xl text-center bg-gray-800 text-white' >USED TECHNOLOGYOF THIS PROJECT</div>
            <li className='text-center text-bold' >
                <p>NODE.js</p>
                <p>MONGODB</p>
                <p>Express</p>
                <p>React</p>
            </li><br></br>

            <div className='text-2xl text-center bg-gray-900 text-white' >PURPOSE OF THIS PROJECT</div>

        </div>
    )
}

export default AppDetail