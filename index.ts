import "@logseq/libs";

function main() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 1; i < 15; i++) {
    logseq.Editor.registerSlashCommand("+" + i + "d", async () => {
      var result = new Date();
      result.setDate(result.getDate() + i);
      let datum = result.toISOString().substring(0, 10);
      datum += " " + days[result.getDay()];
      const content =
        `
<SCHEDULED ` +
        datum +
        ">";
      await logseq.Editor.insertAtEditingCursor(content);
    });
  }
}

logseq.ready(main).catch(console.error);
