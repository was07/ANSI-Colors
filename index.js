const masterDiv = document.getElementById("master")


function copy(num) {
    navigator.clipboard.writeText(translate(num)).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}


function translate(num) {
    return `\\x1b[${num}m`
}


function load_section(name, content) {
    // construct a section in HTML
    let sectionDiv = document.createElement("div")
    sectionDiv.classList.add("section")

    let sectionTitle = document.createElement("div")
    sectionTitle.classList.add("section-title")
    sectionTitle.innerHTML = name
    sectionDiv.appendChild(sectionTitle)

    for (key in content) {
        let cell = document.createElement("div")
        cell.classList.add("cell")
        cell.innerHTML = `
        <div class="cell-name">${key}</div><div class="cell-value" onclick="copy(${content[key]})">${translate(content[key])}</div>
        `

        sectionDiv.appendChild(cell)
    }

    masterDiv.appendChild(sectionDiv)
}

function load(data) {
    console.log(data)

    for (let section_name in data) {
        load_section(section_name, data[section_name])
    }
}


// Access json file and load everything
fetch('/colors-db.json')
    .then((response) => response.json())
    .then((json) => load(json));
