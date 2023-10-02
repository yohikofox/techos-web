import md from 'markdown-it';

const wordBySecond = 250;

export default function getReadingTime(content: string) {
  const htmlContent = md().render(content || '');
  const wordsOnly = htmlContent.replace(/<[^>]+>/g, '');
  const wordCount = wordsOnly.split(' ').length;
  const readingTime = Math.ceil(wordCount / wordBySecond);
  return readingTime;
}
