export const MESSAGE_CODES = [
  { code: 'Y 01', desc: 'YABA FIRST SERVICE', time: '6:30 AM' },
  { code: 'IG 01', desc: 'IGANMU FIRST SERVICE', time: '7:45 AM' },
  { code: 'L 01', desc: 'LEKKI FIRST SERVICE', time: '8:00 AM' },
  { code: 'Y 02', desc: 'YABA SECOND SERVICE', time: '9:30 AM' },
  { code: 'IG 02', desc: 'IGANMU SECOND SERVICE', time: '10:30 AM' },
  { code: 'L 02', desc: 'LEKKI SECOND SERVICE', time: '10:30 AM' },
];

export const FAQ_CATEGORIES = [
  'general', 
  'payments', 
  'givings'
];

export const FAQ_DATA = [
  {
    id: 'one',
    category: 'general',
    question: 'How do I create an account?',
    answer: "To create an account, click 'signup' on the top menu and enter your registration details.",
    videos: ['https://www.youtube.com/embed/E1pS0AfkJX4?rel=0']
  },
  {
    id: 'two',
    category: 'general',
    question: "Where can I view all the messages I've downloaded?",
    answer: `That’s easy. When you log in to the site with your credentials, you would see a menu option on the
      homepage called “Library”. A simple click will take your library page which has all your downloads.
      The library option is only visible after you’ve logged in.`,
    videos: []
  },
  {
    id: 'three',
    category: 'general',
    question: 'How do I download free messages?',
    answer: `Free messages do not require sign-ups to download. Simply click on the down-arrow icon on the album
      art of the free message you're interested in and the download should start immediately.`,
    videos: []
  },
  {
    id: 'four',
    category: 'general',
    question: 'Can I listen to free previews before paying for a message?',
    answer: `Yes. You can listen to any message on the platform for up to 5 minutes. Simply click on the play
      button at the bottom left of the art work/display image of the message`,
    videos: []
  },
  {
    id: 'five',
    category: 'general',
    question: 'Can I download a message more than once?',
    answer: `Of course. Each registered user has a library which can be accessed through the main menu on the
      homepage. There you should be able to see all previous paid downloads with the option of downloading
      again.`,
    videos: []
  },
  {
    id: 'six',
    category: 'general',
    question: 'How do I fund my wallet?',
    answer: `You can fund your wallet account by clicking on the wallet icon on the menu. This feature is available
      to only registered and logged in users.`,
    videos: [
      'https://www.youtube.com/embed/VeEpwJx0KIY?rel=0', 
      'https://www.youtube.com/embed/pzA_-Lwo0hM?rel=0'
    ]
  },
  {
    id: 'payments_one',
    category: 'payments',
    question: 'How do I make payment?',
    answer: `You could either pay instantly for a single message or add a collection of messages to your cart and
      then pay for all at once. To buy a single messge, click on the money icon on the bottom right of the
      message art and pay from there otherwise you could add single items to our cart by clicking the cart
      icon bottom centre of the message art.`,
    videos: [
      "https://www.youtube.com/embed/62d3Zy9bEY8?rel=0",
      "https://www.youtube.com/embed/yeMbRhIYmwg?rel=0"
    ]
  },
  {
    id: 'givings_one',
    category: 'givings',
    question: 'How do I give?',
    answer: 'You can visit this page to give: <a href="https://insightsforliving.org/giving" className="text-blue-600 underline">https://insightsforliving.org/giving</a>',
    videos: []
  },
];