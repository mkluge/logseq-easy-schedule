import "@logseq/libs";

async function main() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 0; i < 14; i++) {
    logseq.Editor.registerSlashCommand("wait" + i + "d", async () => {
      var result = new Date();
      result.setDate(result.getDate() + i);
      let datum = result.toISOString().substring(0, 10);
      datum += " " + days[result.getDay()];
      const newContent =
        `
SCHEDULED: <` +
        datum +
        ">";
      await logseq.Editor.insertAtEditingCursor(newContent);
    });
  }
}

logseq.ready(main).catch(console.error);
