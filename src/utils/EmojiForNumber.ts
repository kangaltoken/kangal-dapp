export default function emojiForNumber(number: number): string {
  switch (number) {
    case 1:
      return "๐";
    case 2:
      return "๐ฅ";
    case 3:
      return "๐ฅ";

    default:
      const defaultEmojis = [
        "๐",
        "๐งก",
        "๐",
        "โค๏ธ",
        "๐ถ",
        "๐",
        "๐ฆฎ",
        "๐ฉ",
        "๐โ๐ฆบ",
        "๐พ",
        "๐ฅฉ",
        "๐ฆด",
        "๐",
        "๐",
        "๐",
        "๐",
        "๐ต",
        "๐ฆ",
        "๐ค ",
        "๐ฆง",
        "๐",
        "๐ฅต",
        "๐",
        "๐",
        "๐ฅธ",
        "๐ค",
        "๐ค",
        "โ",
        "๐",
        "๐โโ๏ธ",
        "๐โโ๏ธ",
        "๐โโ๏ธ",
        "๐โโ๏ธ",
        "๐",
        "๐ฉโ๐พ",
        "๐ด",
        "๐",
        "๐",
        "๐งโโ๏ธ",
        "๐",
        "๐",
        "๐",
      ];

      return defaultEmojis[Math.floor(Math.random() * defaultEmojis.length)];
  }
}
