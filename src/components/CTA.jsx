import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <section className="cta">
            <p className="cta-text">
                Need to contact Me? <br className="sm:block hidden" />
                Let's have a chat!
            </p>
            <Link to="/contact" className="btn">
                Contact
            </Link>
        </section>
    );
};

export default CTA;
