import { accenture } from "../assets/images";
import {
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript,
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: motion,
        name: "Motion",
        type: "Animation",
    },
    {
        imageUrl: mui,
        name: "Material-UI",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: redux,
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    },
];

export const experiences = [
    {
        title: "Application Development Analyst",
        company_name: "Accenture",
        icon: accenture,
        iconBg: "#accbe1",
        date: "June 2019 - June 2021",
        points: [
            "SAP idoc Jobs Scheduling and Monitoring: Worked with team of 4 and created and monitored various SAP jobs for automating the delivery, shipment, and invoice idocs in SAP EDI integration.",
            "Real Time Ticket Monitoring: Worked on Service Now in real-time ticket monitoring and solved over 500 tickets including various high-priority tickets in the given SLA for the idoc processing. Received numerous appreciation from Clients for the on-time deployment of code on client systems and solving client tickets within SLA.",
            "Creation and management of various Change Requests: Developed various Change Requests as requested by the customer on the Service now platform to modify the given code in the idocs and implemented on the customer system",
            "NBN Internet Networking: Developed software for the NBN(National Broadband Network) an Australian national wholesale open-access data network to deploy the connections to the houses and to increase the network security.",
        ],
    },
];

export const socialLinks = [
    {
        name: "Contact",
        iconUrl: contact,
        link: "/contact",
    },
    {
        name: "GitHub",
        iconUrl: github,
        link: "https://github.com/master-of-none",
    },
    {
        name: "LinkedIn",
        iconUrl: linkedin,
        link: "https://www.linkedin.com/in/shrikrishna-bhat",
    },
];

export const projects = [
    {
        iconUrl: pricewise,
        theme: "btn-back-red",
        name: "Rhythmic Forge",
        description:
            "Designed architecture and developed a vibrant virtual drum machine application which involved employing advanced sound synthesis techniques and intuitive user interface design",
        link: "https://github.com/master-of-none/rhythmic-forge",
    },
    {
        iconUrl: threads,
        theme: "btn-back-green",
        name: "Text Visionator",
        description:
            "Worked with a team to develop an innovative solution leveraging Python Flask and JavaScript for translating text between various languages and integrated Google Vision API for text extraction from images and deployed using docker and Kubernetes.",
        link: "https://github.com/master-of-none/image-text-translation",
    },
    {
        iconUrl: car,
        theme: "btn-back-blue",
        name: "Rust In Peace",
        description:
            "Developed a text-based game using Rust programming language, focusing on performance and type safety. The game involves player exploration, combat, and decision-making in a turn-based environment.",
        link: "https://github.com/master-of-none/rust-in-peace",
    },
    {
        iconUrl: snapgram,
        theme: "btn-back-pink",
        name: "Full Stack Instagram Clone",
        description:
            "Built a complete clone of Instagram, allowing users to share photos and connect with friends in a familiar social media environment.",
        link: "https://github.com/adrianhajdin/social_media_app",
    },
    {
        iconUrl: estate,
        theme: "btn-back-black",
        name: "Programming Camel",
        description:
            "Built command line parsing tools and worked on Async concurrent programming in Ocaml. Used various open-source OCaml tools by Jane Street to build test servers and type-safe and query-optimized applications. Collaborated on an open-source project of writing LeetCode solutions in OCaml",
        link: "https://github.com/master-of-none/ocaml",
    },
    {
        iconUrl: summiz,
        theme: "btn-back-yellow",
        name: "Recipe and Nutrition tracker",
        description:
            "Developed an application in Python and used the flask framework to deploy a website which gives the recipe based on ingredients and also calculates its nutritional value. Used the Spoonacular and the Edamam APIs to build and store the data in the Cloudstore database.",
        link: "https://github.com/master-of-none/Internet-Web-and-Cloud/tree/main/final",
    },
];
