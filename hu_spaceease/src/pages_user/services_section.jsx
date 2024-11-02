import React from 'react';
import './services_section.css'; // CSS for styling the component

function ServicesSection() {
    return (
        <section className="services-section">
            <div className="services-container">
                <div className="services-image">
                    <img src="images/hu_loho.jpg" alt="Hand holding phone" className="services-image-content" />
                </div>
                <div className="services-content">
                    <h2 className="services-title">Best Services</h2>
                    <div className="services-items">
                        <div className="services-item">
                            <h3>Responsive Development</h3>
                            <p>Built using the latest web technologies like HTML5, CSS3, and jQuery, rest assured this design will look stunning on every device under the sun.</p>
                        </div>
                        <div className="services-item">
                            <h3>Responsive Development</h3>
                            <p>Built using the latest web technologies like HTML5, CSS3, and jQuery, rest assured this design will look stunning on every device under the sun.</p>
                        </div>
                        <div className="services-item">
                            <h3>Responsive Development</h3>
                            <p>Built using the latest web technologies like HTML5, CSS3, and jQuery, rest assured this design will look stunning on every device under the sun.</p>
                        </div>
                        <div className="services-item">
                            <h3>Responsive Development</h3>
                            <p>Built using the latest web technologies like HTML5, CSS3, and jQuery, rest assured this design will look stunning on every device under the sun.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;
