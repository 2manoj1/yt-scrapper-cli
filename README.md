# mm-yt-cli

"mm-yt-cli" is a command-line tool that allows you to fetch metadata (title, author, description, etc.) from YouTube videos.

<img width="1512" alt="Screenshot 2023-04-16 at 8 02 52 PM" src="https://user-images.githubusercontent.com/15128569/232320169-35243d96-24ae-4f4f-ae05-6be62c435458.png">


## Installation

You can run "mm-yt-cli" directly using npx without installing it globally:

```sh
npx mm-yt-cli --url <YOUTUBE_URL>
```

You can install "mm-yt-cli" globally using npm:

```sh
npm install -g mm-yt-cli
```

You can install "mm-yt-cli" globally using Yarn:

```sh
yarn global add mm-yt-cli
```

## Usage

```sh
mm-yt-cli --url <YOUTUBE_URL>

or

npx mm-yt-cli --url <YOUTUBE_URL>
```

Replace `<YOUTUBE_URL>` with the URL of the YouTube video for which you want to fetch metadata.

## Options

- `--url`: Required. The URL of the YouTube video for which to fetch metadata.

## Example Usage

Here's an example of how you can use "mm-yt-cli" to fetch metadata from a YouTube video:

```sh
npx mm-yt-cli --url https://www.youtube.com/watch?v=ZvxBCYSnAM0
```

### Output

```js
{
  title: 'Deno Setup with Gitpod',
  description: 'Gitpod can provide fully initialized, perfectly set-up developer environments for any kind of software project. What is Deno?A modern runtime for JavaScript…',
  keyword: 'Deno, Deno land, Gitpod, docker, setup, framework, Manoj Mukherjee, Tech KnowledgeBase, Nodejs, Javascript Runtime',
  category: 'Science & Technology',
  longDescription: 'Gitpod can provide fully initialized, perfectly set-up developer environments for any kind of software project. \n' +
    '\n' +
    'What is Deno?\n' +
    'A modern runtime for JavaScript and TypeScript.\n' +
    '\n' +
    'Installation\n' +
    'Deno ships as a single executable with no dependencies. You can install it. \n' +
    '\n' +
    'Article - https://www.linkedin.com/pulse/deno-setup-gitpod-manoj-mukherjee/\n' +
    '\n' +
    '#deno #gitpod #TechKnowledgeBase'
}
```

## License

This project is licensed under the MIT License.

## Issues

If you encounter any issues with "mm-yt-cli", please open an issue on the [GitHub repository](https://github.com/2manoj1/yt-scrapper-cli/issues).

## Credits

"mm-yt-cli" is created and maintained by [Manoj Mukherjee](https://www.linkedin.com/in/manoj-mukherjee/).

## Acknowledgements

Special thanks to the following projects for providing dependencies used in "mm-yt-cli":

- [arg](https://www.npmjs.com/package/arg)
- [cheerio](https://www.npmjs.com/package/cheerio)
- [got](https://www.npmjs.com/package/got)
- [metascraper](https://www.npmjs.com/package/metascraper)
- [metascraper-author](https://www.npmjs.com/package/metascraper-author)
- [metascraper-description](https://www.npmjs.com/package/metascraper-description)
- [metascraper-title](https://www.npmjs.com/package/metascraper-title)
- [metascraper-url](https://www.npmjs.com/package/metascraper-url)
- [metascraper-youtube](https://www.npmjs.com/package/metascraper-youtube)
