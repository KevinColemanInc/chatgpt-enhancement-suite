function renderExport() {
  const regenResponse = document.querySelector(".btn");
  if (regenResponse == null || regenResponse.parentElement.childNodes.length != 1) {
    return;
  }
  const exportnode = regenResponse.cloneNode(true);
  exportnode.addEventListener("click", exportCSV);
  exportnode.innerText = "Export to CSV";
  regenResponse.parentNode.appendChild(exportnode);
}

function exportCSV() {
  const chatLines = document.querySelectorAll(".text-base");
  const data = [];
  for (let i = 0; i < chatLines.length; i++) {
    let speaker = "ChatGPT";
    const speakerImg = chatLines[i].querySelector("img.rounded-sm");
    if (speakerImg != null) {
      speaker = speakerImg.alt;
    }
    data.push([speaker, chatLines[i].innerText]);
  }

  const csvData = data
    .map((row) => {
      return row
        .map((cell) => {
          if (typeof cell === "string" && /[",\n]/.test(cell)) {
            // Escape any double quotes with another double quote
            return `"${cell.replace(/"/g, '""')}"`;
          } else {
            return cell;
          }
        })
        .join(",");
    })
    .join("\n");

  // Create a new blob object containing the CSV data
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

  // Create a temporary URL for the blob object
  const url = URL.createObjectURL(blob);

  // Create a new anchor element to trigger the download
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "ChatGPT-export.csv");

  // Click the link to start the download
  link.click();
}
// every 2 seconds, render the export button
setInterval(renderExport, 2000);
