import React from "react";
import "./Section.css"; // Custom CSS for section styling

const Section = () => {
  return (
    <div>
      {/* First Section - Digital Marketing Effective */}
      <section className="main-section" id="digital-marketing">
        <div className="container">
          <div className="content-wrapper">
            {/* Image Section (Left) */}
            <div className="img-container left">
              <img
                src="https://unstoptechnosolution.com/assets/image/marketing.jpg"
                alt="Digital Marketing"
                className="img-fluid"
              />
            </div>

            {/* Text Section (Right) */}
            <div className="text-container right">
              <h2 className="section-title">What Makes Digital Marketing Effective?</h2>
              <p className="section-description">
                Reaching your audience is only one aspect of digital marketing; the other is establishing meaningful and quantifiable connections with them that will foster engagement and growth over the long run.
              </p>
              <a href="#learn-more" className="btn-main">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - Solution Image */}
      <section className="main-section" id="solution-image">
        <div className="container">
          <div className="content-wrapper">

            {/* Text Section (Left) */}
            <div className="text-container left">
              <h2 className="section-title">Content Matters</h2>
              <p className="section-description">
                The art of creating engaging content involves telling tales that captivate readers, enlighten them, and motivate them to take action—converting site visitors into devoted supporters and followers.
              </p>
              <a href="#learn-more" className="btn-main">Learn More</a>
            </div>

            {/* Image Section (Right) */}
            <div className="img-container right">
              <img
                src="https://unstoptechnosolution.com/assets/image/boximage.jpg"
                alt="Solution"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section;
