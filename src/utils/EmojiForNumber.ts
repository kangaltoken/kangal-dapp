export default function emojiForNumber(number: number): string {
  switch (number) {
    case 1:
      return "🏆";
    case 2:
      return "🥈";
    case 3:
      return "🥉";

    default:
      const defaultEmojis = [
        "💛",
        "🧡",
        "💙",
        "❤️",
        "🐶",
        "🐕",
        "🦮",
        "🐩",
        "🐕‍🦺",
        "🐾",
        "🥩",
        "🦴",
        "🌝",
        "🙈",
        "🐒",
        "🙉",
        "🐵",
        "🦍",
        "🤠",
        "🦧",
        "👀",
        "🥵",
        "😇",
        "😝",
        "🥸",
        "😤",
        "🤗",
        "✊",
        "💅",
        "🙆‍♂️",
        "🙇‍♂️",
        "🙅‍♀️",
        "💆‍♀️",
        "💆",
        "👩‍🌾",
        "👴",
        "🚀",
        "📈",
        "🧞‍♂️",
        "🍆",
        "🍑",
        "🍕",
      ];

      return defaultEmojis[Math.floor(Math.random() * defaultEmojis.length)];
  }
}
