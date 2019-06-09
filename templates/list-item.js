(function() {
	const ListItemTemplate = document.createElement("template");

	ListItemTemplate.innerHTML = `
    <style>
      .list-item {
      	margin-left: 5px;
      }
      .
    </style>
    
	  <li class="list-item">
	  
			<a class="project-url" href="!!" target="_blank" rel="nofollow nofollow">
			  <h3 class="project-name">
			  	!!
			  </h3>
			</a>
			
			<p>
			  <time class="project-start-year" datetime="!!">!!</time>
			 	  -
			  <time class="project-end-year" datetime="!!">!!</time>
			</p>
			
			<details>
				<summary class="project-description-short">
					!!
        </summary>
        <p class="project-description-long">
					!!
				</p>
			</details>
			
			<details>
				<summary class="project-role-short">
					!!
        </summary>
        <p class="project-role-long">
					!!
				</p>
			</details>
			
			<details>
				<summary class="project-experience-short">
					!!
        </summary>
        <p class="project-experience-long">
					!!
				</p>
			</details>
			
	  </li>
  `;

	const proxyAttributes = [
		"name",
		"description-short", "description-long",
		"role-short",        "role-long",
		"experience-short",  "experience-long",
		"start-year"
	]

	class ListItem extends HTMLElement {
		constructor() {
			super();

			this.attachShadow({mode: "open"});

			this.shadowRoot.appendChild(ListItemTemplate.content.cloneNode(true))
		}

		connectedCallback() {
			proxyAttributes.forEach(attributeName => {
				this.shadowRoot.querySelector(`.project-${attributeName}`).innerHTML = this.getAttribute(attributeName)
			})

			this.shadowRoot.querySelector(".project-url").setAttribute("href", this.getAttribute("url"))

			const startYear = this.getAttribute("start-year")
			this.shadowRoot.querySelector(".project-start-year").setAttribute("datetime", startYear)

			const endYear = this.getAttribute("end-year") || null
			this.shadowRoot.querySelector(".project-end-year").setAttribute("datetime", endYear || new Date().toString())
			this.shadowRoot.querySelector(".project-end-year").innerHTML = endYear || 'present'
		}
	}

	window.customElements.define("list-item", ListItem);
})();
