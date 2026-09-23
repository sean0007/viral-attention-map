export type AttentionSource = {
  id: string;
  index: string;
  platform: string;
  pattern: string;
  signal: string;
  lesson: string;
};

export const attentionSources: AttentionSource[] = [
  {
    id: "sound-reuse",
    index: "01",
    platform: "TikTok",
    pattern: "Sound reuse",
    signal:
      "The same two-second audio shows up on unrelated clips within a day.",
    lesson:
      "People are copying a format, not endorsing a product. By the time a brand joins the sound, the audio is already a costume.",
  },
  {
    id: "quote-pile",
    index: "02",
    platform: "X",
    pattern: "Quote-post pile",
    signal:
      "A post spreads because people argue with it, not because they agree.",
    lesson:
      "Argument is a distribution channel with a short half-life. The screenshot in a chat is usually the third wave.",
  },
  {
    id: "stitch-chain",
    index: "03",
    platform: "TikTok",
    pattern: "Stitch chains",
    signal:
      "Creators stitch a reaction onto a reaction. The original claim gets smaller every hop.",
    lesson:
      "Attention accrues to the latest face, not the first fact. The mechanic is the reaction itself.",
  },
  {
    id: "naked-forward",
    index: "04",
    platform: "Group chats",
    pattern: "Naked forward",
    signal: "An image arrives with no source, no date, and a one-word caption.",
    lesson:
      "Forwards feel private, which makes them feel true. Private does not mean early. It means the context was stripped.",
  },
  {
    id: "thumbnail-clone",
    index: "05",
    platform: "YouTube",
    pattern: "Number plus face",
    signal:
      "Thumbnails converge on the same open mouth and a suspiciously specific number.",
    lesson:
      "When thumbnails clone, the audience is trained to click a shape. The video is often a recap of a clip that already peaked.",
  },
  {
    id: "screenshot-essay",
    index: "06",
    platform: "X",
    pattern: "Screenshot essay",
    signal: "A long post is a stack of screenshots of someone else's post.",
    lesson:
      "Curation gets the reach. The original gets the risk. You are looking at attention about attention.",
  },
];
