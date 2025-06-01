// TODO VOIR POUR FAIRE UN FICHIER ENV
// TODO SI JE CHANGE ET QUE JE RAJOUTE /api BIEN FAIRE LA MODIFICATION ICI
export const k9Config = {
  version: "0.0.1",
  jwtName: "k9-jwt",
  apiRoot: "http://localhost:8080",
  dogAvatars: [
    { name: "golden retriever", url: "/images/dog-avatar/golden.png" },
    { name: "berger allemand", url: "/images/dog-avatar/berger-allemand.png" },
    { name: "doberman", url: "/images/dog-avatar/doberman.png" },
    { name: "rottweiler", url: "/images/dog-avatar/rottweiler.png" },
    { name: "shiba inu", url: "/images/dog-avatar/shiba.png" },
    { name: "bouledogue français", url: "/images/dog-avatar/bouledogue-2.png" },
    { name: "bouledogue anglais", url: "/images/dog-avatar/bouledogue.png" },
    { name: "caniche", url: "/images/dog-avatar/caniche.png" },
    { name: "carlin", url: "/images/dog-avatar/carlin.png" },
  ],
  dogGender: [
    { id: 1, label: "mâle", value: "male" },
    { id: 2, label: "femelle", value: "female" },
  ],
};
