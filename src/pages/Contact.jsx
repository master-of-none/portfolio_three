import { Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import Fox from "../models/Fox";
import Loader from "../components/Loader";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";
import { socialLinks } from "../constants";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", mesasge: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState("idle");
    const { alert, showAlert, hideAlert } = useAlert();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleFocus = () => setCurrentAnimation("walk");
    const handleBlur = () => setCurrentAnimation("idle");
    const formRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCurrentAnimation("hit");
        emailjs
            .send(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    to_name: "Shrikrishna",
                    from_email: form.email,
                    to_email: "shrikrishna.bht@gmail.com",
                    mesasge: form.mesasge,
                },
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            )
            .then(() => {
                setIsLoading(false);
                showAlert({
                    show: true,
                    text: "Message successfully sent",
                    type: "success",
                });

                setTimeout(() => {
                    hideAlert();
                    setCurrentAnimation("idle");
                    setForm({ name: "", email: "", mesasge: "" });
                }, [3000]);
            })
            .catch((error) => {
                setIsLoading(false);
                setCurrentAnimation("idle");
                console.log(error);
                showAlert({
                    show: true,
                    text: "Message is not received",
                    type: "danger",
                });
            });
    };

    return (
        <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">
            {alert.show && <Alert {...alert} />}
            <div className="flex-1 min-w-[50%] flex flex-col">
                <h1 className="head-text"> Let's Connect </h1>

                <form
                    className="w-full flex flex-col gap-7 mt-14"
                    onSubmit={handleSubmit}
                >
                    <label className="text-black-500 font-semibold">
                        Name
                        <input
                            type="text"
                            name="name"
                            className="input"
                            placeholder="Joe Random"
                            required
                            value={form.name}
                            onChange={handleChange}
                            onFocus={handleBlur}
                            onBlur={handleBlur}
                        />
                    </label>

                    <label className="text-black-500 font-semibold">
                        Email
                        <input
                            type="email"
                            name="email"
                            className="input"
                            placeholder="joe.random@gmail.com"
                            required
                            value={form.email}
                            onChange={handleChange}
                            onFocus={handleBlur}
                            onBlur={handleBlur}
                        />
                    </label>

                    <label className="text-black-500 font-semibold">
                        Message
                        <textarea
                            name="mesasge"
                            rows={4}
                            className="textarea"
                            placeholder="Just a click away"
                            required
                            value={form.mesasge}
                            onChange={handleChange}
                            onFocus={handleBlur}
                            onBlur={handleBlur}
                        />
                    </label>
                    <button
                        type="submit"
                        className="btn"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending . . ." : "Click to Send"}
                    </button>
                </form>
            </div>

            <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
                <Canvas
                    camera={{
                        position: [0, 0, 5],
                        fov: 75,
                        near: 0.1,
                        far: 1000,
                    }}
                >
                    <directionalLight intensity={2.5} position={[0, 0, 1]} />
                    <ambientLight intensity={0.5} />
                    <Suspense fallback={<Loader />}>
                        <Fox
                            currentAnimation={currentAnimation}
                            position={[0.5, 0.35, 0]}
                            rotation={[12.8, -0.6, 0]}
                            scale={[0.5, 0.5, 0.5]}
                        />
                    </Suspense>
                </Canvas>
            </div>
            {/* Social Links */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-4">
                {socialLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={link.iconUrl}
                            alt={link.name}
                            className="h-8 w-8"
                        />
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Contact;
