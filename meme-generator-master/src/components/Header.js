import trollFace from "../images/troll-face.png";

export default function Header() {
  return (
    <header className="header">
      <img className="header--img" src={trollFace} alt="troll face" />
      <h2 className="header--title">Meme Generator</h2>
    </header>
  );
}
