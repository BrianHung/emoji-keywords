// https://unicode.org/emoji/charts-13.1/emoji-list.html

let table = document.querySelector("table")

// filter table rows for only rows with unicode and keywords
let rows = Array.from(table.querySelectorAll("tr")).filter(row => row.querySelector(".code") && row.querySelector(".andr"))

function map(row) {
  const [num, code, sample, shortname, keywords] = row.children
  return {
    code: code.textContent,
    character: sample.querySelector("img").alt,
    short_name: shortname.textContent.replace("⊛ ", ""), // remove 'recently-added emoji' symbol if it exists
    keywords: keywords.textContent.split(" | "),
  }
}

let json = rows.map(map)

function downloadJSON(content, filename) {
  let a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], {type: 'json'}))
  a.download = `${filename}.json`
  document.body.appendChild(a)
  a.click()
}

downloadJSON(JSON.stringify(json, undefined, 2), 'emoji-keywords')