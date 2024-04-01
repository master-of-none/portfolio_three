import { Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import Fox from "../models/Fox";
import Loader from "../components/Loader";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", mesasge: "" });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleFocus = () => {};
    const handleBlur = () => {};

    const formRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
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
                //! Add alert
                //! Add hide
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
                //! Show the error message
            });
    };

    const [isLoading, setIsLoading] = useState(false);

    return (
        <section className="relative flex lg:flex-row flex-col max-container">
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
                            position={[0.5, 0.35, 0]}
                            rotation={[12.8, -0.6, 0]}
                            scale={[0.5, 0.5, 0.5]}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
};

export default Contact;
