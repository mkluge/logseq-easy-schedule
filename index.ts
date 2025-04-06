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
SCHEDULED: <` +
        datum +
        ">";
        const currentBlock = await logseq.Editor.getCurrentBlock();
        console.log("running");
        await logseq.Editor.exitEditingMode();
        if( currentBlock ) {
          console.log(currentBlock)
          logseq.Editor.getBlock(currentBlock.uuid).then( async (block) => {
            console.log("editing ...");
            console.log(block);
            const newContent = "TODO " + block?.content + dueDate;
            const parent = block?.parent;
            console.log(newContent);
            await logseq.Editor.editBlock(currentBlock.uuid);
            await logseq.Editor.updateBlock( currentBlock.uuid, newContent);
            const newblock = await logseq.Editor.getBlock(currentBlock.uuid);
            console.log(block);
          });
        }
    });
  }
}

console.log("startup logseq easy schedule")
logseq.ready(main).catch(console.error);
