import "@logseq/libs";

async function main() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 0; i < 14; i++) {
    logseq.Editor.registerSlashCommand("wait" + i + "d", async () => {
      var result = new Date();
      result.setDate(result.getDate() + i);
      let datum = result.toISOString().substring(0, 10);
      datum += " " + days[result.getDay()];
      const dueDate =
        `
SCHEDULED: <` + datum + ">";
        const { content, uuid } = await logseq.Editor.getCurrentBlock()
        console.log("running");
//        await logseq.Editor.exitEditingMode();
        if( uuid ) {
          console.log(content)
          console.log("editing ...");
          const newContent = "TODO " + content + dueDate;
          await logseq.Editor.updateBlock( uuid, newContent);
          }
        });
    }
}

console.log("startup logseq easy schedule")
logseq.ready(main).catch(console.error);
