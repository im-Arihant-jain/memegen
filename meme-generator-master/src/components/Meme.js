import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

export default function Meme() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [meme, setMeme] = useState({
    topText: "AFTER GETTING SHORTLISTED",
    bottomText: "FOR JPMC HACK",
    randomImage: "https://i.imgflip.com/1bhk.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    async function getMemes() {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();
        if (data && data.data && data.data.memes) {
          setAllMemes(data.data.memes);
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Failed to fetch memes:", error);
      }
    }
    getMemes();
  }, []);

  const captureMeme = () => {
    const memeElement = document.querySelector('.meme');
    html2canvas(memeElement, { useCORS: true }).then(canvas => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'meme.png';
      link.click();
    });
  };

  const getMemeImage = () => {
    if (allMemes.length > 0) {
      const randomNumber = Math.floor(Math.random() * allMemes.length);
      const url = allMemes[randomNumber].url;
      setMeme(prevState => ({ ...prevState, randomImage: url }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme(prevMeme => ({ ...prevMeme, [name]: value }));
  };

  return (
    <main>
      <div className="form">
        <input
          className="form--input"
          type="text"
          name="topText"
          placeholder="Top text"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          className="form--input"
          type="text"
          name="bottomText"
          placeholder="Bottom text"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 📸
        </button>

        <div className="meme">
          <img
            src={meme.randomImage}
            crossOrigin="anonymous"
            onLoad={() => setImageLoaded(true)}
            alt="meme"
            className="meme--img"
          />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
          
        </div>
        <button className="form--button" onClick={captureMeme} disabled={!imageLoaded}>
            Capture Meme
          </button>
      </div>
    </main>
  );
}
