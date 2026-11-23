function headerText(node) {
  return node.value ?? node.children?.map(headerText).join("") ?? "";
}

// Keep wide Markdown comparisons readable as labelled rows on narrow screens.
export function readingTables() {
  return (tree) => {
    for (const table of tree.children.filter(node => node.tagName === "table")) {
      const head = table.children.find(node => node.tagName === "thead");
      const body = table.children.find(node => node.tagName === "tbody");
      const headerRow = head?.children.find(node => node.tagName === "tr");
      const columns = headerRow?.children.filter(node => node.tagName === "th") ?? [];
      if (columns.length < 3 || !body) continue;

      table.properties.className = [...(table.properties.className ?? []), "reading-comparison"];
      table.properties.role = "table";
      head.properties.role = body.properties.role = "rowgroup";
      headerRow.properties.role = "row";
      for (const column of columns) {
        column.properties.scope = "col";
        column.properties.role = "columnheader";
      }
      for (const row of body.children.filter(node => node.tagName === "tr")) {
        row.properties.role = "row";
        const cells = row.children.filter(node => node.tagName === "td");
        cells.forEach((cell, index) => {
          cell.properties.role = "cell";
          if (!index || !columns[index]) return;
          cell.children.unshift({
            type: "element", tagName: "span",
            properties: { className: ["comparison-label"], ariaHidden: "true" },
            children: [{ type: "text", value: headerText(columns[index]) }],
          });
        });
      }
    }
  };
}
