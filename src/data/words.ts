export const WORDS: string[] = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", 
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", 
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", 
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", 
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", 
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", 
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", 
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", 
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", 
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "should", "word", "hand", "place", "case", "system", "group", "number", "point", "home",
  "state", "under", "right", "social", "life", "school", "child", "world", "head", "form",
  "small", "long", "large", "better", "great", "every", "near", "best", "next", "hard",
  "last", "soon", "late", "high", "light", "might", "shall", "must", "done", "used",
  "ever", "more", "most", "same", "both", "each", "few", "less", "more", "once",
  "early", "late", "often", "never", "always", "here", "there", "then", "now", "once",
  "while", "until", "than", "upon", "about", "above", "below", "behind", "around", "along",
  "between", "across", "against", "among", "beyond", "during", "within", "without", "before", "after",
  "around", "since", "until", "through", "toward", "behind", "ahead", "over", "under", "below",
  "water", "land", "earth", "fire", "air", "sky", "sun", "moon", "star", "night", 
  "mountain", "ocean", "river", "forest", "desert", "island", "bridge", "street", "city", "town"
];

export const getRandomWords = (count = 25) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }
  return result.join(" ");
};
