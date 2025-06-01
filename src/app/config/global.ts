// TODO VOIR POUR FAIRE UN FICHIER ENV
// TODO SI JE CHANGE ET QUE JE RAJOUTE /api BIEN FAIRE LA MODIFICATION ICI
export const k9Config = {
  version: "0.0.1",
  jwtName: "k9-jwt",
  apiRoot: "http://localhost:8080",
  dogAvatars: [
    { name: "golden retriever", url: "golden.png" },
    { name: "berger allemand", url: "berger-allemand.png" },
    { name: "doberman", url: "doberman.png" },
    { name: "rottweiler", url: "rottweiler.png" },
    { name: "shiba inu", url: "shiba.png" },
    { name: "bouledogue français", url: "bouledogue-2.png" },
    { name: "bouledogue anglais", url: "bouledogue.png" },
    { name: "caniche", url: "caniche.png" },
    { name: "carlin", url: "carlin.png" },
  ],
  dogGender: [
    { id: 1, label: "mâle", value: "male" },
    { id: 2, label: "femelle", value: "female" },
  ],
};
