import { useRef, useState } from "react";
const Contact = () => {
    const [form, setform] = useState({ name: "", email: "", mesasge: "" });
    const handleChange = () => {};
    const handleFocus = () => {};
    const handleBlur = () => {};

    const formRef = useRef(null);
    const handleSubmit = () => {};

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
        </section>
    );
};

export default Contact;
