function main() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 1; i < 15; i++) {
    logseq.Editor.registerSlashCommand("+" + i + "d", async () => {
      const currentBlock = await logseq.Editor.getCurrentBlock();
      var result = new Date();
      result.setDate(result.getDate() + i);
      let datum = result.toISOString().substring(0, 10);
      datum += " " + days[result.getDay()];
      const content =
        `
<SCHEDULED ` +
        datum +
        ">";
      insertContent(currentBlock, content);
    });
  }
}

logseq.ready(main).catch(console.error);
