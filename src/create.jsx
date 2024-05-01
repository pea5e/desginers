import {Helmet} from "react-helmet";

export default function Create() {
  return(
        <main>
          <h1>Créer un nouveau produit</h1>
              <div id="createnew">
                <div id="cchoose">
                  <span id="error" />
                  <button id="save" onClick={() => saving()}>Ajouter ce produit</button>
                  <div id="price">
                    <label>Prix:</label>
                    <input min={60} step={1} id="prixrange" defaultValue={60} max={200} type="range" />
                    <input min={60} max={200} id="prixnum" defaultValue={60.00} type="number" />
                    <span>votre profit:<span id="profit">0.00 MAD</span></span>
                  </div>
                  <div id="custom">
                    <img id="yourt" src="https://api.printsplash.repl.co/mockup.png" />
                    <img onClick={() => change()} style={{position: 'absolute', mixBlendMode: 'normal', cursor: 'pointer', display: 'none'}} id="design" />
                  </div>
                  <input min={1} step={1} id="zoom" onInput={() => zoom()} max={20} type="range" />
                  <div>
                    <label>Couleur de T-shirt</label>
                    <input type="color" name="color" onInput={(event) => choose(event.currentTarget)} defaultValue="#ffffff" id="color" />
                    <input type="file" accept=".avif, .png, .jpg, .jpeg" name="image" id="file" onChange={(event) => loadFile(event)} />
                    <label htmlFor="file" className="file" style={{cursor: 'pointer', backgroundColor: 'white', color: 'black', border: '0.2vw solid black', marginRight: '10vw', marginLeft: '4vw'}}><i style={{marginRight: '1vw'}} className="fa-solid fa-upload" />importer design</label>
                    <br/>
                    <button style={{backgroundColor: 'black', color: 'white'}} onClick={(event) => mode(event.currentTarget)} id="normal" className="mode">NORMAL</button>
                    <button onClick={(event) => mode(event.currentTarget)} id="multiply" className="mode">MULTIPLY</button>
                    <button onClick={(event) => mode(event.currentTarget)} id="screen" className="mode">SCREEN</button>
                    <button onClick={(event) => mode(event.currentTarget)} id="overlay" className="mode">OVERLAY</button>
                    <button onClick={(event) => mode(event.currentTarget)} id="darken" className="mode">DARKEN</button>
                    <button onClick={(event) => mode(event.currentTarget)} id="lighten" className="mode">LIGHTEN</button>
                    <button onClick={(event) => mode(event.currentTarget)} id="difference" className="mode">DIFFERENCE</button>
                    <button onClick={(event) => mode(event.currentTarget)} id="color-burn" className="mode">COLOR BURN</button>
                    <button onClick={(event) => mode(event.currentTarget)} id="hard-light" className="mode">HARD LIGHT</button>
                    <button onClick={(event) => mode(event.currentTarget)} id="soft-light" className="mode">SOFT LIGHT</button>
                  </div>
                </div>
              </div>

        </main>
      );
}