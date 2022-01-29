import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

const App = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState(true);
  const [shark, setShark] = useState(false);
  const [selection, setSelection] = useState("cat");
  const [styleButtonOne, setStyleOne] = useState("highlight");
  const [styleButtonTwo, setStyleTwo] = useState("");

  const getImages = async () => {
    try {
      const data = await axios
        .get(`http://localhost:3000/${selection}`)
        .then((res) => {
          setImages(res.data);
        });
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  function nextImage() {
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  }

  function prevImage() {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex((prevIndex) => prevIndex - 1);
    }
  }

  function selectCat() {
    setCat((prevValue) => !prevValue);
    if (shark === true && cat === false) {
      setSelection("mix");
    } else if (cat === false){
      setSelection('cat');
    }
    setStyleOne(cat ? "highlight" : "");
  }

  function selectShark() {
    setShark((prevValue) => !prevValue);
    if (shark === false && cat === true) {
      setSelection("mix");
    } else if (shark === false){
      setSelection('shark');
    }
    setStyleTwo(shark ? "highlight" : "")
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <div className="container">
        <div className="item">
          <FaRegArrowAltCircleLeft
            className="left-arrow"
            onClick={prevImage}
            size="60"
          />
        </div>
        {loading ? (
          <div className="frame">
            <img src={images[index]} alt="cat or shark image" />
          </div>
        ) : (
          <div className="frame">
            <img src="https://i.pinimg.com/736x/3f/f4/a0/3ff4a08855cb019f56d7989e57621aa5.jpg"></img>
          </div>
        )}
        <div className="item">
          <div className="item">
            <FaRegArrowAltCircleRight
              className="right-arrow"
              onClick={nextImage}
              size="60"
            />
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className={styleButtonOne}
          onClick={() => {
            selectCat();
            getImages();
          }}
        >
          Cat 🐈
        </button>
        <button className={styleButtonTwo}
          onClick={() => {
            selectShark();
            getImages();
          }}
        >
          Shark 🦈
        </button>
      </div>
    </>
  );
};

export default App;
