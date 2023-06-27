const {checkWelcome}= require('./MongoDB/MongoDb_Core');

module.exports = async (Styx, anu) => {
  try {
    let metadata = await Styx.groupMetadata(anu.id);
    let participants = anu.participants;
    let desc = metadata.desc;
    if (desc == undefined) desc = "No Description";

    for (let num of participants) {
      try {
        ppuser = await Styx.profilePictureUrl(num, "image");
      } catch {
        ppuser = botImage4;
      }

      if (anu.action == "add") {
        const WELstatus = await checkWelcome(anu.id);
        let WAuserName = num;
        console.log(
          `\n+${WAuserName.split("@")[0]} Joined/Got Added in: ${
            metadata.subject
          }\n`
        );
        Styxtext = `
Hello @${WAuserName.split("@")[0]} Senpai,

Welcome to *${metadata.subject}*.

*🧣 Group Description 🧣*

${desc}

*Thank You.*
  `;
        if (WELstatus) {
          await Styx.sendMessage(anu.id, {
            image: { url: ppuser },
            caption: Styxtext,
            mentions: [num],
          });
        }
      } else if (anu.action == "remove") {
        const WELstatus = await checkWelcome(anu.id);
        let WAuserName = num;
        console.log(
          `\n+${WAuserName.split("@")[0]} Left/Got Removed from: ${
            metadata.subject
          }\n`
        );
        Styxtext = `
  @${WAuserName.split("@")[0]} Senpai left the group.
  `;
        if (WELstatus) {
          await Styx.sendMessage(anu.id, {
            image: { url: ppuser },
            caption: Styxtext,
            mentions: [num],
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};