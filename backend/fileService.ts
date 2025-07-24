import matter from 'gray-matter';

/**
 * Fetches and parses the task_board.md file that sits next to the
 * frontend assets. The file is served as a static asset so it can be
 * accessed via HTTP.
 */

export async function readBoard() {
  // The markdown file is served from the root of the dev server so we can
  // simply request it via fetch.
  const res = await fetch('/task_board.md');
  const content = await res.text();
  const sections = content.split(/^## /m).slice(1);
  const tasks: any[] = [];
  for (const section of sections) {
    const [titleLine, ...rest] = section.split('\n');
    const status = titleLine.trim();
    const blocks = rest.join('\n').split(/^### /m).slice(1);
    for (const blk of blocks) {
      const [header, ...bodyLines] = blk.split('\n');
      const id = header.trim().split(' ')[0];
      const md = bodyLines.join('\n');
      const data = matter('---\n' + md.replace(/^- /mg, '') + '\n---');
      tasks.push({ id, status, ...data.data });
    }
  }
  return tasks;
}
