# TODO (Admin Rewrite Sprint)

- [x] replace api endpoints with server actions

# TODO (My Books Page)

- [ ] my books page
- [ ] save progress button at /[id] that saves current book progress to my books table
- [x] edgestore -> cloudflare r2

# TODO (Next.js 15 Sprint)

- [x] cta button to /books
- [x] update pdf reader packages
- [x] fix pdf reader
- [x] separate books page to optimize home page
- [x] abandon saving user filters in local storage, implement url params instead
- [x] reset filters button
- [x] debounce filters
- [x] ai sdk v5
- [x] use of ai sdk components where possible

# TODO

- [x] translate circled text feature
  - [x] drawing feature to be able to draw rectangle on certain text
  - [x] crop that image
  - [x] send to gpt-4o (if he can read images directly, research that)
- [x] fix ai chat input behavior
- [x] render markdown given by chatgpt responses correctly (bold text, italic text and other stuff)
  - [x] in explain dialog
  - [x] in ai chat

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
