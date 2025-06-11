// TODO VOIR POUR FAIRE UN FICHIER ENV
// TODO SI JE CHANGE ET QUE JE RAJOUTE /api BIEN FAIRE LA MODIFICATION ICI
export const k9Config = {
  version: "0.0.1",
  jwtName: "k9-jwt",
  apiRoot: "http://localhost:8080",
  dogAvatars: [
    { name: "Berger Allemand", url: "berger-allemand.png" },
    { name: "Golden Retriever", url: "golden.png" },
    { name: "Berger Australien", url: "berger-australien.png" },
    { name: "Doberman", url: "doberman.png" },
    { name: "Rottweiler", url: "rottweiler.png" },
    { name: "Shiba", url: "shiba.png" },
    { name: "Beagle", url: "beagle.png" },
    { name: "Border Collie", url: "border-collie.png" },
    { name: "Bouledogue", url: "bouledogue.png" },
    { name: "Caniche", url: "caniche.png" },
    { name: "Carlin", url: "carlin.png" },
    { name: "Dalmatien", url: "dalmatien.png" },
  ],
  dogGender: [
    { id: 1, label: "mâle", value: "male" },
    { id: 2, label: "femelle", value: "female" },
  ],
};
