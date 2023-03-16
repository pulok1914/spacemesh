+++
aliases = []
[[assets]]
creator = "creators/Spacemesh 3D.md"
intro = "Yesy"
template = "block-creator"
[[assets]]
custom_id = ""
hidden = true
hide_button = true
order = "0"
template = "page-glossary-term"
term = "Main Logo"
[[assets]]
body = "Blah blah blah"
button = "Yes download it"
headline = "White logo"
intro = "White logo"
template = "block-cover-download"
[[assets.downloads]]
os = "Logo"
url = "www.gmail.com"
[[assets.links]]
link = "www.vince.com"
name = "black ascii logo"

+++
//COMING SOON...okok
{{< rawhtml >}}
<head>
<style>
.cards-list {
  z-index: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.card {
  margin: 30px auto;
  width: 300px;
  height: 300px;
  border-radius: 40px;
box-shadow: 5px 5px 30px 7px rgba(0,0,0,0.25), -5px -5px 30px 7px rgba(0,0,0,0.22);
  cursor: pointer;
  transition: 0.4s;
}

.card .card_image {
  width: inherit;
  height: inherit;
  border-radius: 40px;
}

.card .card_image img {
  width: inherit;
  height: inherit;
  border-radius: 40px;
  object-fit: cover;
}

.card .card_title {
  text-align: center;
  border-radius: 0px 0px 40px 40px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 30px;
  margin-top: -80px;
  height: 40px;
}

.card:hover {
  transform: scale(0.9, 0.9);
  box-shadow: 5px 5px 30px 15px rgba(0,0,0,0.25), 
    -5px -5px 30px 15px rgba(0,0,0,0.22);
}

.title-white {
  color: white;
}

.title-black {
  color: black;
}

@media all and (max-width: 500px) {
  .card-list {
    /* On small screens, we are no longer using row direction but column */
    flex-direction: column;
  }
}




</style>
</head>
<div class="container">
  <h2>Table</h2>
  <p>The .table-dark class adds a black background to the table:</p>            
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Format</th>
        <th>Link</th>
        <th>Preview</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Logo</td>
        <td>PNG</td>
        <td>www.download.example.com</td>
        <td>
            <div class="card 1">
        	<div class="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
        	<div class="card_title title-white">
          	<p>White Logo</p>
        	</div>
      		</div>
        </td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
          <td>
            <div class="card 1">
        	<div class="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
        	<div class="card_title title-white">
          	<p>Black Logo</p>
        	</div>
      		</div>
        </td>

      </tr>
      <tr>
        <td>July</td>
        <td>Dooley</td>
        <td>july@example.com</td>
          <td>
            <div class="card 1">
        	<div class="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
        	<div class="card_title title-white">
          	<p>Orange Logo</p>
        	</div>
      		</div>
        </td>

      </tr>
    </tbody>
  </table>
</div>


<div class="cards-list">
  
<div class="card 1">
  <div class="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
  <div class="card_title title-white">
    <p>White Logo</p>
  </div>
</div>

  <div class="card 2">
  <div class="card_image">
    <img src="https://cdn.blackmilkclothing.com/media/wysiwyg/Wallpapers/PhoneWallpapers_FloralCoral.jpg" />
    </div>
  <div class="card_title title-white">
    <p>Black Logo</p>
  </div>
</div>

<div class="card 3">
  <div class="card_image">
    <img src="https://media.giphy.com/media/10SvWCbt1ytWCc/giphy.gif" />
  </div>
  <div class="card_title">
    <p>Ascii logo</p>
  </div>
</div>
  
  <div class="card 4">
  <div class="card_image">
    <img src="https://media.giphy.com/media/LwIyvaNcnzsD6/giphy.gif" />
    </div>
  <div class="card_title title-black">
    <p>White Logo w/ transperant bg</p>
  </div>
  </div>

</div>

<div class="cards-list">
  
<div class="card 5">
  <div class="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" /> </div>
  <div class="card_title title-white">
    <p>White Logo</p>
  </div>
</div>

  <div class="card 6">
  <div class="card_image">
    <img src="https://cdn.blackmilkclothing.com/media/wysiwyg/Wallpapers/PhoneWallpapers_FloralCoral.jpg" />
    </div>
  <div class="card_title title-white">
    <p>Black Logo</p>
  </div>
</div>

<div class="card 7">
  <div class="card_image">
    <img src="https://media.giphy.com/media/10SvWCbt1ytWCc/giphy.gif" />
  </div>
  <div class="card_title">
    <p>Ascii logo</p>
  </div>
</div>
  
  <div class="card 8">
  <div class="card_image">
    <img src="https://media.giphy.com/media/LwIyvaNcnzsD6/giphy.gif" />
    </div>
  <div class="card_title title-black">
    <p>Black Logo w/ transperant bg</p>
  </div>
  </div>

</div>







{{< /rawhtml >}}