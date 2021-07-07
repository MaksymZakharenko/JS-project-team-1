const quotes = [
  {
    text: 'You’re off to great places, today is your day. Your mountain is waiting, so get on your way',
    author: 'Dr. Seuss',
  },
  {
    text: 'You always pass failure on the way to success.',
    author: 'Mickey Rooney',
  },
  {
    text: 'No one is perfect - that’s why pencils have erasers.',
    author: 'PeWolfgang Riebeter Schutz',
  },
  {
    text: 'Winning doesn’t always mean being first. Winning means you’re doing better than you’ve done before.',
    author: 'Bonnie Blair',
  },
  {
    text: 'You’re braver than you believe, and stronger than you seem, and smarter than you think.',
    author: 'A.A. Mine',
  },
  {
    text: 'It always seems impossible until it is done.',
    author: 'Nelson Mandela',
  },
  {
    text: 'Keep your face to the sunshine and you cannot see a shadow.',
    author: 'Bob Hooey',
  },
  {
    text: 'Once you replace negative thoughts with positive ones, you’ll start having positive results.',
    author: 'Willie Nelson',
  },
  {
    text: 'Positive thinking will let you do everything better than negative thinking will.',
    author: 'Napoleon Hill',
  },
  {
    text: 'In every day, there are 1,440 minutes. That means we have 1,440 daily opportunities to make a positive impact.',
    author: 'Les Brown',
  },
];

const quoteTextRef = document.querySelector('.quote__text');
const quoteAuthorRef = document.querySelector('.quote__author');

function randomQuote(e) {
  const index = Math.floor(Math.random() * quotes.length);
  quoteTextRef.textContent = quotes[index].text;
  quoteAuthorRef.textContent = quotes[index].author;
}

export { randomQuote };
