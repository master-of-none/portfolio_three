import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";
const InfoBox = ({ text, link, btnText }) => (
    <div className="info-box">
        <p className="font-medium sm:text-xl text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn">
            {btnText}
            <img src={arrow} className="w-4 h-4 object-contain" />
        </Link>
    </div>
);
const renderContent = {
    1: (
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
            Hi, My Name is
            <span className="font-semibold"> Shrikrishna Bhat</span> 👋🏻
            <br />A Software Engineer
        </h1>
    ),
    2: (
        <InfoBox
            text="CS Grad from PSU | Looking to develop Scalable, Type Secure Applications"
            link="/about"
            btnText="Learn More"
        />
    ),
    3: (
        <InfoBox
            text="Have 2 years of SDE experience and led multiple projects over the years."
            link="/projects"
            btnText="Check out for more info."
        />
    ),
    4: (
        <InfoBox
            text="Looking to contact me, I am just a few clicks away"
            link="/contact"
            btnText="Let's connect"
        />
    ),
};

const HomeInfo = ({ currentStage }) => {
    return renderContent[currentStage] || null;
};

export default HomeInfo;
