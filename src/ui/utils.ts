// Generates a random room id
export const generateRoomId = () => {
  const vowels = "aeiou";
  const consonants = "bcdfghjklmnpqrstvwxyz";
  const hyphen = "-";

  // Generate a segment
  const generateSegment = () => {
    return (
      consonants[Math.floor(Math.random() * consonants.length)] +
      vowels[Math.floor(Math.random() * vowels.length)] +
      (Math.random() > 0.5 ? hyphen : "")
    );
  };

  // Combine segments to create a readable ID
  let roomId = "";
  while (roomId.length < 8) {
    roomId += generateSegment();
  }

  return roomId;
};


