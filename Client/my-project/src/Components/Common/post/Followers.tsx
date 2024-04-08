import React from "react";
import "./follow.scss";

const Followers = () => {
  return (
    <div className="hero">
      <div className="search">
        <input
          className="searchbox"
          type="search"
          placeholder="Search Design and Products...."
        />
      </div>
      <div className="container">
        <div className="section">
          <div className="each">
            <img className="img"
              src={require("../../Assets/images/IMG_20221212_195813_456.jpg")}
              alt="img"
            />
          </div>
          <div className="text">
            <h4>Sooraj Hari</h4>
            <p>Service Provider</p>
          </div>
        </div>

        <div className="end">
          <button>Remove</button>
        </div>
      </div>
      <div className="container">
        <div className="section">
          <div className="each">
            <img className="img"
              src={require("../../Assets/images/IMG_20221212_195813_456.jpg")}
              alt="img"
            />
          </div>
          <div className="text">
            <h4>Sooraj Hari</h4>
            <p>Service Provider</p>
          </div>
        </div>

        <div className="end">
          <button>Remove</button>
        </div>
      </div>
      <div className="container">
        <div className="section">
          <div className="each">
            <img className="img"
              src={require("../../Assets/images/IMG_20221212_195813_456.jpg")}
              alt="img"
            />
          </div>
          <div className="text">
            <h4>Sooraj Hari</h4>
            <p>Service Provider</p>
          </div>
        </div>

        <div className="end">
          <button>Remove</button>
        </div>
      </div>
      <div className="container">
        <div className="section">
          <div className="each">
            <img className="img"
              src={require("../../Assets/images/IMG_20221212_195813_456.jpg")}
              alt="img"
            />
          </div>
          <div className="text">
            <h4>Sooraj Hari</h4>
            <p>Service Provider</p>
          </div>
        </div>

        <div className="end">
          <button>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default Followers;
